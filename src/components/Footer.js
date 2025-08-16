// src/components/Footer.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Heart,
  Shield,
  Truck,
  CreditCard,
  Headphones
} from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter subscription');
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                Dopee
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Your premier destination for luxury fashion and lifestyle products. 
                Discover curated collections that define elegance and sophistication.
              </p>
            </div>
            
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="bg-white/10 hover:bg-white/20 text-white border-0">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="bg-white/10 hover:bg-white/20 text-white border-0">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="bg-white/10 hover:bg-white/20 text-white border-0">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="bg-white/10 hover:bg-white/20 text-white border-0">
                <Youtube className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="bg-white/10 hover:bg-white/20 text-white border-0">
                <Linkedin className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Button 
                  variant="ghost" 
                  className="text-gray-300 hover:text-white p-0 h-auto font-normal justify-start"
                  onClick={() => navigate('/')}
                >
                  Home
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="text-gray-300 hover:text-white p-0 h-auto font-normal justify-start"
                  onClick={() => navigate('/shop')}
                >
                  Shop
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="text-gray-300 hover:text-white p-0 h-auto font-normal justify-start"
                  onClick={() => navigate('/Women')}
                >
                  Women's Collection
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="text-gray-300 hover:text-white p-0 h-auto font-normal justify-start"
                  onClick={() => navigate('/Mens')}
                >
                  Men's Collection
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="text-gray-300 hover:text-white p-0 h-auto font-normal justify-start"
                >
                  New Arrivals
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="text-gray-300 hover:text-white p-0 h-auto font-normal justify-start"
                >
                  Sale Items
                </Button>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-white">Customer Service</h4>
            <ul className="space-y-3">
              <li>
                <Button 
                  variant="ghost" 
                  className="text-gray-300 hover:text-white p-0 h-auto font-normal justify-start"
                >
                  Contact Us
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="text-gray-300 hover:text-white p-0 h-auto font-normal justify-start"
                >
                  Shipping Info
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="text-gray-300 hover:text-white p-0 h-auto font-normal justify-start"
                >
                  Returns & Exchanges
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="text-gray-300 hover:text-white p-0 h-auto font-normal justify-start"
                >
                  Size Guide
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="text-gray-300 hover:text-white p-0 h-auto font-normal justify-start"
                >
                  FAQ
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="text-gray-300 hover:text-white p-0 h-auto font-normal justify-start"
                >
                  Track Order
                </Button>
              </li>
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-white">Stay Connected</h4>
            
            {/* Newsletter */}
            <div className="space-y-4">
              <p className="text-gray-300 text-sm">
                Subscribe to our newsletter for exclusive offers and updates
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40 focus:ring-white/20"
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    className="absolute right-1 top-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-4 h-4 text-purple-400" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-4 h-4 text-purple-400" />
                <span className="text-sm">support@dopee.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span className="text-sm">123 Fashion Ave, NY 10001</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-white/20" />

      {/* Features Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h5 className="font-semibold text-white">Free Shipping</h5>
              <p className="text-sm text-gray-300">On orders over $100</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h5 className="font-semibold text-white">Secure Payment</h5>
              <p className="text-sm text-gray-300">100% secure checkout</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h5 className="font-semibold text-white">Easy Returns</h5>
              <p className="text-sm text-gray-300">30-day return policy</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <Headphones className="w-6 h-6 text-white" />
            </div>
            <div>
              <h5 className="font-semibold text-white">24/7 Support</h5>
              <p className="text-sm text-gray-300">Always here to help</p>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-white/20" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <span>© 2024 Dopee. All rights reserved.</span>
            <span>•</span>
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-400 fill-current" />
            <span>for fashion lovers</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <Button variant="ghost" className="text-gray-300 hover:text-white p-0 h-auto font-normal">
              Privacy Policy
            </Button>
            <Button variant="ghost" className="text-gray-300 hover:text-white p-0 h-auto font-normal">
              Terms of Service
            </Button>
            <Button variant="ghost" className="text-gray-300 hover:text-white p-0 h-auto font-normal">
              Cookie Policy
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
