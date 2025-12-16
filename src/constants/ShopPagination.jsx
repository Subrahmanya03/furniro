// src/constants/ShopPagination.jsx
import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import CardComp from '../components/atoms/CardComp';
import CardData from './CardData';

const ITEMS_PER_PAGE = 8; // Number of products per page

export default function PaginatedCards() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(CardData.length / ITEMS_PER_PAGE);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = CardData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <Box textAlign="center" my={5}>
      {/* Product Grid */}
      <Box display="flex" flexWrap="wrap" justifyContent="center" mb={4}>
        {currentItems.map((card) => (
          <CardComp key={card.id} cardData={card} />
        ))}
      </Box>

      {/* Pagination Controls */}
      <Box display="flex" justifyContent="center" gap={1}>
        <Button variant="outlined" onClick={handlePrev} disabled={currentPage === 1}>
          Prev
        </Button>

        {[...Array(totalPages)].map((_, index) => (
          <Button
            key={index}
            variant={currentPage === index + 1 ? 'contained' : 'outlined'}
            onClick={() => handlePageClick(index + 1)}
          >
            {index + 1}
          </Button>
        ))}

        <Button variant="outlined" onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </Button>
      </Box>
    </Box>
  );
}
