import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const BASE_URL = 'https://superior-sensors.herokuapp.com/'

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

    const deleteCartItem = async (variant_id) => {

        await axios.get(BASE_URL + "api/cart/" + user_id + '/remove/' + variant_id)
        getCart()
    }

    const getTotalCost = () => {
        let totalCost = 0
        if (cart) {
            
            for (let item of cart) {
                totalCost += (item.mouse.cost * item.quantity)
            }

            
        }
        return ((totalCost/100).toFixed(2))
    }


    return (

        <React.Fragment>
            <div className="container-fluid py-4">
                <div className="container">
                    {checkLoggedIn === true ?
                        <>
                            {cart.length !== 0 ?
                                <div className="h-100 border border-dark" style={{ width: "90%" }}>
                                    <div className="h-100 p-4">
                                        <div className="row d-flex justify-content-center align-items-center h-100">
                                            <div className="col-12">
                                                <h3 className="mb-3">My Cart</h3>

                                                {cart.map(c => (
                                                    <React.Fragment key={c.id}>
                                                        <div className="border-top">

                                                            <Row className='my-3'>
                                                                <Col>
                                                                    <img src={c.variant.image_url} width="200px" className='img-fluid' />
                                                                </Col>
                                                                <Col>
                                                                    <p>
                                                                        <Link to={'/mouses/' + c.mouse_id} className="text-dark">{c.mouse.name}</Link>
                                                                    </p>
                                                                    <p>
                                                                        <span className='text-muted'>Cost/ea: </span>{(c.mouse.cost / 100).toFixed(2)} SGD<br />
                                                                        <span className='text-muted'>Color: </span>{c.variant.color.name} <br />
                                                                        <span className='text-muted'>Stock left: </span>{c.variant.stock}


                                                                    </p>
                                                                </Col>
                                                                <Col md={12}>
                                                                    <Row>
                                                                        <Col>
                                                                            <input type="button" value="-" className="button-minus" onClick={async () => {
                                                                                let newQty = (c.quantity - 1)
                                                                                if (c.quantity > 1) {
                                                                                    let response = await axios.post(BASE_URL + 'api/cart/' + user_id + '/update/' + c.variant_id,
                                                                                        {
                                                                                            'quantity': newQty
                                                                                        },
                                                                                    )
                                                                                    console.log(response.data)
                                                                                    await getCart()
                                                                                }

                                                                            }} />
                                                                            <input type="number" step="1" max="" value={c.quantity} name="quantity" className="quantity-field"
                                                                                style={{width:'40px'}}
                                                                            />
                                                                            <input type="button" value="+" className="button-plus" onClick={async () => {
                                                                                let newQty = (c.quantity + 1)

                                                                                if (c.quantity < c.variant.stock) {
                                                                                    let response = await axios.post(BASE_URL + 'api/cart/' + user_id + '/update/' + c.variant_id,
                                                                                        {
                                                                                            'quantity': newQty
                                                                                        },
                                                                                    )
                                                                                    console.log(response.data)
                                                                                    await getCart()
                                                                                }

                                                                            }} />
                                                                        </Col>
                                                                        <Col>
                                                                            
                                                                            <Button variant='danger' onClick={() => { deleteCartItem(c.variant.id) }}
                                                                                style={{height: '46px'}}
                                                                            >
                                                                                Remove
                                                                            </Button>
                                                                        </Col>
                                                                    </Row>

                                                                </Col>

                                                            </Row>



                                                        </div>


                                                    </React.Fragment>
                                                ))}



                                                <div className="custom-btn-group me-3 border-top pt-3 mt-3">
                                                    <h5 className='text-muted'>Total Cost: SGD{getTotalCost()}</h5>

                                                    <a className="btn btn-dark btn-outline-light btn-block"
                                                        href={BASE_URL + "/checkout/" + user_id + '/checkout'}
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