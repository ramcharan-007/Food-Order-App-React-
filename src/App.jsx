import Header from "./components/Header";
import Meals from "./components/Meal";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

function App() {
  return (
    <UserProgressContextProvider>
    <CartContextProvider>
      <Header />
      <Meals />
      <Cart />
      <Checkout />
    </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
