// src/constants/ProductData.js
import p1 from '../assets/p1.png';
import p2 from '../assets/p2.png';
import p3 from '../assets/p3.png';

const ProductData = [
  {
    id: 1,
    fName: 'Modern Sofa',
    fPrice: '₹25,000',
    fDesc: 'Comfortable modern sofa',
    images: [p1, p2, p3],   // 👈 multiple angles
    fImg: p1                // 👈 default main image
  }
];

export default ProductData;
