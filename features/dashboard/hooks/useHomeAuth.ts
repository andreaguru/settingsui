import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
import useSWR from "swr";
import { AppContext } from "context/AppContext";
import { User } from "types/context.types";
import { authFetcher } from "utils/utils";
import logger from "../../../logger";

interface AuthFetcherResult {
    res: Response | Error
    data: Promise<User> | null
}

export function useHomeAuth() {
    const router = useRouter();
    const { setUserData, userData } = use(AppContext);

    const userEndpoint = process.env.NEXT_PUBLIC_SETTINGS_API_USER_AUTHENTICATION_ENDPOINT ?? "";
    const skipAuth = Boolean(process.env.NEXT_PUBLIC_SKIP_AUTH);

    const { data, isLoading } = useSWR<AuthFetcherResult>(
        Object.keys(userData).length === 0 ? userEndpoint : null,
        authFetcher,
    );

    const hasResponseGlobal = typeof Response !== "undefined";
    const isAuthenticated =
        hasResponseGlobal && (data?.res instanceof Response) && data.res.status === 200;

    const shouldBlockRender = Boolean(data && !skipAuth && !isAuthenticated);

    useEffect(() => {
        if (!data || skipAuth || !isAuthenticated) {
            return;
        }

        void data.data?.then((user: User) => {
            const firstName = user?.name?.split(" ")[0];
            setUserData({ name: firstName, imgUrl: user.picture });
        })
            .catch(error => {
                logger.error(error, "Failed to load data");
            });
    }, [data, isAuthenticated, setUserData, skipAuth]);

    useEffect(() => {
        if (!shouldBlockRender) {
            return;
        }

        if ("push" in router && typeof router.push === "function") {
            void router.push("/login");
        }
    }, [router, shouldBlockRender]);

    return {
        isAuthLoading: isLoading,
        shouldBlockRender,
        userData,
    };
}
