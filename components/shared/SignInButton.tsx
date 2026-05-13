import Button from "@mui/material/Button";
import { Login } from "@mui/icons-material";
import { ButtonProps } from "types/componentProps.types";

export default function SignInButton({ handler }: ButtonProps) {
    return (
        <div>
            <Button
                endIcon={(<Login />) as React.ReactNode}
                size="large"
                color="inherit"
                variant="outlined"
                onClick={() => {
                    handler();
                }}
            >
                Sign in
            </Button>
        </div>
    );
}
