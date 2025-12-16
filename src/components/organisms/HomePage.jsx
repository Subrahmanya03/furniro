import React, { useState, useEffect } from 'react';
import NavBar from '../molecules/NavBar';
import homeImg from '../../assets/homeImg.png';
import { Box, Grid, Typography, Button, IconButton, useTheme, useMediaQuery } from '@mui/material';
import ButtonComp from '../atoms/Button';
import Footer from '../molecules/Footer';
import Bedroom from '../../assets/Bedroom.png';
import Living from '../../assets/living.png';
import Dining from '../../assets/dining.png';
import CardData from '../../constants/CardData';
import ImageCarousel from '../../constants/pagination';
import Setup from '../../assets/setup.png';
import { useNavigate } from 'react-router-dom';
import ShareIcon from '@mui/icons-material/Share';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function HomePage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlistItems(storedWishlist);
  }, []);

  const navigateToShop = () => {
    navigate('/Shop');
  };

  const isItemWishlisted = (itemId) => wishlistItems.some((i) => i.id === itemId);

  const toggleWishlist = (item) => {
    const exists = wishlistItems.find((i) => i.id === item.id);
    let updatedWishlist;

    if (exists) {
      updatedWishlist = wishlistItems.filter((i) => i.id !== item.id);
      toast.info('Removed from Wishlist');
    } else {
      updatedWishlist = [...wishlistItems, item];
      toast.success('Added to Wishlist!');
    }

    setWishlistItems(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  const handleAddToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cart.findIndex((i) => i.id === item.id);

    if (index !== -1) {
      cart[index].quantity = (cart[index].quantity || 1) + 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    toast.success('Added to Cart!');
  };

  return (
    <div>
      <NavBar />
      <Grid>
        {/* Hero Banner */}
        <Box>
          {!isMobile && !isTablet && (
            <>
              <Box>
                <img
                  src={homeImg}
                  alt="Hero"
                  style={{ height: '716px', width: '100%', objectFit: 'cover' }}
                />
              </Box>
              <Box>
                <Typography
                  style={{
                    height: '390px',
                    width: '500px',
                    position: 'absolute',
                    top: '43%',
                    right: '14%',
                    borderRadius: '2%',
                    backgroundColor: '#FFF3E3',
                  }}
                />
                <Typography
                  variant="h5"
                  style={{ position: 'absolute', top: '52%', right: '42%', color: 'black', fontSize: '12px' }}
                >
                  New Arrival
                </Typography>
                <Typography
                  style={{ position: 'absolute', top: '55%', right: '26%', fontSize: '40px', color: '#B88E2F', fontWeight: 'bold' }}
                >
                  Discover Our
                  <br /> New Collection
                </Typography>
                <Typography
                  style={{ position: 'absolute', top: '74%', right: '20.5%', fontSize: '14px', color: 'black' }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut <br />
                  elit tellus, luctus nec ullamcorper mattis.
                </Typography>
                <ButtonComp
                  btnText="Buy Now"
                  style={{
                    background: '#B88E2F',
                    color: '#fff',
                    fontWeight: 'bold',
                    padding: '10px 0',
                    width: '100px',
                    marginLeft: '150px',
                    position: 'absolute',
                    top: '84%',
                    right: '39%',
                  }}
                  onClick={navigateToShop}
                />
              </Box>
            </>
          )}
        </Box>

        {/* Browse Section */}
        {!isMobile && !isTablet && (
          <Box>
            <Typography style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center', marginTop: '20px' }}>
              Browse the range
            </Typography>
            <Typography style={{ textAlign: 'center', color: '#666', fontSize: '14px', marginBottom: '50px' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
              <img style={{ height: '400px', width: '300px' }} src={Dining} alt="Dining" />
              <img style={{ height: '400px', width: '300px' }} src={Living} alt="Living" />
              <img style={{ height: '400px', width: '300px', borderRadius: '5px' }} src={Bedroom} alt="Bedroom" />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-around', paddingTop: '20px' }}>
              <Typography>Dining</Typography>
              <Typography>Living</Typography>
              <Typography>Bedroom</Typography>
            </Box>
          </Box>
        )}

        {/* Product Cards */}
        <Typography style={{ fontWeight: 'bold', fontSize: '25px', textAlign: 'center', paddingTop: '20px' }}>
          Our Products
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: isMobile
              ? '1fr'
              : isTablet
              ? '1fr 1fr'
              : 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 4,
            justifyContent: 'center',
            paddingX: 2,
            marginBottom: '40px',
          }}
        >
          {CardData.map((card) => (
            <Box
              key={card.id}
              sx={{
                maxWidth: 260,
                m: 'auto',
                borderRadius: 2,
                boxShadow: 3,
                overflow: 'hidden',
                position: 'relative',
                '&:hover .hover-overlay': { display: 'flex' },
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <img
                  src={card.fImg}
                  alt={card.fName}
                  style={{ width: '100%', height: 250, objectFit: 'cover' }}
                />
                <Box
                  className="hover-overlay"
                  sx={{
                    display: 'none',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    backdropFilter: 'blur(5px)',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: '#B88E2F', color: '#fff', textTransform: 'none', fontWeight: 'bold', px: 3 }}
                    onClick={() => handleAddToCart(card)}
                  >
                    Add to Cart
                  </Button>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <IconButton><ShareIcon /></IconButton>
                    <IconButton><CompareArrowsIcon /></IconButton>
                    <IconButton onClick={() => toggleWishlist(card)}>
                      {isItemWishlisted(card.id) ? <FavoriteIcon sx={{ color: 'red' }} /> : <FavoriteBorderIcon />}
                    </IconButton>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6">{card.fName}</Typography>
                <Typography variant="body2" color="text.secondary">{card.fDesc}</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#B88E2F', mt: 1 }}>
                  {card.fPrice}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Room Setup Section */}
        {!isMobile && !isTablet && (
          <Box style={{ height: '600px', width: '100%', backgroundColor: '#FCF8F3', display: 'flex', position: 'relative' }}>
            <Typography style={{ position: 'absolute', top: '200px', fontWeight: 'bold', fontSize: '28px', paddingLeft: '80px' }}>
              50+ Beautiful rooms <br /> inspiration
            </Typography>
            <Typography style={{ position: 'absolute', top: '290px', paddingLeft: '80px', fontSize: '13px' }}>
              Our designer already made a lot of beautiful <br /> prototype of rooms that inspire you
            </Typography>
            <button style={{ position: 'absolute', backgroundColor: '#B88E2F', color: '#fff', top: '350px', left: '80px', border: 'none', padding: '5px' }}>
              Explore Now
            </button>
            <ImageCarousel />
            <Typography style={{ height: '110px', width: '200px', position: 'absolute', top: '420px', left: '480px', opacity: '80%', backgroundColor: 'white' }} />
            <Typography style={{ position: 'absolute', top: '450px', left: '530px', fontSize: '12px' }}>01 - Bed Room</Typography>
            <Typography style={{ fontWeight: 'bold', position: 'absolute', top: '470px', left: '520px', fontSize: '20px' }}>Inner Peace</Typography>
            <button style={{ position: 'absolute', backgroundColor: '#B88E2F', color: '#fff', top: '495px', left: '680px', padding: '7px', border: 'none' }}>→</button>
          </Box>
        )}

        {/* Share Setup */}
        {!isMobile && !isTablet && (
          <Box>
            <Typography style={{ color: '#616161', fontSize: '12px', paddingTop: '40px', textAlign: 'center' }}>
              Share your setup with
            </Typography>
            <Typography style={{ fontWeight: 'bold', fontSize: '25px', paddingBottom: '20px', textAlign: 'center' }}>
              #FuniroFurniture
            </Typography>
            <img src={Setup} alt="Setup" style={{ height: '500px', width: '1430px', paddingBottom: '20px' }} />
            <hr />
          </Box>
        )}
      </Grid>
      <Footer />
    </div>
  );
}

export default HomePage;
