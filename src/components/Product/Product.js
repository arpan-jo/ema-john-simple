import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css';

const Product = props => {
    const { name, img, seller, price, stock } = props.product;
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h5 className="product-name">{name}</h5>
                <div>
                    <div>
                        <p>
                            <small>by: {seller}</small>
                        </p>
                        <p>
                            $ <small>{price}</small>
                        </p>
                        <p>
                            <small>
                                Only {stock} left in stock - order soon
                            </small>
                        </p>
                        <button
                            onClick={() => props.handleButton(props.product)}
                            className="add-button"
                        >
                            <FontAwesomeIcon icon={faShoppingCart} /> add to
                            cart
                        </button>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    );
};

export default Product;
