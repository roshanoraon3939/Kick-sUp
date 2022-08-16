import { useState, useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { commerce } from "./lib/commerce";

import NavBar from "./component/Navbar";
import Products from "./component/Products";
import Basket from "./component/Basket";
import Footer from "./component/Footer";
import Checkout from "./component/CheckoutForm/Checkout/Checkout";
import Login from "./component/Login";
import Signup from "./component/Signup";

const App = () => {
  const [products, setProducts] = useState([]);
  const [basketData, setBasketData] = useState({});
  const [orderInfo, setOrderInfo] = useState({});
  const [orderError, setOrderError] = useState("");

  const fetchProducts = async () => {
    const response = await commerce.products.list();
    setProducts((response && response.data) || []);
  };

  const fetchBasketData = async () => {
    const response = await commerce.cart.retrieve();
    setBasketData(response);
  };

  const addProduct = async (productId, quantity) => {
    const response = await commerce.cart.add(productId, quantity);
    setBasketData(response.cart);
  };

  const RemoveItemFromBasket = async (itemId) => {
    const response = await commerce.cart.remove(itemId);
    setBasketData(response.cart);
  };

  const handleEmptyBasket = async () => {
    const response = await commerce.cart.empty();
    setBasketData(response.cart);
  };

  const updateProduct = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity });
    setBasketData(response.cart);
  };

  const refreshBasket = async () => {
    const newBasketData = await commerce.cart.refresh();
    setBasketData(newBasketData);
  };

  const handleCheckout = async (checkoutId, orderData) => {
    try {
      // const incomingOrder = await commerce.checkout.capture(
      //   checkoutId,
      //   orderData
      // );

      setOrderInfo(orderData);

      refreshBasket();
    } catch (error) {
      setOrderError(
        (error.data && error.data.error && error.data.error.message) ||
          "There is an error occurred"
      );
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchBasketData();
  }, []);

  console.log(basketData);

  return (
    <Router>
      <div>
        <CssBaseline />
        
        <Routes>

          {/* <Route exact path="/" > 
            <Login />
          </Route>
           */}
          <Route path="/" exact element={<Login />} />

          {/* <Route exact path="/signup">
            <Signup />
          </Route> */}

          <Route path="/signup" exact element={<Signup />} />

          {/* <Route exact path="/products">
            <NavBar
                basketItems={basketData.total_items}
                totalCost={
                  (basketData.subtotal &&
                    basketData.subtotal.formatted_with_symbol) ||
                  "00.00"
                }
              />
            <Products products={products} addProduct={addProduct}  />   
            <Footer />
          </Route> */}

          <Route path="/products" exact element={
            <>
            <NavBar basketItems={basketData.total_items}
            totalCost={
              (basketData.subtotal &&
                basketData.subtotal.formatted_with_symbol) ||
              "00.00"
            }
            />
            <Products products={products} addProduct={addProduct}  />   
            <Footer />
        </>
          } />

          {/* <Route exact path="/basket">
              <NavBar
              basketItems={basketData.total_items}
              totalCost={
                (basketData.subtotal &&
                  basketData.subtotal.formatted_with_symbol) ||
                "00.00"
              }
            />
            <Basket
              basketData={basketData}
              updateProduct={updateProduct}
              handleEmptyBasket={handleEmptyBasket}
              RemoveItemFromBasket={RemoveItemFromBasket}
            />
            <Footer />
          </Route> */}
          
          <Route path="/basket" exact element={
            <>
            <NavBar
              basketItems={basketData.total_items}
              totalCost={
                (basketData.subtotal &&
                  basketData.subtotal.formatted_with_symbol) ||
                "00.00"
              }
            />
            <Basket
              basketData={basketData}
              updateProduct={updateProduct}
              handleEmptyBasket={handleEmptyBasket}
              RemoveItemFromBasket={RemoveItemFromBasket}
            />
            <Footer />
        </>
          } />


           {/* <Route path="/checkout" exact>

                <NavBar
                  basketItems={basketData.total_items}
                  totalCost={
                    (basketData.subtotal &&
                      basketData.subtotal.formatted_with_symbol) ||
                    "00.00"
                  }
                />
                <Checkout cart={basketData} order={orderInfo} onCaptureCheckout={handleCheckout} error={orderError} />
                <Footer />
          </Route> */}

          <Route path="/checkout" exact element={
            <>
            <NavBar
                  basketItems={basketData.total_items}
                  totalCost={
                    (basketData.subtotal &&
                      basketData.subtotal.formatted_with_symbol) ||
                    "00.00"
                  }
                />
                <Checkout cart={basketData} order={orderInfo} onCaptureCheckout={handleCheckout} error={orderError} />
                <Footer />
            </>
          } />

        </Routes>
        
      </div>
    </Router>
  );
};

export default App;
