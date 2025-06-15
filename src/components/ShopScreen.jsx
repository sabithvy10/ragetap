
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft, Coins, Tv, Heart, Zap, ShoppingCart } from 'lucide-react';

const ShopScreen = ({ gameState, updateGameState, onBack, onWatchAd }) => {
  const shopItems = [
    {
      id: 'extraLife',
      name: 'Extra Life',
      description: 'Get +1 life to continue playing',
      price: 50,
      icon: Heart,
      color: 'text-red-500',
      bgColor: 'bg-red-100',
      type: 'booster'
    },
    {
      id: 'autoWin',
      name: 'Auto Win',
      description: 'Automatically win the next game',
      price: 100,
      icon: Zap,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100',
      type: 'booster'
    },
    {
      id: 'coins500',
      name: '500 Coins',
      description: 'Get 500 coins instantly',
      price: 49, // Price in INR
      icon: Coins,
      color: 'text-green-500',
      bgColor: 'bg-green-100',
      type: 'coins',
      realMoney: true,
      itemId: 'prod_coins_500' // Example product ID for Razorpay
    },
    {
      id: 'vip',
      name: 'VIP Membership',
      description: 'No ads + 2 daily boosters',
      price: 99, // Price in INR
      icon: ShoppingCart,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100',
      type: 'subscription',
      realMoney: true,
      monthly: true,
      itemId: 'prod_vip_monthly' // Example product ID for Razorpay
    }
  ];

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handleRealMoneyPurchase = async (item) => {
    const res = await loadRazorpayScript();
    if (!res) {
      toast({
        title: "💳 Payment Error",
        description: "Could not load Razorpay. Please check your internet connection.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    if (!gameState.razorpayKeyId || gameState.razorpayKeyId === 'YOUR_RAZORPAY_KEY_ID') {
       toast({
        title: "🚧 Setup Required",
        description: "Razorpay Key ID is not configured. Please set it up.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    // In a real application, you would call your backend to create an order.
    // This is a simplified example.
    const orderAmount = item.price * 100; // Amount in paise
    const orderCurrency = 'INR';
    const orderReceipt = `receipt_${item.id}_${Date.now()}`;

    // Simulate order creation for demo purposes
    // You MUST replace this with a backend call in a production environment
    const simulatedOrderId = `order_demo_${Date.now()}`; 
    
    toast({
      title: "⏳ Processing Payment",
      description: "Please wait while we prepare your payment...",
      duration: 2000,
    });

    const options = {
      key: gameState.razorpayKeyId,
      amount: orderAmount,
      currency: orderCurrency,
      name: 'Rage Tap: Desi Challenge',
      description: `Purchase: ${item.name}`,
      image: '/vite.svg', // Replace with your game logo URL
      order_id: simulatedOrderId, // This should come from your backend
      handler: function (response) {
        // This function is called after a successful payment
        toast({
          title: "🎉 Payment Successful!",
          description: `Thank you for purchasing ${item.name}!`,
          duration: 3000,
        });

        if (item.type === 'coins') {
          updateGameState({ coins: gameState.coins + parseInt(item.name.split(' ')[0]) });
        } else if (item.type === 'subscription') {
          // Handle VIP subscription logic (e.g., set a flag in gameState)
          updateGameState({ isVip: true }); 
           toast({
            title: "🌟 VIP Activated!",
            description: "You are now a VIP member!",
            duration: 3000,
          });
        }
      },
      prefill: {
        name: 'Desi Gamer', // Optional: Prefill user's name
        email: 'desi.gamer@example.com', // Optional: Prefill user's email
        contact: '9999999999' // Optional: Prefill user's contact
      },
      notes: {
        address: 'Rage Tap Game Purchase'
      },
      theme: {
        color: '#FF6B35' // Your brand color
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function (response) {
      toast({
        title: "💳 Payment Failed",
        description: `Error: ${response.error.description}`,
        variant: "destructive",
        duration: 5000,
      });
    });
    rzp.open();
  };


  const handlePurchase = (item) => {
    if (item.realMoney) {
      handleRealMoneyPurchase(item);
      return;
    }

    if (gameState.coins < item.price) {
      toast({
        title: "💰 Not Enough Coins!",
        description: `You need ${item.price - gameState.coins} more coins!`,
        duration: 2000,
      });
      return;
    }

    if (item.type === 'booster') {
      updateGameState({
        coins: gameState.coins - item.price,
        boosters: {
          ...gameState.boosters,
          [item.id]: (gameState.boosters[item.id] || 0) + 1
        }
      });

      toast({
        title: "🎉 Purchase Successful!",
        description: `You bought ${item.name}!`,
        duration: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 right-10 w-24 h-24 bg-yellow-400 rounded-full opacity-20"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-32 left-16 w-20 h-20 bg-green-400 rounded-full opacity-25"
          animate={{ 
            y: [0, -30, 0],
            x: [0, 15, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Header */}
      <motion.div 
        className="flex items-center justify-between mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Button 
          onClick={onBack}
          variant="ghost" 
          size="icon" 
          className="bg-white/80 backdrop-blur-sm hover:bg-white/90 rounded-full shadow-lg"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </Button>

        <h1 className="game-title text-4xl font-bold">SHOP</h1>

        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
          <Coins className="w-5 h-5 text-yellow-500" />
          <span className="font-bold text-yellow-600">{gameState.coins}</span>
        </div>
      </motion.div>

      {/* Free Coins Section */}
      <motion.div 
        className="game-card rounded-3xl p-6 mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">🎁 Free Coins!</h2>
          <p className="text-gray-600 mb-4">Watch an ad to get 25 coins</p>
          <Button 
            onClick={onWatchAd}
            className="desi-button bg-green-500 text-white hover:bg-green-600 h-12 px-8"
          >
            <Tv className="w-5 h-5 mr-2" />
            Watch Ad (+25 coins)
          </Button>
        </div>
      </motion.div>

      {/* Shop Items */}
      <div className="space-y-4">
        {shopItems.map((item, index) => {
          const IconComponent = item.icon;
          const canAfford = !item.realMoney && gameState.coins >= item.price;
          
          return (
            <motion.div
              key={item.id}
              className="game-card rounded-2xl p-4"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${item.bgColor} rounded-xl flex items-center justify-center`}>
                    <IconComponent className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    {item.type === 'booster' && gameState.boosters[item.id] > 0 && (
                      <p className="text-xs text-blue-600 font-semibold">
                        Owned: {gameState.boosters[item.id]}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-2">
                    {item.realMoney ? (
                      <span className="font-bold text-green-600">
                        ₹{item.price}{item.monthly ? '/mo' : ''}
                      </span>
                    ) : (
                      <>
                        <Coins className="w-4 h-4 text-yellow-500" />
                        <span className="font-bold text-yellow-600">{item.price}</span>
                      </>
                    )}
                  </div>
                  <Button 
                    onClick={() => handlePurchase(item)}
                    disabled={!item.realMoney && !canAfford}
                    className={`h-10 px-4 text-sm ${
                      canAfford || item.realMoney 
                        ? 'desi-button bg-orange-500 text-white hover:bg-orange-600' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {item.realMoney ? 'Buy Now' : 'Purchase'}
                  </Button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Info */}
      <motion.div 
        className="mt-8 bg-white/20 backdrop-blur-sm rounded-2xl p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p className="text-white/90 text-sm text-center font-medium">
          💡 Tip: Watch ads to earn free coins and support the game! Real money purchases require a Razorpay account.
        </p>
      </motion.div>
    </div>
  );
};

export default ShopScreen;
