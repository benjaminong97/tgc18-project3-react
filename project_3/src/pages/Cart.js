import React, { useEffect, useState } from 'react'
import axios from 'axios'


const BASE_URL = 'https://3000-benjaminong-tgc18projec-m60k3wuifkz.ws-us63.gitpod.io/'

export default function Cart() {

    const [checkLoggedIn, setCheckLoggedIn] = useState(true)
    const [cart, setCart] = useState([])
    const [orderCost, setOrderCost] = useState(0)
    const user_id = localStorage.getItem('user_id')

    const getCart = async () => {
        

        const response = await axios.get(BASE_URL + 'api/cart/' + user_id)

        // get the total cost for items in the cart

        setCart(response.data)
    }

    useEffect(() => {

        
        //check if user is logged in
        if (user_id !== null) {
            setCheckLoggedIn(true)

            //get the cart items
            getCart()

        } else {
            setCheckLoggedIn(false)
        }
    }, [])

    const deleteCartItem = async(variant_id) => {
        let user_id = localStorage.getItem('id')
        await axios.get(BASE_URL + "api/cart")
    }


    return(

        <React.Fragment>
            <div className="container-fluid py-4">
                <div className="container content-container">
                    {checkLoggedIn === true ?
                    <>
                    {cart.length !==0 ?
                    <div className="h-100 rounded-3 shadow-lg border border-dark" style={{ width: "90%" }}>
                    <div className="h-100 p-4">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12">
                                <h3 className="mb-3">Shopping Cart</h3>
                                
                                <div className="custom-btn-group me-3">
                                    <a className="btn btn-dark btn-outline-light"
                                        href = {BASE_URL + "/checkout/" + user_id}
                                    >Checkout</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> :
                <div>
                <p className="cart-message py-4 lead text-center">There are no items in your shopping cart.</p>
                </div>
                    }
                    
                    </> :
                         <div>
                         <p className="cart-message py-4 lead text-center">Please log in to view your shopping cart.</p>
                     </div>              
                }
                    
                </div>
            </div>
        </React.Fragment>
    )
}