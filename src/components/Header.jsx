import { useContext } from "react";
import logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

export default function Header(){
    const crtCtx = useContext(CartContext);
    const userCtx = useContext(UserProgressContext);

    const totalCartItem = crtCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0);

    function handleShowCart(){
        userCtx.showCart();
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={logo}/>
                <h1>React Food</h1>
            </div>
            <div>
                <nav>
                    <Button onClick={handleShowCart} textOnly>Cart({totalCartItem})</Button>
                </nav>
            </div>
        </header>
    );
}