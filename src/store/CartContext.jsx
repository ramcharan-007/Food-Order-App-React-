import { act, createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
    clearcart: () => {}
});

function cartReducer(state, action){
    if(action.type == 'ADD_ITEM'){
        const existingCrtItem = state.items.findIndex((item) => item.id === action.item.id);

        const updatedItems = [...state.items];

        if(existingCrtItem > -1){
            const updatedItem = {
                ...state.items[existingCrtItem],
                quantity: state.items[existingCrtItem].quantity + 1
            };
            updatedItems[existingCrtItem] = updatedItem;

        }else{
            updatedItems.push({...action.item, quantity: 1});
        }
        return {...state, items: updatedItems};
    }
    if(action.type == 'REMOVE_ITEM'){
        const existingCrtItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );

        const existingCartItem = state.items[existingCrtItemIndex];

        const updatedItems = [...state.items];

        if(existingCartItem.quantity === 1){
            updatedItems.splice(existingCartItem, 1);
        }else{
            const updatedItem = {
                ...existingCartItem, 
                quantity: existingCartItem.quantity - 1,
            };
            updatedItems[existingCrtItemIndex] = updatedItem;
        }


        return {...state, items: updatedItems};
    }

    if(action.type === "CLEAR_CART"){
        return {...state, items:[]};
    }

    return state
}


export function CartContextProvider({children}){
    const [cart, dispatchCartAction] = useReducer(cartReducer, {items: []});

    function addItem(item){
        dispatchCartAction({type: "ADD_ITEM", item});
    }

    function removeItem(id){
        dispatchCartAction({type: "REMOVE_ITEM", id });

    }

    function clearcart(){
        dispatchCartAction({type:"CLEAR_CART"});
    }

    const cartContext = {
        items: cart.items,
        addItem, 
        removeItem,
        clearcart
    };

    return <CartContext.Provider value={cartContext}>
        {children}
    </CartContext.Provider>
}

export default CartContext;