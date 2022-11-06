import { Box, Button, TextField } from '@material-ui/core';
import React from 'react'
import { useState } from 'react';
import { CryptoState } from '../CryptoContext';

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { setuserEx, setAlert } = CryptoState();

  const handleSubmit = async () => {
    const response = await fetch("https://crypto-hunter-website-project.herokuapp.com/api/auth/login", {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({ email, password })
    });
    const json = await response.json()
    console.log(json)



    if (json.success) {
      localStorage.setItem('token', json.AuthToken);
      setuserEx(json.AuthToken);
      handleClose();
      setAlert({
        open: true,
        message: "Log In Successfull",
        type: "success",
      });

    }
    else {
      setAlert({
        open: true,
        message: (json.errors),
        type: "error",
      });
      
    }
  };

  return (
    <Box p={3} style={{
      display: "flex", flexDirection: "column", gap: "20px", padding: 15
    }}>
      <TextField variant='outlined' label="Enter Email" value={email} type="Email" onChange={(e) => setEmail(e.target.value)} fullWidth />
      <TextField variant='outlined' label="Enter Password" value={password} type="Password" onChange={(e) => setPassword(e.target.value)} fullWidth />
      <Button variant="contained" size='large' onClick={handleSubmit} style={{ backgroundColor: "#EEBC1D" }}>Login</Button>
    </Box>
  )
}

export default Login