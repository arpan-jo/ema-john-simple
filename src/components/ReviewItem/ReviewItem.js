import React from 'react';

const ReviewItem = props => {
    const { name, img, quantity, key, price } = props.product;

    // const reviewItemStyle = {
    //     borderBottom: '5px solid gray',
    //     paddingBottom: '10px',
    //     marginBottom: '10px',
    //     marginLeft: '20px',
    // };

    return (
        <div>
            <h4 className="product-name">Name: {name}</h4>
            <img src={img} alt="" />
            <p>Quantity: {quantity}</p>
            <p>
                <small>Price: {price}</small>
            </p>
            <br />
            <button
                onClick={() => props.removeProduct(key)}
                className="add-button"
            >
                Remove
            </button>
        </div>
    );
};

export default ReviewItem;
