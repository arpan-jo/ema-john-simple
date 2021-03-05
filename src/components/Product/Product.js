import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css';
import { Link } from 'react-router-dom';

const Product = props => {
    const { name, img, seller, price, stock, key } = props.product;
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h5 className="product-name">
                    <Link to={'/product/' + key}>{name}</Link>
                </h5>
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
                        {props.showAddToCart && (
                            <button
                                onClick={() =>
                                    props.handleAddProduct(props.product)
                                }
                                className="add-button"
                            >
                                add to cart
                                <FontAwesomeIcon icon={faShoppingCart} />
                            </button>
                        )}
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    );
};

export default Product;
