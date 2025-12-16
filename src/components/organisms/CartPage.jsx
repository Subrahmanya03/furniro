import React, { useEffect, useState } from 'react';
import {
  Box, Typography, IconButton, Button, Divider, Grid, TextField,
  Paper, Avatar, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate } from 'react-router-dom';
import myLogo from '../../assets/myLogo.png';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [form, setForm] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const handleDelete = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const updateQuantity = (id, delta) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        const newQty = (item.quantity || 1) + delta;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const totalAmount = cartItems.reduce((acc, item) => {
    const priceNum = parseFloat(item.fPrice?.replace(/[^0-9.-]+/g, '') || 0);
    const qty = item.quantity || 1;
    return acc + priceNum * qty;
  }, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.cardNumber.trim()) newErrors.cardNumber = "Card number is required";
    else if (!/^\d{16}$/.test(form.cardNumber)) newErrors.cardNumber = "Must be 16 digits";
    if (!form.expiry.trim()) newErrors.expiry = "Expiry is required";
    else if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(form.expiry)) newErrors.expiry = "Format MM/YY";
    if (!form.cvv.trim()) newErrors.cvv = "CVV is required";
    else if (!/^\d{3}$/.test(form.cvv)) newErrors.cvv = "Must be 3 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = () => {
    if (validate()) {
      setOpenModal(true);
      setTimeout(() => {
        localStorage.removeItem('cart');
        setCartItems([]);
        setOpenModal(false);
        window.dispatchEvent(new Event('cartUpdated'));
        navigate('/shop'); // redirect to shop page
      }, 2000);
    }
  };

  return (
    <Box p={{ xs: 2, sm: 4, md: 8 }}>
      <Grid container spacing={4} justifyContent="center">
        {/* Left Section */}
        <Grid item xs={12} md={7}>
          <Box display="flex" alignItems="center" mb={1}>
            <ChevronLeftIcon />
            <Typography fontWeight="bold">Shopping Continue</Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />
          <Typography variant="h6" gutterBottom>🛒 Shopping cart</Typography>
          <Typography color="text.secondary" gutterBottom>
            You have {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
          </Typography>

          {cartItems.map((item) => (
            <Paper
              key={item.id}
              elevation={3}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                p: 2,
                mb: 2,
                borderRadius: 3,
              }}
            >
              <img
                src={item.fImg}
                alt={item.fName || 'Item'}
                width={90}
                height={80}
                style={{ borderRadius: 8 }}
              />
              <Box ml={{ sm: 2 }} flex={1} textAlign={{ xs: 'center', sm: 'left' }} mt={{ xs: 1, sm: 0 }}>
                <Typography variant="subtitle1" fontWeight="bold">{item.fName || 'No Name'}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.fDesc || 'No Description'}
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" justifyContent="center" px={2} py={{ xs: 1, sm: 0 }}>
                <IconButton onClick={() => updateQuantity(item.id, 1)}><ArrowDropUpIcon /></IconButton>
                <Typography>{item.quantity || 1}</Typography>
                <IconButton onClick={() => updateQuantity(item.id, -1)}><ArrowDropDownIcon /></IconButton>
              </Box>

              <Typography mx={2}>
                ₹{((parseFloat(item.fPrice?.replace(/[^0-9.-]+/g, '') || 0)) * (item.quantity || 1)).toFixed(2)}
              </Typography>
              <IconButton onClick={() => handleDelete(item.id)}><DeleteIcon /></IconButton>
            </Paper>
          ))}
        </Grid>

        {/* Right Section */}
        <Grid item xs={12} md={5}>
          <Paper
            elevation={4}
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 4,
              backgroundColor: '#5C6BC0',
              color: '#fff',
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Card Details</Typography>
              <Avatar alt="User" src={myLogo} />
            </Box>

            <Typography fontSize={14} mb={1}>Card type</Typography>
            <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
              <Avatar src="https://img.icons8.com/color/48/mastercard-logo.png" />
              <Avatar src="https://img.icons8.com/color/48/visa.png" />
              <Avatar src="https://img.icons8.com/color/48/rupay.png" />
              <Button variant="contained" sx={{ backgroundColor: '#7986CB' }}>See all</Button>
            </Box>

            <TextField
              variant="filled"
              label="Name on card"
              name="name"
              value={form.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
              sx={{ backgroundColor: '#7986CB', mb: 2 }}
              InputLabelProps={{ style: { color: 'white' } }}
              InputProps={{ style: { color: 'white' } }}
            />

            <TextField
              variant="filled"
              label="Card Number"
              name="cardNumber"
              value={form.cardNumber}
              onChange={handleChange}
              error={!!errors.cardNumber}
              helperText={errors.cardNumber}
              fullWidth
              sx={{ backgroundColor: '#7986CB', mb: 2 }}
              InputLabelProps={{ style: { color: 'white' } }}
              InputProps={{ style: { color: 'white' } }}
            />

            <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2} mb={2}>
              <TextField
                variant="filled"
                label="Expiration date"
                name="expiry"
                value={form.expiry}
                onChange={handleChange}
                error={!!errors.expiry}
                helperText={errors.expiry}
                sx={{ flex: 1, backgroundColor: '#7986CB' }}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white' } }}
              />
              <TextField
                variant="filled"
                label="CVV"
                name="cvv"
                value={form.cvv}
                onChange={handleChange}
                error={!!errors.cvv}
                helperText={errors.cvv}
                sx={{ flex: 1, backgroundColor: '#7986CB' }}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white' } }}
              />
            </Box>

            <Divider sx={{ borderColor: 'white', my: 2 }} />

            <Box display="flex" justifyContent="space-between">
  <Typography>Subtotal</Typography>
  <Typography>₹{totalAmount.toFixed(2)}</Typography>
</Box>

<Box
  display="flex"
  justifyContent="space-between"
  fontWeight="bold"
  my={2}
>
  <Typography>Total (Tax incl.)</Typography>
  <Typography>₹{totalAmount.toFixed(2)}</Typography>
</Box>


            <Button
              fullWidth
              variant="contained"
              sx={{ backgroundColor: '#26e6a6', color: '#000', fontWeight: 'bold' }}
              endIcon={<CreditCardIcon />}
              onClick={handleCheckout}
            >
              ₹{totalAmount.toFixed(2)} — Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* ✅ Success Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>✅ Payment Successful</DialogTitle>
        <DialogContent>
          <Typography>Your payment was successful. Redirecting to shop...</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CartPage;
