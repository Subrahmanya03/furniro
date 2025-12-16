import React, { useState } from 'react';
// FIX: Using aliases for custom components to avoid conflicts with MUI components
import CustomButton from '../../components/atoms/Button';
import CustomInput from '../../components/atoms/Input';

// Note: This Button is the Material-UI Button component, used for social logins
import { Box, Button, Divider, Grid, Typography, useMediaQuery } from '@mui/material'; 

import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Image imports
import loginImage from "../../assets/loginImage.png";
import womenImg from "../../assets/womenImg.png";
import flashLogo from "../../assets/flashLogo.png";


function LoginPage() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:768px)');

    const validate = () => {
        const newErrors = {};
        if (!formData.username.trim()) {
            newErrors.username = "Username is required";
        }
        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = () => {
        if (validate()) {
            navigate("/home");
        }
    };

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{
                minHeight: '100vh',
                background: '#f9f9f9',
                flexDirection: isMobile ? 'column' : 'row',
                padding: isMobile ? '20px' : '0'
            }}
        >
            {/* Left Side - Login Form */}
            <Box
                width={isMobile ? '90%' : '150%'}
                maxWidth="400px"
                p={4}
                borderRadius={isMobile ? '10px' : '2% 0 0 2%'}
                bgcolor="#fff"
                boxShadow={3}
                display="flex"
                flexDirection="column"
                gap={2}
                mb={isMobile ? 4 : 0}
            >
                <Typography variant="h5" fontWeight="bold" align="center">
                    LOGIN
                </Typography>

                <Typography variant="body2" align="center" color="textSecondary">
                    How to i get started lorem ipsum dolor at?
                </Typography>

                <Box display="flex" justifyContent="center">
                    {/* Using CustomInput (alias for Input.jsx) */}
                    <CustomInput
                        placeholder="Username"
                        icon="person"
                        value={formData.username}
                        onChange={(e) =>
                            setFormData({ ...formData, username: e.target.value })
                        }
                        sx={{
                            width: isMobile ? '100%' : '320px',
                            borderRadius: '50px'
                        }}
                    />
                </Box>
                {errors.username && (
                    <Typography color="error" variant="caption" align="center">
                        {errors.username}
                    </Typography>
                )}

                <Box display="flex" justifyContent="center">
                    {/* Using CustomInput (alias for Input.jsx) */}
                    <CustomInput
                        placeholder="Password"
                        icon="lock"
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                        }
                        sx={{
                            width: isMobile ? '100%' : '320px',
                            borderRadius: '50px'
                        }}
                    />
                </Box>
                {errors.password && (
                    <Typography color="error" variant="caption" align="center">
                        {errors.password}
                    </Typography>
                )}

                <Box display="flex" justifyContent="center">
                    {/* Using CustomButton (alias for Button.jsx) */}
                    <CustomButton
                        btnText="Login Now"
                        onClick={handleLogin}
                        sx={{
                            background: 'linear-gradient(to right, #7b5cff, #5b3cff)',
                            borderRadius: '50px',
                            color: '#fff',
                            fontWeight: 'bold',
                            padding: '12px 40px',
                            width: isMobile ? '100%' : 'fit-content',
                            textAlign: 'center',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                            fontSize: '16px',
                            textDecoration: 'none'
                        }}
                    />
                </Box>

                <Divider sx={{ my: 2 }}>
                    <Typography variant="subtitle2">
                        <b>Login</b> with Others
                    </Typography>
                </Divider>

                <Button // MUI Button
                    variant="outlined" 
                    className="d-flex align-items-center mb-2"
                    sx={{
                        borderRadius: '10px',
                        color: "black",
                        padding: '10px 0',
                        width: isMobile ? '100%' : 'auto',
                        borderColor: '#e0e0e0',
                    }}
                >
                    <FcGoogle size={24} style={{ marginRight: '10px' }} />
                    Login with Google
                </Button>

                <Button // MUI Button
                    variant="outlined"
                    className="d-flex align-items-center mb-2"
                    sx={{
                        borderRadius: '10px',
                        color: 'black',
                        padding: '10px 0',
                        width: isMobile ? '100%' : 'auto',
                        borderColor: '#e0e0e0',
                    }}
                >
                    <FaFacebookF size={20} style={{ marginRight: '10px', color: 'blue' }} />
                    Login with Facebook
                </Button>
            </Box>

            {/* Right Side Image Section */}
            {!isMobile && (
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: '#fff',
                        overflow: 'hidden',
                    }}
                >
                    <Box
                        className="rightSide"
                        width="100%"
                        position="relative"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <img
                            src={loginImage}
                            alt="add bg"
                            className='loginImg'
                            style={{
                                height: "536px",
                                width: "480px",
                                borderRadius: "0 2% 2% 0",
                                objectFit: "cover"
                            }}
                        />

                        {/* White/Transparent Overlay */}
                        <Box
                            sx={{
                                height: "420px",
                                width: "70%",
                                borderRadius: "5%",
                                position: "absolute",
                                top: "16%",
                                right: "18%",
                                opacity: "0.3",
                                backgroundColor: "white"
                            }}
                        />

                        {/* Text */}
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            sx={{
                                position: "absolute",
                                top: "24%",
                                right: "60%",
                                color: "white",
                            }}
                        >
                            Very good <br />works are <br />waiting for <br />you Login <br />Now!!!
                        </Typography>

                        {/* Woman Image */}
                        <img
                            src={womenImg}
                            alt="add bg"
                            className='womenImg'
                            style={{
                                position: "absolute",
                                height: "370px",
                                top: "24%",
                                right: "2%"
                            }}
                        />

                        {/* Logo */}
                        <img
                            src={flashLogo}
                            alt="add logo"
                            style={{
                                position: "absolute",
                                height: "70px",
                                top: "60%",
                                right: "81%"
                            }}
                        />
                    </Box>
                </Grid>
            )}
        </Grid>
    );
}

export default LoginPage;