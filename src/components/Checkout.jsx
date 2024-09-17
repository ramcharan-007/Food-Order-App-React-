import { useContext } from "react"

import CartContext from "../store/CartContext"
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Inputs";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import Modal from "./UI/Modal";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

export default function Checkout(){

    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const {data, isLoading, error, sendRequest, clearData} = useHttp('http://localhost:3000/orders', requestConfig)

    const cartTotal = cartCtx.items.reduce(
        (totalprice, item) => totalprice + item.quantity * item.price, 0
    );

    function handleClose(){
        userProgressCtx.hideCheckout();
    }

    function handleFinish(){
        userProgressCtx.hideCheckout();
        cartCtx.clearcart();
        clearData();
    }

    function handleSubmit(event){
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerdata = Object.fromEntries(fd.entries());

        sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerdata
            }
        }));

    }

    let actions = (
        <>
            <Button type="button" textOnly onClick={handleClose}>Close</Button>
            <Button>Submit Order</Button>
        </>
    );

    if (isLoading){
        actions = <span>Sending oder data....</span>
    }

    if(data){
        return <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
                <h2>Success!!</h2>
                <p>Your order was submitted successfully.</p>
                <p>We will get back to you with more details via email within the next few minutes</p>
                <p className="modal-actions">
                    <Button onClick={handleFinish}>Okay</Button>
                </p>
            </Modal>
    }

    return <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Total Amout: {currencyFormatter.format(cartTotal)}</p>
            <Input label="Full Name" type="text" id="name"/>
            <Input label="E-mail" type="email" id="email" />
            <Input label="Street" type="text" id="street" />
            <div className="control-row">
                <Input label="Postal Code" type="text" id="postal-code"/>
                <Input label="City" type="text" id="city" />
            </div>

            {
                error && <Error title="Something went wrong!!" message={error}/>
            }

            <p className="modal-actions">
                {actions}
            </p>
        </form>
    </Modal>
}