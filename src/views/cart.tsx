import "./cart.css"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import cartImage from "../assets/cart.svg"
import { IoClose } from 'react-icons/io5';
import { CgMathPlus, CgMathMinus } from 'react-icons/cg';
import { CartItem, increaseQuantity, reduceQuantity, removeItem } from "../features/cart";
import emptyCart from "../assets/empty-cart.png"
function CartMenu(props: any) {
    const cart = useSelector((state: RootState) => state.cart.cart)
    let totalItems = 0;
    let totalAmount = 0
    let maxInstallment = 0;
    let currency = "";
    Object.values(cart).map(cartItems => Object.values(cartItems).map(cartItemSize => {
        totalItems += cartItemSize.quantity
        totalAmount += cartItemSize.price * cartItemSize.quantity;
        if (cartItemSize.installments > maxInstallment) {
            maxInstallment = cartItemSize.installments
        }
        currency = cartItemSize.currency;
    }))
    const dispatch = useDispatch()
    function removeItemDispatch(cartItem: CartItem) {
        dispatch(removeItem({ cartItem }))
    }
    function increaseQuantityDispatch(cartItem: CartItem) {
        dispatch(increaseQuantity({ cartItem }))
    }
    function reduceQuantityDispatch(cartItem: CartItem) {
        dispatch(reduceQuantity({ cartItem }))
    }
    console.log("cart length", Object.values(cart).length, cart)
    return (
        // <div style={{width:"1000px",height:"1000px",backgroundColor:"black"}}></div>
        <div className={`cart-menu-container`}>
            <div className={`cart-menu-content ${props.showCartMenu ? "open" : ""}`}>
                {
                    !props.showCartMenu && <button className='cart-button' onClick={props.onClose}>
                        <img className="cart-button-svg" src={cartImage}></img>
                        <div className="total-quantity-tag" > {totalItems}</div>
                    </button>}
                {
                    props.showCartMenu && <button className='cart-button' onClick={props.onClose}>
                        <IoClose style={{ width: "50px", height: "50px", position: "absolute" }} />
                    </button>
                }
                <div className="cart-menu">
                    {Object.values(cart).length == 0 &&
                        <div className="no-items">
                            <img style={{ height: "250px", width: "250px" }} src={emptyCart} />
                            <h3 style={{ color: "white" }}>No Items in cart</h3>
                        </div>}
                    {
                        Object.values(cart).length != 0 &&
                            <ul className="cart-items">
                            {Object.values(cart).map((cartItem) =>
                                Object.values(cartItem).map((cartItemSize) =>
                                    <li className="cart-item" key={`${cartItemSize.id}${cartItemSize.size}`}>
                                        <div style={{ display: "flex", flexDirection: "row", padding: "10px", gap: "10px" }}> <img src={`https://raw.githubusercontent.com/jeffersonRibeiro/react-shopping-cart/main/src/static/products/${cartItemSize.sku}-1-product.webp`}
                                            style={{ height: "100px" }}></img>
                                            <div style={{ display: "flex", alignItems: "start", flexDirection: "column" }}>
                                                <span style={{ color: "white" }}> {cartItemSize.name} </span>
                                                <span style={{ color: "gray" }}> {cartItemSize.size} | {cartItemSize.style} </span>
                                                <span style={{ color: "gray" }}> Quantity: {cartItemSize.quantity} </span>
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                                            <IoClose className="closeIcon" onClick={() => removeItemDispatch(cartItemSize)}></IoClose>
                                            <div className="cart-item-price">{cartItemSize.currency}{cartItemSize.price}</div>
                                            <div style={{ display: "flex", flexDirection: "row" }} >
                                                <button className="plus-minus-buttons" onClick={() => reduceQuantityDispatch(cartItemSize)} disabled={cartItemSize.quantity <= 1}> <CgMathMinus style={{ height: "12px" }} /></button>
                                                <button className="plus-minus-buttons" onClick={() => increaseQuantityDispatch(cartItemSize)} > <CgMathPlus style={{ height: "12px" }} /></button>

                                            </div>
                                        </div>
                                    </li>
                                )
                            )}
                        </ul>}
                    <div className="checkout">
                        <div className="total-amount">
                            <span style={{ color: "gray", fontSize: "1.4rem" }}>SUBTOTAL</span>
                            <div style={{ display: "flex", alignItems: "flex-end", flexDirection: "column", justifyContent: "flex-start" }}>
                                <span style={{ color: "rgb(249, 168, 17)", fontSize: "2rem" }}>{currency}{totalAmount.toFixed(2)}</span>
                                {totalAmount != 0 && <span style={{ color: "gray" }}> OR UP TO {maxInstallment} x {(totalAmount / maxInstallment).toFixed(2)}</span>}</div>
                        </div>
                        <button className="checkout-button"> Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartMenu;