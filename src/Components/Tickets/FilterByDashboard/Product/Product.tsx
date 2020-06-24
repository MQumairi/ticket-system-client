import React from 'react';
import {IProduct} from '../../../../Models/product';
import "./product.css";

const products: IProduct[] = [
    {id: 1, name: "Product 1"},
    {id: 2, name: "Product 2"},
    {id: 3, name: "Product 3"}
];

const Product = () => {
    return (
        <div>
            <h4 className="filterTitle">Product</h4>

            {products.map((product)=> {
                return <div className="productItem" key={product.id}>{product.name}</div>
            })}
        </div>
    )
}

export default Product
