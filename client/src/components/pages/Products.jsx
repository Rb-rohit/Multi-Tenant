import React, { useEffect, useState } from 'react'
import API from '../../services/api';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        API.get("/products")
            .then(res => setProducts(res.data))
            .catch(err => console.log(err));
    }, []);
    return (
        <div className='p-6'>
            <h1 className='text-2xl font-bold mb-4'>My Products</h1>

            {products.length === 0 ? (
                <p>No Products found</p>
            ) : (
                products.map(p => (
                    <div key={p._id} className='p-3 border rounded mb-2'>
                        <h3 className='font-semibold'>{p.name}</h3>
                        <p>{p.price}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default Products