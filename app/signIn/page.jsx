"use client";

import { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Paper } from "@mui/material";
import { useRouter } from "next/navigation"; 
import axios from 'axios';

const SignIn = ({ onSignIn }) => { // Receive onSignIn as a prop
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const FetchUsers = async () => {
        var id = 0;
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/v1/users/login', {
                params: {
                    email: email,
                    password: password
                }
            });
            id = response.data._id;
            // Set local storage
            localStorage.setItem('user', email);
            localStorage.setItem('userID', id);
            localStorage.setItem('isAuthenticated', 'true');
            // Redirect to home page
            router.push("/");
        } catch (e) {
            switch (e.response.status) {
                case 401:
                case 402:
                    alert('Invalid credentials');
                    break;
                case 403:
                    alert('Wrong password or email');
                    break;
                case 404:
                    alert('User not found');
                    break;
                default:
                    console.log(e.response.data);
                    break;
            }
        }
    };


    const handleSubmit = (e) => {
        // Prevent the default form submission behavior
        e.preventDefault();

        FetchUsers();
    }

    const handleSU = () => {
        router.push("/signUp");
    };    

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: 'url(/banner.jpg)',
                backgroundSize: 'cover',
            }}
        >
            <Box pt={5} pb={5}>
                <Container maxWidth="sm" >
                    <Paper elevation={3} sx={{ borderRadius: 3}}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                padding: 4,
                            }}
                        >
                            <Typography variant="h1" sx={{ color: 'text.dark', marginBottom: 5 }}>
                                Sign In
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.dark', marginBottom: 2 }}>
                                Welcome back! Your apps are waiting for you.
                            </Typography>
                            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                                <TextField
                                    label="Email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    fullWidth
                                    size='small'
                                    required
                                    margin="normal"
                                    sx={{
                                        color: 'text.dark', 
                                        '& .MuiInputLabel-root': {
                                            color: 'text.dark', 
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: 'text.dark', 
                                        },
                                        '& .MuiInputBase-input': {
                                            color: 'text.dark', 
                                        },
                                        '& .MuiFormLabel-asterisk': {
                                            display: 'none',
                                        },
                                    }}
                                />
                                <TextField
                                    label="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    fullWidth
                                    size='small'
                                    required
                                    margin="normal"
                                    sx={{
                                        color: 'text.dark', 
                                        '& .MuiInputLabel-root': {
                                            color: 'text.dark', 
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: 'text.dark', 
                                        },
                                        '& .MuiInputBase-input': {
                                            color: 'text.dark', 
                                        },
                                        '& .MuiFormLabel-asterisk': {
                                            display: 'none',
                                        },
                                    }}
                                />
                                <Button type="submit" variant="contained" color="secondary" fullWidth sx={{ mt: 2 }}>
                                    Login
                                </Button>
                            </form>
                            <Box sx={{ mt: 2, textAlign: 'center' }}>
                                <Typography variant='h6' align='center' color='text.dark'>
                                    Don't have an account? {' '}
                                <Typography variant='h6' component='span' color='secondary' sx={{ cursor: 'pointer', '&:hover': {color: 'black'}}} onClick={handleSU}>Sign Up</Typography>
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </Box>
    );
};

export default SignIn;