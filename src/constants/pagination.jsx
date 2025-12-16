import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';

import cardImg1 from '../assets/cardImg1.png'
import cardImg7 from '../assets/cardImg7.png'
import cardImg6 from '../assets/cardImg6.png'
import Rectangle from '../assets/Rectangle 24.png'


const images = [
  Rectangle,
  cardImg6,
  cardImg7,
  cardImg1,
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = images.length;
  const nextIndex = (currentIndex + 1) % total;

  const goToFirst = () => setCurrentIndex(0);
  const goToPrev = () => setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  const goToNext = () => setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  const goToLast = () => setCurrentIndex(total - 1);
  const goToSlide = (index) => setCurrentIndex(index);

  return (
    <Box textAlign="center" mt={5}  width="400px" mx="auto">
      {/* Image and Preview Container */}
      <Box display="flex" position="relative" justifyContent="center" alignItems="center" gap={2}>
        {/* Main Image Box */}
        <Box position="relative" paddingLeft="50px" width="700px">
          <Box
            component="img"
            src={images[currentIndex]}
            alt={`Slide ${currentIndex}`}
            sx={{
              width: '500px',
              height: '530px',
              objectFit: 'cover',
            //   borderRadius: 3,
              boxShadow: 3,
            }}
          />

          {/* Left Arrow */}
          {/* <IconButton
            onClick={goToPrev}
            sx={{
              position: 'absolute',
              top: '50%',
              left: 16,
              transform: 'translateY(-50%)',
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '50%',
              boxShadow: 2,
              '&:hover': { backgroundColor: '#eee' },
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton> */}

          {/* Right Arrow */}
          <IconButton
            onClick={goToNext}
            sx={{
              position: 'absolute',
              top: '40%',
              left:"925px",
              transform: 'translateY(-50%)',
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '50%',
              boxShadow: 2,
              '&:hover': { backgroundColor: '#eee' },
              zIndex:"1000"
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>

        {/* Preview Image Box (Right Side) */}
        <Box width="30%" position="relative" bottom="60px"  >
          <Box
            component="img"
            src={images[nextIndex]}
            alt="Next Preview"
            sx={{
              width: '380px',
              height: '400px',
              objectFit: 'cover',
            //   borderRadius: 2,
              boxShadow: 1,
            //   opacity: 0.7,
              transition: 'opacity 0.3s ease',
              '&:hover': {
                opacity: 1,
                
                
              },
            }}
          />
        </Box>
      </Box>

      {/* Navigation Buttons: First & Last
      <Box mt={2} display="flex" justifyContent="center" gap={2}>
        <IconButton onClick={goToFirst} sx={navButtonStyles}>
          <FirstPageIcon />
        </IconButton>
        <IconButton onClick={goToLast} sx={navButtonStyles}>
          <LastPageIcon />
        </IconButton>
      </Box> */}

      {/* Dots */}
      <Box display="flex" position="relative" pb={5} mt={2} gap={1} sx={{left:"430px",bottom:"120px"}}>
        {images.map((_, index) => (
          <Box
            key={index}
            onClick={() => goToSlide(index)}
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              border: index === currentIndex ? '2px solid #c59f45' : '1px solid #ccc',
              backgroundColor: index === currentIndex ? '#c59f45' : 'transparent',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

const navButtonStyles = {
  backgroundColor: '#fff',
  border: '1px solid #ccc',
  borderRadius: '50%',
  boxShadow: 2,
  '&:hover': { backgroundColor: '#eee' },
};

export default ImageCarousel;

