import "./login.modal.css"
import { Button, Modal, Stack, TextField } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import AuthService from "../../services/auth.service";



const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface LoginModalProps {
    open: boolean;
    onClose: () => void;
    authService: AuthService;
}

function LoginModal({ open, onClose, authService }: LoginModalProps) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 200,
                },
            }}
        >
            <Fade in={open}>
                <Box sx={style} id="login-modal">
                    <Typography id="login-title" variant="h6" component="h2">
                        Log in / sign up
                    </Typography>
                    <LoginForm authService={authService}/>
                </Box>
            </Fade>
        </Modal>
    );
}


interface LoginFormProps {
    authService: AuthService;
}

function LoginForm({ authService }: LoginFormProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleChange(field: string) {
        return function handleEvent(event: React.ChangeEvent<HTMLInputElement>) {
            if (field === "username") setUsername(event.target.value);
            if (field === "password") setPassword(event.target.value);
        }
    }

    async function confirm() {
        if (!username || !password) return;
        const jwt = await authService.login(username, password);
        console.log(jwt);
    }

    return (
        <Stack spacing={3}>
            <TextField
                label="Username"
                onChange={handleChange("username")}
            />
            <TextField
                label="Password"
                onChange={handleChange("password")}
            />
            <Button onClick={confirm}>Confirm</Button>
        </Stack>
    )
}


export default LoginModal;