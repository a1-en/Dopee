import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  ShoppingBag, 
  Heart, 
  Star,
  Sparkles
} from 'lucide-react';

const Mens = () => {
  const navigate = useNavigate();

  const mensProducts = [
    {
      id: 1,
      title: 'Classic White Shirt',
      price: 59.99,
      oldPrice: 79.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      rating: 4.7,
      badge: 'New'
    },
    {
      id: 2,
      title: 'Premium Denim Jacket',
      price: 89.99,
      oldPrice: 119.99,
      image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400',
      rating: 4.8,
      badge: 'Sale'
    },
    {
      id: 3,
      title: 'Formal Business Suit',
      price: 299.99,
      oldPrice: 399.99,
      image: 'https://images.unsplash.com/photo-1593030761757-71cae7652e64?w=400',
      rating: 4.9,
      badge: 'Premium'
    },
    {
      id: 4,
      title: 'Casual Sneakers',
      price: 69.99,
      oldPrice: 89.99,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
      rating: 4.6,
      badge: 'Trending'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 mb-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full px-4 py-2 mb-4">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-blue-700 font-medium">Men's Collection</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Men's Fashion</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover sophisticated and stylish pieces designed for the modern man. 
              From casual wear to formal elegance, elevate your wardrobe.
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mensProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                <Badge className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0">
                  {product.badge}
                </Badge>
                
                <div className="absolute top-3 right-3 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button variant="ghost" size="icon" className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700">
                    <ShoppingBag className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {product.title}
                </h3>
                
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                  <span className="text-sm text-gray-500 ml-2">({product.rating})</span>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl font-bold text-blue-600">${product.price}</span>
                  <span className="text-sm text-gray-500 line-through">${product.oldPrice}</span>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mens;
