import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Image from "next/image";
import Logo from "assets/logo.svg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MuiAppBar from "@mui/material/AppBar";
import { HeaderProps } from "types/componentProps.types";
import { Avatar, Typography } from "@mui/material";
import { Logout } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { use } from "react";
import { AppContext } from "context/AppContext";
import logger from "../logger";

// If the user has no username, we assign "User" as default
export default function Header({ img, name = "User" }: Readonly<HeaderProps>) {
    const userAvatar = img ? <Avatar src={img} /> : <AccountCircleIcon fontSize="large" />;
    const LOGOUT_ENDPOINT = process.env.NEXT_PUBLIC_SETTINGS_API_LOGOUT_ENDPOINT ?? "";
    const router = useRouter();
    const { setUserData } = use(AppContext);

    const doLogout = () => {
        fetch(LOGOUT_ENDPOINT, { credentials: "include" })
            .then(res => {
                if (res.status === 200) {
                    setUserData({}); // reset user data
                    router.push("/login");
                }
            })
            .catch(error => {
                logger.error(error, "Logout failed: ");
            });
    };

    return (
        <MuiAppBar>
            <Toolbar className="mainToolbar" sx={{ justifyContent: "space-between" }}>
                <List component="nav">
                    <Image alt="" layout="fixed" src={Logo as string} width={125} height={52} />
                </List>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Typography color="white" variant="h6" sx={{ marginRight: "10px" }}>
                        Hello {name}
                    </Typography>
                    {userAvatar}
                    <Button
                        endIcon={<Logout />}
                        size="small"
                        color="inherit"
                        variant="outlined"
                        onClick={doLogout}
                        sx={{ marginLeft: "10px" }}
                    />
                </div>
            </Toolbar>
        </MuiAppBar>
    );
}
