import React from 'react';
import NavBar from '../molecules/NavBar';
import Footer from '../molecules/Footer';
import CardComp from '../atoms/CardComp';
import CardData from '../../constants/CardData';

import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { ChevronRight } from '@mui/icons-material';
import TuneIcon from '@mui/icons-material/Tune';
import ViewListIcon from '@mui/icons-material/ViewList';
import AppsIcon from '@mui/icons-material/Apps';

import Rectangle1 from '../../assets/Rectangle 1.png';
import warranty from '../../assets/warranty.png';

import PaginatedCards from '../../constants/ShopPagination';

function ShopPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  return (
    <div>
      <NavBar />

      {/* ===== DESKTOP VIEW ===== */}
      {!isMobile && !isTablet && (
        <Box>
          {/* Banner */}
          <img
            src={Rectangle1}
            alt="Shop Banner"
            style={{
              width: '100%',
              position: 'relative',
            }}
          />

          <Box
            style={{
              position: 'absolute',
              top: '25%',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              style={{
                fontWeight: 'bold',
                fontSize: '38px',
              }}
            >
              Shop
            </Typography>

            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <Typography style={{ fontSize: '16px', fontWeight: 'bold' }}>
                Home
              </Typography>
              <ChevronRight />
              <Typography style={{ fontSize: '16px' }}>Shop</Typography>
            </Box>
          </Box>

          {/* Filter Bar */}
          <Box
            style={{
              backgroundColor: '#F9F1E7',
              height: '100px',
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box style={{ display: 'flex', alignItems: 'center', paddingLeft: '70px' }}>
              <TuneIcon style={{ padding: '10px' }} />
              <Typography style={{ padding: '10px' }}>Filter</Typography>
              <AppsIcon style={{ padding: '10px' }} />
              <ViewListIcon style={{ padding: '10px' }} />
              <Typography style={{ padding: '20px' }}>
                Showing 1–{CardData.length} of {CardData.length} results
              </Typography>
            </Box>

            <Box
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingRight: '80px',
              }}
            >
              <Typography style={{ paddingRight: '10px' }}>Show</Typography>

              <Typography
                style={{
                  height: '50px',
                  width: '30px',
                  backgroundColor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '10px',
                }}
              >
                16
              </Typography>

              <Typography style={{ paddingRight: '10px' }}>Sort By</Typography>

              <Typography
                style={{
                  height: '50px',
                  width: '60px',
                  backgroundColor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                Default
              </Typography>
            </Box>
          </Box>

          {/* Product Cards */}
          <Box
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '30px',
              marginTop: '40px',
            }}
          >
            {CardData.map((card) => (
              <CardComp
                key={card.id}
                cardData={card}
                fName={card.fName}
                fDesc={card.fDesc}
                fImg={card.fImg}
                fPrice={card.fPrice}
              />
            ))}
          </Box>

          {/* Warranty */}
          <img
            src={warranty}
            alt="Warranty"
            style={{
              width: '100%',
              paddingTop: '40px',
            }}
          />
        </Box>
      )}

      {/* ===== MOBILE / TABLET ONLY ===== */}
      {(isMobile || isTablet) && <PaginatedCards />}

      <Footer />
    </div>
  );
}

export default ShopPage;
