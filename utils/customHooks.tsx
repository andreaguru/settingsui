import {DependencyList, EffectCallback, useEffect, useRef} from "react";

/**
 * useIsFirstRender
 * @return {boolean}
 */
function useIsFirstRender(): boolean {
    const isFirst = useRef(true);

    if (isFirst.current) {
        isFirst.current = false;

        return true;
    }

    return isFirst.current;
}

/**
 * useUpdateEffect
 * @param {EffectCallback} effect
 * @param {DependencyList} deps
 */
function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
    const isFirst = useIsFirstRender();

    useEffect(() => {
        if (!isFirst) {
            return effect();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}

export default useUpdateEffect;
