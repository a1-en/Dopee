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

const WomenBags = () => {
  const navigate = useNavigate();

  const bagProducts = [
    {
      id: 1,
      title: 'Designer Leather Handbag',
      price: 199.99,
      oldPrice: 299.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
      rating: 4.9,
      badge: 'Premium'
    },
    {
      id: 2,
      title: 'Elegant Evening Clutch',
      price: 89.99,
      oldPrice: 129.99,
      image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400',
      rating: 4.7,
      badge: 'New'
    },
    {
      id: 3,
      title: 'Casual Canvas Tote',
      price: 49.99,
      oldPrice: 69.99,
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400',
      rating: 4.6,
      badge: 'Sale'
    },
    {
      id: 4,
      title: 'Luxury Shoulder Bag',
      price: 159.99,
      oldPrice: 199.99,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400',
      rating: 4.8,
      badge: 'Popular'
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
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full px-4 py-2 mb-4">
              <Sparkles className="w-4 h-4 text-pink-600" />
              <span className="text-pink-700 font-medium">Women's Bags Collection</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Women's Bags</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover elegant and sophisticated handbags designed for the modern woman. 
              From casual totes to luxury evening bags, find your perfect accessory.
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bagProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                <Badge className="absolute top-3 left-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white border-0">
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
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                    {product.title}
                </h3>
                
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                  <span className="text-sm text-gray-500 ml-2">({product.rating})</span>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl font-bold text-pink-600">${product.price}</span>
                  <span className="text-sm text-gray-500 line-through">${product.oldPrice}</span>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white">
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

export default WomenBags;
