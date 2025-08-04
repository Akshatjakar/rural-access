import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ProductsSectionProps {
  products: Product[];
}

const ProductsSection: React.FC<ProductsSectionProps> = ({ products }) => {
  const { user } = useAuth();

 const handleBookProduct = async (productId: string, price: number) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    "http://localhost:5000/api/bookings",
    {
      productId: productId,
      date: new Date().toISOString(), // or any valid date string
      notes: "Some optional notes",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("Booking success:", response.data);
};


  return (
    <section id="products" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Essential Products</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            High-quality products delivered to your doorstep
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 capitalize mb-4">{product.category}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
                  <button
                    onClick={() => handleBookProduct(product._id, product.price)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Book Now</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
