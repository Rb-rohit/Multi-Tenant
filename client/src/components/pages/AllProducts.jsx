import { useEffect, useState } from "react";
import API from "../../services/api";


const AllProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        API.get("/products")
            .then(res => setProducts(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">All Products</h1>

            {products.length === 0 ? (
                <p>No products found</p>
        ) : (
            products.map(p => (
                <div key={p._id} className="p-3 border rounded mb-2">
                    <h3 className="font-semibold">{p.name}</h3>
                    <p>₹ {p.price}</p>
                    <p className="text-sm text-gray-500">
                        Company: {p.companyId}
                    </p>
                </div>
            ))
        )}
        </div>
    );
};

export default AllProducts;