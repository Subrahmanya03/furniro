import React, { useState, useEffect } from 'react';
import { 
    Box, Typography, Container, Grid, Button, Card, CardMedia, CardContent, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';

import NavBar from '../molecules/NavBar';
import Footer from '../molecules/Footer';

// Utility to notify NavBar or other components
const dispatchUpdate = (eventName) => {
    window.dispatchEvent(new Event(eventName));
};

export default function WishlistPage() {
    const [wishlistItems, setWishlistItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadWishlist = () => {
            const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            // Normalize items: ensure price exists and is a number
            const normalized = storedWishlist.map(item => ({
                ...item,
                price: Number(item.price ?? item.fPrice ?? 0)
            }));
            setWishlistItems(normalized);
        };
        loadWishlist();
        window.addEventListener('wishlistUpdated', loadWishlist);
        return () => window.removeEventListener('wishlistUpdated', loadWishlist);
    }, []);

    const removeItemFromWishlist = (id) => {
        const updatedWishlist = wishlistItems.filter(item => item.id !== id);
        setWishlistItems(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        dispatchUpdate('wishlistUpdated');
    };

    const moveToCart = (item) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(i => i.id === item.id && i.color === item.color);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...item, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        dispatchUpdate('cartUpdated');

        removeItemFromWishlist(item.id);
        navigate('/cart');
    };

    // === Empty Wishlist View ===
    if (wishlistItems.length === 0) {
        return (
            <Box>
                <NavBar />
                <Container maxWidth="md" sx={{ py: 8, textAlign: 'center', minHeight: '60vh' }}>
                    <Typography variant="h4" gutterBottom>Your Wishlist is Empty 😭</Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                        Save your favorite items here while you decide!
                    </Typography>
                    <Button 
                        variant="contained" 
                        onClick={() => navigate('/shop')}
                        sx={{ borderRadius: '50px', padding: '10px 30px' }}
                    >
                        Start Shopping
                    </Button>
                </Container>
                <Footer />
            </Box>
        );
    }

    // === Wishlist Items View ===
    return (
        <Box>
            <NavBar />
            <Container maxWidth="xl" sx={{ py: 6 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
                    My Wishlist ({wishlistItems.length} items)
                </Typography>

                <Grid container spacing={4}>
                    {wishlistItems.map((item) => (
                        <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={item.image ?? item.fImg}
                                    alt={item.name ?? item.fName}
                                    sx={{ objectFit: 'cover' }}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h6" component="div" fontWeight="bold">
                                        {item.name ?? item.fName}
                                    </Typography>
                                    <Typography variant="body1" color="primary" fontWeight="bold" sx={{ mb: 1 }}>
                                        ${Number(item.price ?? 0).toFixed(2)}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Color: {item.color ?? 'Default'}
                                    </Typography>
                                </CardContent>
                                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                                    <Button 
                                        variant="outlined" 
                                        startIcon={<ShoppingCartIcon />}
                                        onClick={() => moveToCart(item)}
                                        sx={{ textTransform: 'none' }}
                                    >
                                        Add to Cart
                                    </Button>
                                    <IconButton color="error" onClick={() => removeItemFromWishlist(item.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Footer />
        </Box>
    );
}
