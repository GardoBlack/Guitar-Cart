import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { db } from "./data/db";
import { useEffect, useState } from "react";

function App() {
  //States
  const [data] = useState(db);

  //cart state
  const [cart, setCart] = useState([]);

  //initial cart storage
  useEffect(() => {
    const cartStorage = JSON.parse(localStorage.getItem("cart"));
    if (cartStorage) {
      setCart(cartStorage);
    }
  }, [cart]);

  //save to local storage
  function saveLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  //remove from cart function
  function removeFromCart(id) {
    console.log("remove from cart", id);

    setCart(cart.filter((guitar) => guitar.id !== id));
  }

  //add to cart function
  function addToCart(item) {
    //check for existing item in cart
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);
    if (itemExists !== -1) {
      const newCart = [...cart];
      newCart[itemExists].quantity++;
      setCart(newCart);
      return;
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }
    console.log("added to cart");
    saveLocalStorage();
  }

  // increase quantity function
  function increaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }

  //clear cart function
  function clearCart() {
    setCart([]);
  }

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar key={guitar.id} guitar={guitar} addToCart={addToCart} />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
