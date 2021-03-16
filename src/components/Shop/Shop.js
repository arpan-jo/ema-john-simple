import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import {
    addToDatabaseCart,
    getDatabaseCart,
} from '../../utilities/databaseManager';

import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import { Link } from 'react-router-dom';

import './Shop.css';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);

    const [cart, setCart] = useState([]);
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey);
            product.quantity = savedCart[existingKey];
            return product;
        });
        setCart(previousCart);
    }, []);

    const handleAddProduct = products => {
        const toBeAddedKey = products.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        } else {
            products.quantity = 1;
            newCart = [...cart, products];
        }
        setCart(newCart);
        addToDatabaseCart(products.key, count);
    };

    return (
        <div className="shop-container">
            <div className="product-container">
                {products.map(prod => (
                    <Product
                        key={prod.key}
                        showAddToCart={true}
                        handleAddProduct={handleAddProduct}
                        product={prod}
                    ></Product>
                ))}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="add-button">Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;
