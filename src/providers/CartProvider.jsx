import { createContext, useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("decoriva-cart");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("decoriva-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (service) => {
    const exists = cart.find((item) => item._id === service._id);
    if (exists) {
      toast.error("Item already in shortlist!");
      return;
    }
    setCart([...cart, service]);
    toast.success("Added to shortlist");
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  const clearCart = () => setCart([]);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const cartTotal = useMemo(() => {
    let total = 0;
    for (const item of cart) {
      total += item.cost || 0;
    }
    return total;
  }, [cart]);

  const cartInfo = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    toggleCart,
  };

  return (
    <CartContext.Provider value={cartInfo}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
