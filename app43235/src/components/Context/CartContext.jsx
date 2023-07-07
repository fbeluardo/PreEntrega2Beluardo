import { useState, createContext, useContext } from 'react';

const CartContext = createContext({
  cart: [],
  totalQuantity: 0,
  totalPurchase: 0,
  addItem: () => {},
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItem = (productToAdd, quantity) => {
    const existingProductIndex = cart.findIndex((product) => product.id === productToAdd.id);

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      setCart((prev) => [...prev, { ...productToAdd, quantity }]);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalQuantity = () => {
    return cart.reduce((total, product) => total + product.quantity, 0);
  };

  const getTotalPurchase = () => {
    return cart.reduce((total, product) => total + product.quantity * product.precio, 0);
  };

  const totalQuantity = getTotalQuantity();
  const totalPurchase = getTotalPurchase();
  

  return (
    <CartContext.Provider value={{ cart, totalQuantity, totalPurchase, addItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => {
  return useContext(CartContext);
};


export default CartContext;

