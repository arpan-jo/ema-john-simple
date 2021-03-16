import React from 'react';

const Cart = props => {
    const cart = props.cart;

    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;
    }

    const prd = cart.map(pro => {
        const count = pro.quantity;
        return count;
    });

    const quantity = prd.reduce((sum, value) => sum + value, 0);

    return (
        <div>
            <h4>Order Summary</h4>
            <p>Products: {cart.length}</p>
            <p>Quantity: {quantity}</p>
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
