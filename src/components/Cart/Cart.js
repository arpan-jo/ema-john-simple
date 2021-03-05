import React from 'react';

const Cart = props => {
    const cart = props.cart;

    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;
    }
    return (
        <div>
            <h4>Order Summary</h4>
            <p>Products: {cart.length}</p>

            <p>
                <small>Items price: {}</small>
            </p>
            <p>
                <small>Total before tax: {total}</small>
            </p>
            {props.children}
        </div>
    );
};

export default Cart;
