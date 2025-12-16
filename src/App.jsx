import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginPage from './components/organisms/LoginPage';
import HomePage from './components/organisms/HomePage';
import ShopPage from './components/organisms/ShopPage';
import ContactPage from './components/organisms/ContactPage';
import CartPage from './components/organisms/CartPage';
import WishlistPage from './components/organisms/WishListPage';
import ProductPage from './components/organisms/ProductPage';
import About from './components/organisms/About';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/home" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path='/about' element={<About />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />

        {/* ✅ PRODUCT ROUTE */}
        <Route path="/product/:productId" element={<ProductPage />} />
      </Routes>

      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;
