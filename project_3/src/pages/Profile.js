import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Profile() {
    const [myOrders, setMyOrders] = useState([])
    const [user, setUser] = useState({})
    const [loggedIn, setLoggedIn] = useState(false)
    const [checkLoggedIn, setCheckLoggedIn] = useState(false)
    const [loadingDone, setLoadingDone] = useState(false)

    const BASE_URL = 'https://superior-sensors.herokuapp.com/'

    const user_id = localStorage.getItem('user_id')

    const getUser = async () => {

        let response = await axios.get(BASE_URL + 'api/users/profile',
            {
                headers: {
                    user_id: user_id
                }
            }
        )
    }

    const getTotalCost = (orderItems) => {
        let cost = 0
        for (let item of orderItems) {
            cost += (item.variant.mouse.cost * item.quantity)
        }
        return ((cost / 100).toFixed(2))
    }

    const getOrders = async () => {
        let response = await axios.get(BASE_URL + 'api/orders/' + user_id)
        console.log(response.data)

        setMyOrders(response.data)
        setLoadingDone(true)
    }

    useEffect(() => {
        if (user_id !== null) {
            setCheckLoggedIn(true)
            getOrders()
        } else {
            setCheckLoggedIn(false)
        }
    }, [])

    return (

        !checkLoggedIn ? (
            <div>
                <p className="cart-message py-4 lead text-center">Please log in to view your shopping cart.</p>
            </div>)
            :
            (
                !loadingDone ? (<React.Fragment>
                    <div className='m-auto d-flex align-items-center h-100'>
                        <img src={require('../images/superior.gif')} style={{ 'position': 'absolute', 'margin': 'auto', 'top': '0', 'bottom': '0', 'right': '0', 'left': '0' }} />
                    </div>

                </React.Fragment>) : (
                    <React.Fragment>
                        <div className='container-fluid py-4'>
                            <div className='container'>
                                {myOrders.length !== 0 ?
                                    <div className="h-100 p-4">
                                        <div className="row d-flex justify-content-center align-items-center h-100">
                                            <div className="col-12">
                                                <div>
                                                    <h3 className='mb-3'>My Orders</h3>

                                                    {myOrders.map(o => (
                                                        <React.Fragment key={o.id}>
                                                            <div className='border border-dark mt-3'>
                                                                <div>
                                                                    <h5 className='m-3'>
                                                                        Order Summary :
                                                                    </h5>
                                                                </div>
                                                                {o.orderItems?.map(i => (
                                                                    <React.Fragment key={i.id}>
                                                                        <div className='border-top mb-2'>
                                                                            <Row className='mt-3'>
                                                                                <Col>
                                                                                    <img src={i.variant.image_url} width='200px' className='img-fluid' />
                                                                                </Col>

                                                                                <Col>
                                                                                    <p>
                                                                                        <Link to={'/mouses/' + i.variant.mouse_id}>{i.variant.mouse.name}</Link>
                                                                                    </p>
                                                                                    <p>
                                                                                        <span className='text-muted'>Cost/ea: </span>{(i.variant.mouse.cost / 100).toFixed(2)} SGD<br />
                                                                                        <span className='text-muted'>Color: </span>{i.variant.color.name} <br />
                                                                                        <span className='text-muted'>Qty: </span>{i.quantity}
                                                                                    </p>
                                                                                </Col>
                                                                                <Col>

                                                                                </Col>
                                                                            </Row>

                                                                        </div>

                                                                    </React.Fragment>
                                                                ))}
                                                                <div className='border-top'>
                                                                    <p className='m-3'>
                                                                        Transaction ID: {o.payment_reference} <br /><br />
                                                                        Total Cost: {
                                                                            getTotalCost(o.orderItems)
                                                                        }   <br /><br />

                                                                        Delivery address: <br />
                                                                        {o.address.line_1}, {o.address.line_2}<br />
                                                                        S({o.address.postal_code})
                                                                        <br /><br />
                                                                        Delivery Status: {o.status.name}
                                                                        <br /><br />
                                                                        Order Date: {o.date.slice(0, 10)}
                                                                    </p>

                                                                </div>
                                                            </div>
                                                        </React.Fragment>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    :
                                    <div>
                                        <p className="cart-message py-4 lead text-center">You have not made any orders.</p>
                                    </div>
                                }
                            </div>
                        </div>
                    </React.Fragment>
                )

            )
    )
}