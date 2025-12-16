import React, { useState } from 'react';
import { 
    Box, 
    Typography, 
    Container, 
    Grid, 
    TextField, 
    Button, 
    Card, 
    CardContent
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// 1. Import the Reusable NavBar Component
import NavBar from '../molecules/NavBar'; // Adjust path if necessary

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
        
        // In a real application, you would send this data to a backend API here.
        alert('Thank you for your message! We will get back to you soon.');
        
        // Clear the form
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <Box>
            {/* Navigation Bar */}
            <NavBar />

            <Container maxWidth="lg" sx={{ py: 6 }}>
                
                {/* Header Section */}
                <Typography 
                    variant="h3" 
                    component="h1" 
                    align="center" 
                    gutterBottom 
                    sx={{ fontWeight: 700, mb: 2 }}
                >
                    Get in Touch
                </Typography>
                <Typography 
                    variant="h6" 
                    align="center" 
                    color="text.secondary" 
                    sx={{ mb: 6 }}
                >
                    We'd love to hear from you. Send us a message or find our contact details below.
                </Typography>

                <Grid container spacing={4}>
                    
                    {/* Left Side: Contact Form */}
                    <Grid item xs={12} md={7}>
                        <Card elevation={3}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                                    Send us a Message
                                </Typography>
                                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                required
                                                label="Full Name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                required
                                                label="Email Address"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                required
                                                label="Your Message"
                                                name="message"
                                                multiline
                                                rows={5}
                                                value={formData.message}
                                                onChange={handleChange}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                endIcon={<SendIcon />}
                                                sx={{ 
                                                    mt: 1,
                                                    borderRadius: '50px',
                                                    padding: '10px 30px',
                                                }}
                                            >
                                                Send Message
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Right Side: Contact Details */}
                    <Grid item xs={12} md={5}>
                        <Card elevation={3} sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                                    Contact Information
                                </Typography>

                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <PhoneIcon color="primary" sx={{ mr: 2 }} />
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight="bold">Phone</Typography>
                                        <Typography variant="body2"> 8197234163 </Typography>
                                    </Box>
                                </Box>
                                
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <EmailIcon color="primary" sx={{ mr: 2 }} />
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight="bold">Email</Typography>
                                        <Typography variant="body2">support@furniro.com</Typography>
                                    </Box>
                                </Box>
                                
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                                    <LocationOnIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight="bold">Address</Typography>
                                        <Typography variant="body2">123 Furniture Lane, Bangalore </Typography>
                                    </Box>
                                </Box>

                                {/* Optional: Map Placeholder */}
                                <Box 
                                    sx={{ 
                                        height: 150, 
                                        bgcolor: '#e0e0e0', 
                                        mt: 3, 
                                        borderRadius: 1, 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center' 
                                    }}
                                >
                                    <Typography color="text.secondary">Map Placeholder</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}