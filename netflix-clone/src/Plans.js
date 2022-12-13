import React, { useState, useEffect, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from "./features/userSlice"
import { loadStripe } from "@stripe/stripe-js";
import db from './firebase';
import "./Plans.css";

function Plans() {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);
    const publishKey = "pk_test_51IgzkhK8nAlCnZ75pqyKnbH0ulOrmzhEeIG752yhlNeZlufR90exSngNvbqIZTiNxgzQaFax77FcXLwNbEC3H3fz00PukLIbfM";
    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        db.collection("customers")
            .doc(user?.uid)
            .collection("subscriptions")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(async subscription => {
                    setSubscription({
                        role: subscription.data().role,
                        current_period_end: subscription.data().current_period_end.seconds,
                        current_period_start: subscription.data().current_period_start.seconds,
                    });
                })
            });
    }, [user?.uid])

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
                            products[productDoc.id].prices = {
                                priceId: price.id,
                                priceData: price.data(),
                            }
                        })
                    }
                )
                setProducts(products);
            });
    }, []);

    console.log(subscription);

    const loadCheckOut = async (priceId) => {
        const docRef = await db.collection("customers")
            .doc(user.uid).collection("checkout_sessions")
            .add({
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin,
            });

        docRef.onSnapshot(async (snap) => {
            const { error, sessionId } = snap.data();

            if (error) {
                alert(`An error occured: ${error.message}`);
            }

            if (sessionId) {
                const stripe = await loadStripe(publishKey);
                stripe.redirectToCheckout({ sessionId });
            }
        })
    }

    return (
        <div className='plans'>
            {subscription && <p className='plans__renewal'>Renewal Date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>}
            {Object.entries(products).map(([productId, productData]) => {

                const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role);

                return (
                    <div key={productId} className={`${isCurrentPackage && "plans__subscriptions-disabled"} plans__subscriptions`} >
                        <div className='plans__info'>
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>


                        <button onClick={() => !isCurrentPackage && loadCheckOut(productData?.prices.priceId)}>
                            {isCurrentPackage ? "Current Plan" : "Subscribe"}
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default Plans