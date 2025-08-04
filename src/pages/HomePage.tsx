import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import ServicesSection from '../components/ServicesSection';
import ProductsSection from '../components/ProductsSection';
import NewsSection from '../components/NewsSection';
import ContactSection from '../components/ContactSection';
import HeroSection from '../components/HeroSection';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, servicesRes, newsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/products'),
        axios.get('http://localhost:5000/api/services'),
        axios.get('http://localhost:5000/api/news')
      ]);
      
      setProducts(productsRes.data);
      setServices(servicesRes.data);
      setNews(newsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Fallback data if API is not available
      setServices([
        { _id: '1', name: 'Medical Supplies', icon: '🏥' },
        { _id: '2', name: 'Fresh Groceries', icon: '🥬' },
        { _id: '3', name: 'Farm Equipment', icon: '🚜' },
        { _id: '4', name: 'Education Materials', icon: '📚' },
        { _id: '5', name: 'Transportation', icon: '🚌' }
      ]);
      
      setProducts([
        { _id: '1', name: 'Rice (25kg)', price: 1200, image: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg', category: 'groceries' },
        { _id: '2', name: 'Wheat Flour (10kg)', price: 450, image: 'https://imgs.search.brave.com/ATgCOZAXxBahsKdSOiH6CilmuRtL8h2waI-y2jDk5Xo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTAw/NTkxMDkwL3Bob3Rv/L3dob2xlLWZsb3Vy/LWluLWJhZy13aXRo/LXdoZWF0LWVhcnMu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PVBUZjcwTDJfSERZ/bmtTY2NZa3JSTFZE/XzRqNmNGS09jeWly/cnplWGlENTQ9', category: 'groceries' },
        { _id: '3', name: 'Cooking Oil (5L)', price: 650, image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg', category: 'groceries' },
        { _id: '4', name: 'First Aid Kit', price: 300, image: 'https://images.pexels.com/photos/1692693/pexels-photo-1692693.jpeg', category: 'medical' },
        { _id: '5', name: 'Seeds Package', price: 200, image: 'https://images.pexels.com/photos/1084540/pexels-photo-1084540.jpeg', category: 'farming' },
        { _id: '6', name: 'Solar Lamp', price: 800, image: 'https://images.pexels.com/photos/221019/pexels-photo-221019.jpeg', category: 'utilities' }
      ]);
      
      setNews([
        { _id: '1', title: 'New Healthcare Center Opens in Rural Area', date: '2025-01-15' },
        { _id: '2', title: 'Government Subsidies for Farmers Announced', date: '2025-01-12' },
        { _id: '3', title: 'Mobile Internet Connectivity Expanded', date: '2025-01-10' }
      ]);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full max-w-md mx-auto block px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <ServicesSection services={services} />
      <ProductsSection products={filteredProducts} />
      <NewsSection news={news} />
      <ContactSection />
    </div>
  );
};

export default HomePage;