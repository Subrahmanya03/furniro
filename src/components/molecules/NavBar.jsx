import * as React from 'react';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';


// FIX: Static public URL for logo (assumes file is in public/assets)
const FURNIRO_LOGO_URL = '/assets/furniroLogo.png';


const pages = [
  { id: 'home', label: 'Home' },
  { id: 'shop', label: 'Shop' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export default function NavBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalQty = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
    setCartCount(totalQty);
  };

  const updateWishlistCount = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlistCount(wishlist.length);
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  useEffect(() => {
    updateWishlistCount();
    window.addEventListener('wishlistUpdated', updateWishlistCount);
    return () => {
      window.removeEventListener('wishlistUpdated', updateWishlistCount);
    };
  }, []);
  
  const renderCounter = (count) => count > 0 && (
    <Box
      sx={{
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: 'red',
        color: 'white',
        borderRadius: '50%',
        width: 18,
        height: 18,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '12px'
      }}
    >
      {count}
    </Box>
  );

  return (
    <AppBar position="sticky" color="default" sx={{ zIndex: 1001 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <img src={FURNIRO_LOGO_URL} alt="logo" style={{ width: 30, height: 20 }} /> 
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'black',
                textDecoration: 'none',
                display: 'flex'
              }}
            >
              FURNIRO
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: 4 }}>
            {pages.map((page) => (
              <Button
                key={page.id}
                component={Link}
                to={`/${page.id}`}
                sx={{ color: 'black', fontWeight: 500 }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
            <IconButton component={Link} to="/account" color="inherit" aria-label="Account">
                <AccountCircleOutlinedIcon />
            </IconButton>
            <IconButton component={Link} to="/search" color="inherit" aria-label="Search">
                <SearchOutlinedIcon />
            </IconButton>

            <Link to="/wishlist" style={{ color: 'inherit' }}>
              <Box position="relative">
                <FavoriteBorderOutlinedIcon aria-label="Wishlist" />
                {renderCounter(wishlistCount)}
              </Box>
            </Link>

            <Link to="/cart" style={{ color: 'inherit' }}>
              <Box position="relative">
                <ShoppingCartOutlinedIcon aria-label="Cart" />
                {renderCounter(cartCount)}
              </Box>
            </Link>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end', flexGrow: 1 }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon aria-label="Open menu" />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.id} onClick={handleCloseNavMenu} component={Link} to={`/${page.id}`}>
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
              <MenuItem component={Link} to="/account" onClick={handleCloseNavMenu}>
                <AccountCircleOutlinedIcon sx={{ mr: 1 }} />
                <Typography>Account</Typography>
              </MenuItem>
              <MenuItem component={Link} to="/search" onClick={handleCloseNavMenu}>
                <SearchOutlinedIcon sx={{ mr: 1 }} />
                <Typography>Search</Typography>
              </MenuItem>
              <MenuItem component={Link} to="/wishlist" onClick={handleCloseNavMenu}>
                <FavoriteBorderOutlinedIcon sx={{ mr: 1 }} />
                <Typography>Wishlist ({wishlistCount})</Typography>
              </MenuItem>
              <MenuItem component={Link} to="/cart" onClick={handleCloseNavMenu}>
                <ShoppingCartOutlinedIcon sx={{ mr: 1 }} />
                <Typography>Cart ({cartCount})</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}