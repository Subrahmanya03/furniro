// src/components/atoms/CardComp.jsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShareIcon from '@mui/icons-material/Share';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function CardComp({ cardData }) {
  const navigate = useNavigate();

  // ✅ HOOKS MUST COME FIRST
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    setWishlistItems(JSON.parse(localStorage.getItem('wishlist')) || []);
  }, []);

  // ✅ SAFE GUARD AFTER HOOKS
  if (!cardData || !cardData.id) return null;

  const isItemWishlisted = (id) =>
    wishlistItems.some((item) => item.id === id);

  const toggleWishlist = (item, e) => {
    e.stopPropagation();

    let updated;
    if (isItemWishlisted(item.id)) {
      updated = wishlistItems.filter((i) => i.id !== item.id);
      toast.info('Removed from Wishlist');
    } else {
      updated = [...wishlistItems, item];
      toast.success('Added to Wishlist');
    }

    setWishlistItems(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  const handleAddToCart = (item, e) => {
    e.stopPropagation();

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cart.findIndex((i) => i.id === item.id);

    if (index !== -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    toast.success('Added to Cart');
  };

  return (
    <Box
      sx={{
        width: 260,
        boxShadow: 3,
        position: 'relative',
        m: 1,
        borderRadius: 2,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: '0.3s',
        '&:hover .overlay': { display: 'flex' },
      }}
      onClick={() =>
        navigate(`/product/${cardData.id}`, {
          state: { product: cardData },
        })
      }
    >
      <img
        src={cardData.fImg}
        alt={cardData.fName}
        width="100%"
        height="250"
        style={{ objectFit: 'cover' }}
      />

      {/* Hover Overlay */}
      <Box
        className="overlay"
        sx={{
          display: 'none',
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(0,0,0,0.6)',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
        }}
      >
        <Button
          onClick={(e) => handleAddToCart(cardData, e)}
          startIcon={<ShoppingCartIcon />}
          sx={{
            bgcolor: '#B88E2F',
            color: 'white',
            '&:hover': { bgcolor: '#A36F2A' },
            textTransform: 'none',
          }}
        >
          Add to Cart
        </Button>

        <Box>
          <IconButton onClick={(e) => toggleWishlist(cardData, e)}>
            {isItemWishlisted(cardData.id) ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon sx={{ color: 'white' }} />
            )}
          </IconButton>

          <IconButton sx={{ color: 'white' }} onClick={(e) => e.stopPropagation()}>
            <ShareIcon />
          </IconButton>

          <IconButton sx={{ color: 'white' }} onClick={(e) => e.stopPropagation()}>
            <CompareArrowsIcon />
          </IconButton>
        </Box>
      </Box>

      <Box p={2}>
        <Typography fontWeight="bold">{cardData.fName}</Typography>
        <Typography color="gray">{cardData.fDesc}</Typography>
        <Typography color="#B88E2F" fontWeight="bold">
          {cardData.fPrice}
        </Typography>
      </Box>
    </Box>
  );
}
