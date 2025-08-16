import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import {
  ShoppingCart, 
  Trash2, 
  ArrowLeft, 
  Plus, 
  Minus, 
  Heart,
  Truck,
  Shield,
  CreditCard,
  Lock,
  Star
} from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, setCart } = useCart();

  const updateQuantity = (productId, change) => {
    setCart(prevCart => {
      const newCart = [...prevCart];
      const itemIndex = newCart.findIndex(item => item.id === productId);
      
      if (itemIndex !== -1) {
        if (change === -1 && newCart[itemIndex].quantity <= 1) {
          newCart.splice(itemIndex, 1);
        } else {
          newCart[itemIndex].quantity = (newCart[itemIndex].quantity || 1) + change;
        }
      }
      
      return newCart;
    });
  };

  const removeItem = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  const getShipping = () => {
    return getSubtotal() > 100 ? 0 : 9.99;
  };

  const getTax = () => {
    return getSubtotal() * 0.08; // 8% tax
  };

  const getTotal = () => {
    return getSubtotal() + getShipping() + getTax();
  };

  if (cart.length === 0) {
  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-purple-600" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-xl text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet. Start shopping to discover amazing products!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg font-semibold rounded-xl"
                onClick={() => navigate('/shop')}
              >
                Start Shopping
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-purple-200 text-purple-700 hover:bg-purple-50 px-8 py-6 text-lg font-semibold rounded-xl"
                onClick={() => navigate('/')}
              >
                Continue Browsing
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            Continue Shopping
          </Button>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">
            You have {getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''} in your cart
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={item.thumbnail || item.image}
                        alt={item.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs">
                        {item.quantity || 1}
                      </Badge>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < Math.floor(item.rating || 4) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                          <span className="text-sm text-gray-500 ml-2">({item.rating || 4})</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-2xl font-bold text-purple-600 mb-3">
                        ${(item.price * (item.quantity || 1)).toFixed(2)}
                      </p>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-8 h-8"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-12 text-center font-medium">{item.quantity || 1}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-8 h-8"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 hover:text-purple-600"
                        >
                          <Heart className="w-4 h-4 mr-1" />
                          Save
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-600"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Summary Items */}
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({getTotalItems()} items)</span>
                    <span>${getSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{getShipping() === 0 ? 'Free' : `$${getShipping().toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${getTax().toFixed(2)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>${getTotal().toFixed(2)}</span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                      Apply
                    </Button>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg font-semibold rounded-xl"
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout
                </Button>

                {/* Security Badges */}
                <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Lock className="w-4 h-4" />
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Shield className="w-4 h-4" />
                    <span>Protected</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Free Shipping</h4>
                  <p className="text-sm text-gray-600">On orders over $100</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Secure Payment</h4>
                  <p className="text-sm text-gray-600">100% secure checkout</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Easy Returns</h4>
                  <p className="text-sm text-gray-600">30-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
