import CircleIcon from "@mui/icons-material/Circle";
import SignInButton from "components/shared/SignInButton";
import { Card, CardContent } from "@mui/material";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { authFetcher } from "utils/utils";
import IDLoader from "components/shared/IDLoader";
import { use, useState } from "react";
import { AppContext } from "context/AppContext";
import { User } from "types/context.types";
import logger from "../logger";

export default function LoginPage() {
    const [shouldFetch, setShouldFetch] = useState(false);
    const router = useRouter();
    // don't need userData here
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { setUserData, userData } = use(AppContext);

    const USER_ENDPOINT = process.env.NEXT_PUBLIC_SETTINGS_API_USER_AUTHENTICATION_ENDPOINT ?? "";
    const LOGIN_ENDPOINT = process.env.NEXT_PUBLIC_SETTINGS_API_LOGIN_ENDPOINT ?? "";

    const { data, isLoading } = useSWR(shouldFetch ? USER_ENDPOINT : null, authFetcher);
    const doLogin = () => {
        setShouldFetch(true);
    };

    if (data) {
        if ((data.res instanceof Response) && data.res.status === 200) {
            // User is logged in
            data.data?.then((user: User) => {
                const firstName = user?.name?.split(" ")[0];
                setUserData({ name: firstName, imgUrl: user.picture });
            })
                .catch(error => {
                    logger.error(error, "Failed to load data");
                    // Handle error appropriately
                });
        } else {
            // Some error has occurred, maybe CORS, maybe not. We don't care. Backend should handle it.
            router.push(LOGIN_ENDPOINT);
            return <div />;
        }
    }

    if (isLoading) {
        return <IDLoader />;
    }

    return (
        <Card
            sx={{
                border: "2px solid black",
                borderRadius: "25px",
                width: "40%",
                margin: "auto",
                marginTop: "20%",
                textAlign: "center",
            }}
        >
            <CardContent sx={{ marginBottom: "30px" }}>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <CircleIcon sx={{ height: "50px", width: "50px", margin: "0 20px" }} />
                    <h1>Hello</h1>
                </div>
                <div>
                    <p>Sign in with Google to start doing great things</p>
                    <SignInButton handler={doLogin} />
                </div>
            </CardContent>
        </Card>
    );
}
