// src/components/organisms/About.jsx
import React from 'react';
import NavBar from '../molecules/NavBar';
import Footer from '../molecules/Footer';
import { Box, Typography } from '@mui/material';

export default function About() {
  return (
    <Box>
      <NavBar />

      {/* Banner Section */}
      <Box
        sx={{
          width: '100%',
          height: { xs: '200px', md: '300px' },
          backgroundImage: `url("https://www.clickslice.co.uk/wp-content/uploads/2021/09/about-us-page.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >

      </Box>

      {/* Content Section */}
      <Box
        sx={{
          maxWidth: '900px',
          margin: '40px auto',
          padding: '0 20px',
          textAlign: 'center',
        }}
      >
        <Typography sx={{ fontSize: '18px', color: '#555', lineHeight: 1.8 }}>
          Welcome to our company! We are dedicated to providing top-quality products and
          exceptional service to our customers. Our mission is to deliver innovation, value,
          and satisfaction in everything we do. With years of experience and a passionate
          team, we aim to create meaningful experiences for our clients and build long-lasting
          relationships.
        </Typography>

        <Typography sx={{ fontSize: '18px', color: '#555', lineHeight: 1.8, mt: 3 }}>
          Our values are centered around integrity, excellence, and continuous improvement.
          We believe in creating products that not only meet but exceed expectations. Thank
          you for choosing us and being part of our journey!
        </Typography>
      </Box>

      <Footer />
    </Box>
  );
}
