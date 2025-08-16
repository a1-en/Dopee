import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  Star, 
  Truck, 
  Shield, 
  Headphones, 
  CreditCard, 
  Instagram,
  TrendingUp,
  Heart,
  ShoppingCart,
  ArrowRight,
  Sparkles,
  Zap,
  Award
} from 'lucide-react';

// Images imports
import image from '../images/1.png';
import image2 from '../images/3.jpg';
import image3 from '../images/4.jpg';
import image4 from '../images/5.jpg';
import image5 from '../images/6.jpg';
import image6 from '../images/7.jpg';
import image7 from '../images/8.jpg';
import image8 from '../images/9.jpg';

// Hero Section Component
const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.05&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-white/90 text-sm font-medium">Limited Time: Up to 70% Off</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Elite Fashion
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Collection
              </span>
            </h1>
            
            <p className="text-xl text-white/80 mb-8 max-w-lg lg:max-w-none">
              Discover the latest trends in luxury fashion. Premium quality, exclusive designs, and unbeatable prices.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
                onClick={() => navigate('/shop')}
              >
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-xl backdrop-blur-sm"
                onClick={() => navigate('/shop')}
              >
                View Collections
        </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10">
              <img 
                src={image} 
                alt="Elite Fashion" 
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-xl">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-3 shadow-xl">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Categories Component
const Categories = () => {
  const categories = [
    { title: 'Bundle Package', offer: 'Save 30%', image: image2, color: 'from-blue-500 to-cyan-500' },
    { title: 'Valentines Offer', offer: '30% Sale', image: image3, color: 'from-pink-500 to-rose-500' },
    { title: 'Relax Chair', offer: 'New Arrival', image: image4, color: 'from-emerald-500 to-teal-500' },
  ];

  const navigate = useNavigate();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Categories</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our curated collections and discover amazing deals on premium products
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
      {categories.map((category, index) => (
            <Card key={index} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative overflow-hidden">
            <img
              src={category.image}
              alt={category.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.title}</h3>
                <Badge variant="secondary" className="text-lg px-4 py-2 mb-4 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-0">
                  {category.offer}
                </Badge>
                <Button 
                  variant="outline" 
                  className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
                  onClick={() => navigate('/shop')}
                >
                  Explore Now
            </Button>
              </CardContent>
            </Card>
      ))}
        </div>
      </div>
    </section>
  );
};

// Featured Items Component
const FeaturedItems = () => {
  const products = [
    {
      id: 2,
      title: 'Premium Smartphone',
      price: '$499.99',
      oldPrice: '$699.99',
      image: image7,
      rating: 4.8,
      path: '/smartphone',
      badge: 'Best Seller'
    },
    {
      id: 1,
      title: 'Designer Chair',
      price: '$299.99',
      oldPrice: '$399.99',
      image: image6,
      rating: 4.9,
      path: '/',
      badge: 'New'
    },
    {
      id: 3,
      title: 'Luxury Sneakers',
      price: '$199.99',
      oldPrice: '$249.99',
      image: image5,
      rating: 4.7,
      path: '/sneakers',
      badge: 'Trending'
    },
    {
      id: 4,
      title: 'Premium Handbag',
      price: '$399.99',
      oldPrice: '$499.99',
      image: image8,
      rating: 4.9,
      path: '/womenBags',
      badge: 'Limited'
    },
  ];

  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked premium products that define luxury and style
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
            <Card key={product.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer" onClick={() => navigate(product.path)}>
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <Badge className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
                  {product.badge}
                </Badge>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Heart className="w-5 h-5 text-red-500" />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {product.title}
                </h3>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">({product.rating})</span>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-purple-600">{product.price}</span>
                  <span className="text-lg text-gray-400 line-through">{product.oldPrice}</span>
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Brand Features Component
const BrandFeatures = () => {
  const features = [
    {
      icon: <Truck className="w-12 h-12 text-purple-600" />,
      title: 'Free Shipping',
      description: 'Free shipping on orders over $100',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <Shield className="w-12 h-12 text-green-600" />,
      title: 'Secure Payment',
      description: '100% secure payment methods',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <Headphones className="w-12 h-12 text-blue-600" />,
      title: '24/7 Support',
      description: 'Round the clock customer support',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <CreditCard className="w-12 h-12 text-pink-600" />,
      title: 'Easy Returns',
      description: '30-day return policy',
      color: 'from-pink-500 to-pink-600'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're committed to providing the best shopping experience possible
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Trending Products Component
const TrendingProducts = () => {
  const trendingProducts = [
    {
      id: 1,
      title: 'Premium Leather Jacket',
      price: '$89.99',
      oldPrice: '$129.99',
      image: image2,
      rating: 4.9,
      sales: '2.5k+ sold',
      badge: 'Hot'
    },
    {
      id: 2,
      title: 'Designer Handbag',
      price: '$149.99',
      oldPrice: '$199.99',
      image: image3,
      rating: 4.8,
      sales: '1.8k+ sold',
      badge: 'Popular'
    },
    {
      id: 3,
      title: 'Sport Sneakers',
      price: '$79.99',
      oldPrice: '$99.99',
      image: image4,
      rating: 4.7,
      sales: '3.2k+ sold',
      badge: 'Trending'
    },
    {
      id: 4,
      title: 'Elegant Watch',
      price: '$199.99',
      oldPrice: '$299.99',
      image: image5,
      rating: 4.9,
      sales: '950+ sold',
      badge: 'Elite'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg mb-6">
            <TrendingUp className="w-6 h-6 text-purple-600" />
            <span className="text-lg font-semibold text-gray-900">Trending Now</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Most Popular Products</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover what everyone is talking about this season
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                    alt={product.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <Badge className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white border-0">
                  {product.badge}
                </Badge>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Heart className="w-5 h-5 text-red-500" />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                      {product.title}
                </h3>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">({product.rating})</span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl font-bold text-purple-600">{product.price}</span>
                  <span className="text-sm text-gray-400 line-through">{product.oldPrice}</span>
                </div>
                <p className="text-sm text-green-600 font-semibold mb-4">{product.sales}</p>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Customer Reviews Component
const CustomerReviews = () => {
  const reviews = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Amazing quality products and fast delivery! I love my new bag.',
      avatar: 'SJ',
      title: 'Fashion Blogger'
    },
    {
      name: 'Mike Chen',
      rating: 5,
      comment: 'Great customer service and the shoes are exactly as described.',
      avatar: 'MC',
      title: 'Tech Entrepreneur'
    },
    {
      name: 'Emily Davis',
      rating: 5,
      comment: 'Best shopping experience ever! Highly recommend this store.',
      avatar: 'ED',
      title: 'Interior Designer'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-gray-50 to-white">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-6">
                  {review.avatar}
                </div>
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 text-lg mb-6 italic leading-relaxed">
                  "{review.comment}"
                </p>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-1">{review.name}</h4>
                  <p className="text-purple-600 font-medium">{review.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Newsletter Component
const Newsletter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter subscription');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-slate-900 to-purple-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.05&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-white/90 text-sm font-medium">Exclusive Offers</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Stay Updated with Latest Offers
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get exclusive deals, new arrivals, and fashion tips delivered to your inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 backdrop-blur-sm h-12"
              />
            </div>
            <Button 
              type="submit" 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 h-12"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

// Call-to-Action Component
const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.05&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
          Ready to Transform Your Style?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          Discover the latest trends and exclusive offers. Shop now and get up to 70% off!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
            onClick={() => navigate('/shop')}
          >
            Shop Now
              <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button 
              variant="outline" 
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-xl backdrop-blur-sm"
            onClick={() => navigate('/shop')}
          >
            View Collections
          </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Landing Page Component
const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Categories />
      <FeaturedItems />
      <BrandFeatures />
      <TrendingProducts />
      <CustomerReviews />
      <Newsletter />
      <CallToAction />
    </div>
  );
};

export default LandingPage;
