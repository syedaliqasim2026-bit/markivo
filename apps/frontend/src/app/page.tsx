'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiShoppingCart, FiHeart, FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { MdStar } from 'react-icons/md';

const mockProducts = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 2999,
    originalPrice: 4999,
    rating: 4.5,
    reviews: 128,
    image: 'https://res.cloudinary.com/demo/image/fetch/w_200/https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    vendor: 'TechMart',
  },
  {
    id: '2',
    name: 'Leather Crossbody Bag',
    price: 1899,
    originalPrice: 3499,
    rating: 4.8,
    reviews: 256,
    image: 'https://res.cloudinary.com/demo/image/fetch/w_200/https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400',
    vendor: 'FashionHub',
  },
  {
    id: '3',
    name: '4K Smart TV 55\"',
    price: 24999,
    originalPrice: 45999,
    rating: 4.6,
    reviews: 89,
    image: 'https://res.cloudinary.com/demo/image/fetch/w_200/https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400',
    vendor: 'ElectroStore',
  },
  {
    id: '4',
    name: 'Running Shoes',
    price: 3499,
    originalPrice: 6999,
    rating: 4.7,
    reviews: 345,
    image: 'https://res.cloudinary.com/demo/image/fetch/w_200/https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    vendor: 'SportZone',
  },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 hidden sm:inline">Markivo</span>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 mx-8 max-w-xl">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
                <FiSearch className="absolute right-3 top-3 text-gray-400" />
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              <Link href="/login" className="hidden md:block text-gray-700 hover:text-primary transition">
                Login
              </Link>
              <Link
                href="/cart"
                className="relative text-gray-700 hover:text-primary transition"
              >
                <FiShoppingCart className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Link>
              <button
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <FiX /> : <FiMenu />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b p-4 space-y-3">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
          />
          <Link href="/login" className="block text-gray-700 py-2">
            Login
          </Link>
        </div>
      )}

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-primary to-accent text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Markivo
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Shop from thousands of sellers with the best prices and quality
          </p>
          <button className="mt-6 bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Start Shopping
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative h-48 bg-gray-200 overflow-hidden group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition"
                />
                <button className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-red-50 transition">
                  <FiHeart className="text-red-500" />
                </button>
                <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-1 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <MdStar
                        key={i}
                        className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({product.reviews})</span>
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                  <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                </div>
                <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-orange-600 transition font-semibold">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">About Markivo</h3>
              <p className="text-gray-400 text-sm">Premium e-commerce marketplace</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-gray-400 hover:text-white">Categories</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Vendors</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">About</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Customer Service</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-gray-400 hover:text-white">Contact Us</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">FAQ</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Support</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Terms & Conditions</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 Markivo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
