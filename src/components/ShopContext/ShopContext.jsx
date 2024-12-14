import { createContext, useState, useEffect } from "react";

export const ShopContext = createContext();

import { productsData } from "../../data";

const ShopContextProvider = ({ children }) => {
  const [products] = useState(productsData);

  const [cart, setCart] = useState([]);
  const [itemAmount, setItemAmount] = useState(0);
  const [total, setTotal] = useState(0);

  const addTocart = (product, id) => {
    const newItem = { ...product, amount: 1 };
    const cartItem = cart.find((item) => {
      return item.id === id;
    });

    if (cartItem) {
      const newCart = [...cart].map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount + 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  // fxn to get the total price
  useEffect(() => {
    const total = cart.reduce((acc, curr) => {
      const priceAsNumber = parseFloat(curr.price);
      if (isNaN(priceAsNumber)) {
        return acc;
      }
      return acc + priceAsNumber * curr.amount;
    }, 0);
    setTotal(total);
  }, [cart]);

  // fxn is to calculate the quantity of item in our cart
  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((acc, curr) => {
        return acc + curr.amount;
      }, 0);
      setItemAmount(amount);
    }
  }, [cart]);

  // fxn to remove from cart bassed on id
  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => {
      return item.id !== id;
    });
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  // fxn to increase amount
  const increaseAmount = (id) => {
    const cartItem = cart.find((item) => item.id === id);
    addTocart(cartItem, id);
  };

  // decrease amount
  const decreaseAmount = (id) => {
    const cartItem = cart.find((item) => {
      return item.id === id;
    });
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount - 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      if (cartItem.amount < 2) {
        removeFromCart(id);
      }
    }
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        addTocart,
        removeFromCart,
        clearCart,
        increaseAmount,
        decreaseAmount,
        itemAmount,
        total,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
