import React, { useState, useEffect } from 'react';
import db from './firebase';
import "./Plans.css";

function Plans() {
    const [products, setProducts] = useState([]);


    useEffect(() => {
        db.collection('products')
            .where('active', '==', true)
            .get()
            .then((querySnapshot) => {
                const products = {};
                querySnapshot.forEach(
                    async (productDoc) => {
                        products[productDoc.id] = productDoc.data();
                        const priceSnap = await productDoc.ref.collection("prices").get();
                        priceSnap.docs.forEach((price) => {
                            // figure out why products object won't build
                            products[productDoc.id].prices = {
                                priceId: price.id,
                                priceData: price.data(),
                            }
                        })
                    }
                )
            });
        setProducts(products);
    }, []);

    console.log(products);

    return (
        <div className='plans'>

        </div>
    )
}

export default Plans