import React, { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  IconButton,
  Rating,
  Button,
} from '@mui/material';
import {
  Add,
  Remove,
  Facebook,
  LinkedIn,
  Twitter,
  CompareArrows,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

import NavBar from '../molecules/NavBar';
import Footer from '../molecules/Footer';
import CardComp from '../atoms/CardComp';
import CardData from '../../constants/CardData';

export default function ProductPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const product = location.state?.product || null;

  // ✅ hooks
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [mainImage, setMainImage] = useState(product?.fImg || '');
  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedColor, setSelectedColor] = useState('#816DFA');

  if (!product) return <div>No product found.</div>;

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find((i) => i.id === product.id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ ...product, quantity, selectedSize, selectedColor });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    setIsAdded(true);
    setQuantity(1);
  };

  return (
    <Box>
      <NavBar />

      {/* Product Section */}
      <Box
        sx={{
          display: { xs: 'block', md: 'flex' },
          gap: 5,
          px: { xs: 2, md: 8 },
          py: 6,
        }}
      >
     
{/* LEFT: Thumbnails */}
<Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    mb: { xs: 2, md: 0 },
  }}
>
  {/* Four copies of the main image */}
  {Array(4).fill(product.fImg).map((img, index) => (
    <Box
      key={index}
      component="img"
      src={img}
      alt={`thumb-${index}`}
      onClick={() => setMainImage(img)}
      sx={{
        width: 80,
        height: 80,
        objectFit: 'cover',
        border: mainImage === img ? '2px solid #B88E2F' : '1px solid #ccc',
        cursor: 'pointer',
      }}
    />
  ))}
</Box>


        {/* CENTER: Main Image */}
        <Box>
          <Box
            component="img"
            src={mainImage}
            alt={product.fName}
            sx={{
              width: { xs: '100%', md: 420 },
              height: { xs: 300, md: 520 },
              objectFit: 'cover',
              borderRadius: 1,
            }}
          />
        </Box>

        {/* RIGHT: Product Details */}
        <Box sx={{ maxWidth: 450, mt: { xs: 3, md: 0 } }}>
          <Typography fontSize={36}>{product.fName}</Typography>
          <Typography fontSize={22} color="#9F9F9F">
            {product.fPrice}
          </Typography>

          <Box display="flex" alignItems="center" mt={1} gap={1}>
            <Rating defaultValue={4.5} precision={0.5} readOnly />
            <Typography color="#9F9F9F">| 5 Reviews</Typography>
          </Box>

          <Typography mt={3} color="#666">
            {product.fDesc}
          </Typography>

          {/* Size Selector */}
          <Typography mt={3} color="#9F9F9F" fontWeight={500}>
            Size
          </Typography>
          <Box display="flex" gap={1} mt={1}>
            {['L', 'XL', 'XS'].map((size) => (
              <Button
                key={size}
                onClick={() => setSelectedSize(size)}
                sx={{
                  minWidth: 0,
                  width: 35,
                  height: 35,
                  bgcolor: selectedSize === size ? '#B88E2F' : '#F9F1E7',
                  color: selectedSize === size ? '#fff' : '#000',
                  borderRadius: 1,
                  fontSize: 14,
                  '&:hover': { bgcolor: selectedSize === size ? '#B88E2F' : '#eee' },
                }}
              >
                {size}
              </Button>
            ))}
          </Box>

          {/* Color Selector */}
          <Typography mt={2} color="#9F9F9F" fontWeight={500}>
            Color
          </Typography>
          <Box display="flex" gap={1} mt={1}>
            {['#816DFA', '#000000', '#B88E2F'].map((color) => (
              <Box
                key={color}
                onClick={() => setSelectedColor(color)}
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  bgcolor: color,
                  border: selectedColor === color ? '2px solid #B88E2F' : '1px solid #ccc',
                  cursor: 'pointer',
                }}
              />
            ))}
          </Box>

          {/* Quantity + Add To Cart */}
          <Box display="flex" gap={2} alignItems="center" mt={3}>
            <Box
              display="flex"
              alignItems="center"
              border="1px solid #999"
              borderRadius="8px"
              px={2}
            >
              <IconButton onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                <Remove />
              </IconButton>
              <Typography px={2}>{quantity}</Typography>
              <IconButton onClick={() => setQuantity(q => q + 1)}>
                <Add />
              </IconButton>
            </Box>

            <Button
              variant="outlined"
              onClick={() => (isAdded ? navigate('/cart') : handleAddToCart())}
              sx={{
                border: '1px solid #000',
                borderRadius: '8px',
                px: 4,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              {isAdded ? 'Go to Cart' : 'Add To Cart'}
            </Button>

            <Button
              variant="outlined"
              startIcon={<CompareArrows />}
              sx={{
                border: '1px solid #000',
                borderRadius: '8px',
                px: 4,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              Compare
            </Button>
          </Box>

          {/* SKU, Category, Tags, Share */}
          <Divider sx={{ my: 4 }} />
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography color="#9F9F9F">SKU : SS001</Typography>
            <Typography color="#9F9F9F">Category : Furniture</Typography>
            <Typography color="#9F9F9F">Tags : Chair, Home</Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography color="#9F9F9F">Share:</Typography>
              <Facebook sx={{ cursor: 'pointer' }} />
              <LinkedIn sx={{ cursor: 'pointer' }} />
              <Twitter sx={{ cursor: 'pointer' }} />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Related Products */}
      <Box mt={6} textAlign="center">
        <Typography fontSize={20} fontWeight={600} mb={3}>
          Related Products
        </Typography>
        <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
          {CardData.slice(0, 4).map((card) => (
            <CardComp key={card.id} cardData={card} />
          ))}
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
