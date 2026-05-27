import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext =
  createContext(null);

export const CartProvider = ({
  children,
}) => {

  const [cartItems, setCartItems] =
    useState(() => {

      const stored =
        localStorage.getItem(
          "cart"
        );

      return stored
        ? JSON.parse(stored)
        : [];
    });

  /* =========================
     CART ANIMATION STATE
  ========================= */

  const [cartPulse, setCartPulse] =
    useState(false);

  useEffect(() => {

    localStorage.setItem(
      "cart",
      JSON.stringify(cartItems)
    );

  }, [cartItems]);

  /* =========================
     ADD TO CART
  ========================= */

  const addToCart = (
    product,
    qty = 1
  ) => {

    /* TRIGGER ANIMATION */

    setCartPulse(true);

    setTimeout(() => {
      setCartPulse(false);
    }, 700);

    setCartItems((prev) => {

      const existing =
        prev.find(
          (p) =>
            p._id === product._id &&
            p.variant ===
              product.variant
        );

      /* UPDATE EXISTING */

      if (existing) {

        return prev.map((p) =>
          p._id === product._id &&
          p.variant ===
            product.variant
            ? {
                ...p,
                qty:
                  p.qty + qty,
              }
            : p
        );
      }

      /* ADD NEW */

      return [
        ...prev,
        {
          ...product,
          qty,
        },
      ];
    });
  };

  /* =========================
     UPDATE QTY
  ========================= */

  const updateQty = (
    id,
    variant,
    qty
  ) => {

    if (qty < 1) return;

    setCartItems((prev) =>
      prev.map((p) =>
        p._id === id &&
        p.variant === variant
          ? {
              ...p,
              qty,
            }
          : p
      )
    );
  };

  /* =========================
     REMOVE
  ========================= */

  const removeFromCart = (
    id,
    variant
  ) => {

    setCartItems((prev) =>
      prev.filter(
        (p) =>
          !(
            p._id === id &&
            p.variant === variant
          )
      )
    );
  };

  /* =========================
     CLEAR
  ========================= */

  const clearCart = () =>
    setCartItems([]);

  /* =========================
     TOTALS
  ========================= */

  const totals = useMemo(() => {

    const subtotal =
      cartItems.reduce(
        (sum, item) =>
          sum +
          item.price *
            item.qty,
        0
      );

    return {

      subtotal,

      totalItems:
        cartItems.reduce(
          (s, i) =>
            s + i.qty,
          0
        ),
    };

  }, [cartItems]);

  return (

    <CartContext.Provider
      value={{

        cartItems,

        addToCart,

        updateQty,

        removeFromCart,

        clearCart,

        cartPulse,

        ...totals,
      }}
    >

      {children}

    </CartContext.Provider>
  );
};

export const useCart = () => {

  const ctx =
    useContext(CartContext);

  if (!ctx) {

    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return ctx;
};