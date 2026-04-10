
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../services/api';

const CompanyDetails = () => {
    const {id} = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        API.get(`/products?companyId=${id}`)
            .then(res => setProducts(res.data))
            .catch(err => console.log(err));
    }, [id]);

    return (
        <div className='p-6'>
            <h1 className='text-2xl font-bold mb-4'>
                Company Products
            </h1>

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

export default CompanyDetails