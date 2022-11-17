#!/bin/bash

set -ex

DIR="${CI_PROJECT_DIR}"
DEPLOYMENT_DIR="${DIR}/deployments"
DEPLOY_SOURCE="${DEPLOYMENT_DIR}/template/settings-ui"
DEPLOY_TARGET="${DEPLOYMENT_DIR}/staging/settings-ui-${CI_COMMIT_BRANCH}"
if [[ "$CI_MERGE_REQUEST_SOURCE_BRANCH_NAME" != "" ]]
then
    # Destroy when a merge request is created
    DESTROY_NAME="settings-ui-${CI_MERGE_REQUEST_SOURCE_BRANCH_NAME}"
    DESTROY_TARGET="${DEPLOYMENT_DIR}/staging/${DESTROY_NAME}"
elif [[ "$CI_COMMIT_BRANCH" != "" ]]
then
    # Destroy on normal push to branch
    DESTROY_NAME="settings-ui-${CI_COMMIT_BRANCH}"
    DESTROY_TARGET="${DEPLOYMENT_DIR}/staging/${DESTROY_NAME}"
else
    err "Cannot set DESTROY_TARGET"
fi
STAGING_KUSTOMIZATION="${DEPLOYMENT_DIR}/staging/kustomization.yaml"

function main {
    setup
    case $1 in
    deploy )
        deploy
        ;;
    destroy )
        destroy
        ;;
    esac
}
function deploy {
    ls "${CI_PROJECT_DIR}"
    ls "$DEPLOYMENT_DIR/staging"
    log "Deploy ${CI_COMMIT_BRANCH}"
    if [[ -d "$DEPLOY_TARGET" ]]
    then
        if [[ "$DEPLOYMENT" == "" ]]
        then
            err "DEPLOYMENT is not defined in your gitlab-ci file"
        fi
        log "Deployment exists and $DEPLOYMENT will be restarted"
        kubectl rollout restart deployment "${DEPLOYMENT}-${CI_COMMIT_BRANCH}" -n "$K8S_NAMESPACE";
        log "Deployment exists and $DEPLOYMENT is restarted"
        exit 0
    fi
    mkdir "$DEPLOY_TARGET"
    cp -r "${DEPLOY_SOURCE}/." "$DEPLOY_TARGET"
    find "$DEPLOY_TARGET" -type f -name \*.yaml -print0 | xargs -0 -I{} sh -c 'envsubst < "$1" | sponge "$1"' -- {}
    if [[ "$(yq r "$STAGING_KUSTOMIZATION" resources)" =~ "settings-ui-$CI_COMMIT_BRANCH" ]]; then
        err "settings-ui-$CI_COMMIT_BRANCH is already configured"
    fi
    yq w -i "$STAGING_KUSTOMIZATION" resources[+] "settings-ui-$CI_COMMIT_BRANCH"
    kustomize build "${DEPLOYMENT_DIR}/staging"
    cd "$DEPLOYMENT_DIR"
    git add .
    git commit -m "Add deployment of settings-ui-$CI_COMMIT_BRANCH"
    git push
    fluxctl --k8s-fwd-ns=west sync
}

function destroy {
    log "Destroy ${DESTROY_NAME}"
    if ! [[ -d "$DESTROY_TARGET" ]]; then
        err "$DESTROY_TARGET does not exist"
    fi
    rm -r "$DESTROY_TARGET"
    yq d -i "$STAGING_KUSTOMIZATION" "resources.${DESTROY_NAME}"
    cd "$DEPLOYMENT_DIR"
    git add .
    git commit -m "Remove deployment of $DESTROY_NAME"
    git push
    fluxctl --k8s-fwd-ns=west sync
}

function setup {
    mkdir -p ~/.ssh/
    echo "$SSH_DEPLOYMENTS_KEY" > ~/.ssh/key
    printf "Host gitlab.id-repository.de\n    Preferredauthentications publickey\n    IdentityFile ~/.ssh/key" > ~/.ssh/config
    ssh-keyscan -t rsa gitlab.id-repository.de >> ~/.ssh/known_hosts
    cat ~/.ssh/config
    chmod 700 ~/.ssh
    chmod 600 ~/.ssh/key
    eval $(ssh-agent -s)
    ssh-add ~/.ssh/key
    git config --global user.email "idbot@ippen-digital.de"
    git config --global user.name "idbot"
    git clone "$DEPLOYMENT_REPO" "$DEPLOYMENT_DIR"
}

function log {
    echo "[$(date -u +"%Y-%m-%dT%H:%M:%SZ")]: $*"
}

function err {
    log "ERROR - $*"
    exit 1
}

main "$@"
