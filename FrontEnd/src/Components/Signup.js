import { Box, Button, TextField } from '@material-ui/core';
import React from 'react'
import { useState } from 'react';
import { CryptoState } from '../CryptoContext';

const Signup = ({ handleClose, setValue }) => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("");
    const { setAlert } = CryptoState();

    const handleSubmit = async () => {

        const response = await fetch("https://crypto-hunter-website-project.herokuapp.com/api/auth/createUser", {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json()

        if (json.success) {
            //handleClose();
            setValue(0);
            setAlert({
                open: true,
                message: "Sign In Successfull , Now Log In With Email and PassWord",
                type: "success",
            });
        }
        else {
            setAlert({
                open: true,
                message: (json.errors),
                type: "error",
            });
            handleClose();
        }
    }




    return (

        <Box p={3} style={{
            display: "flex", flexDirection: "column", gap: "20px", padding: 15
        }}>
            <TextField variant='outlined' label="Enter Name" value={name} type="Name" onChange={(e) => setName(e.target.value)} fullWidth />
            <TextField variant='outlined' label="Enter Email" value={email} type="Email" onChange={(e) => setEmail(e.target.value)} fullWidth />
            <TextField variant='outlined' label="Enter Password" value={password} type="Password" onChange={(e) => setPassword(e.target.value)} fullWidth />
            <Button variant="contained" size='large' onClick={handleSubmit} style={{ backgroundColor: "#EEBC1D" }}>Signup</Button>
        </Box>

    )
}

export default Signup