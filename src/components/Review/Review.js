import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import {
    getDatabaseCart,
    processOrder,
    removeFromDatabaseCart,
} from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import { Link, useHistory } from 'react-router-dom';
import happyImage from '../../images/giphy.gif';

const Review = () => {
    const [cart, setCart] = useState([]);
    const history = useHistory();
    const [orderPlace, setOrderPlace] = useState(false);

    const handleProccedCheckout = () => {
        history.push('/shipment');
    };

    const removeProduct = productKey => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    };

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        // const count = Object.values(savedCart);
        const cartProducts = productKeys.map(keys => {
            const cartProducts = fakeData.find(product => product.key === keys);
            cartProducts.quantity = savedCart[keys];
            return cartProducts;
        });
        setCart(cartProducts);
    }, []);

    let thankYou;
    if (orderPlace) {
        thankYou = <img src={happyImage} alt="" />;
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                {cart.map(pd => (
                    <ReviewItem
                        removeProduct={removeProduct}
                        key="pd.key"
                        product={pd}
                    ></ReviewItem>
                ))}
                {thankYou}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link>
                        <button
                            onClick={handleProccedCheckout}
                            className="add-button"
                        >
                            Procced Checkout
                        </button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Review;
