import React, { useState, useEffect } from 'react';
import { Accordion, Form, Carousel, Card, CarouselItem, Row, Col, Button, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'


const BASE_URL = "https://superior-sensors.herokuapp.com/"

export default function MouseDetails() {
    const [currentMouse, setCurrentMouse] = useState('')
    const [selectedVariant, setSelectedVariant] = useState('')
    const [variantSelected, setVariantSelected] = useState(false)
    const [newComment, setNewComment] = useState('')
    const [rating, setRating] = useState(5)
    const [reviews, setReviews] = useState([])

    let { mouse_id } = useParams()

    const navigate = useNavigate()

    const capitalizeFirstLetter = (string) => {
        if (string) {
            return string.slice(0,1).toUpperCase() + string.slice(1);
        }
        
      }

    useEffect(() => {
        const fetchMouse = async () => {
            let response = await axios.get(BASE_URL + 'api/mouses/' + mouse_id + '/details')
            console.log(response.data)

            setCurrentMouse(response.data)
        }

        fetchMouse()
        getReviews()
    }, [mouse_id])

    const selectVariant = (e) => {
        setSelectedVariant(e.target.value)
        setVariantSelected(true)
    }

    const getReviews = async () => {
        try {
            let response = await axios.get(BASE_URL + 'api/mouses/comment/' + mouse_id, {
                mouse_id : mouse_id
            })
            console.log(response.data)

            setReviews(response.data)

        } catch (e) {
            alert('could not get reviews')
        }
    }

    const addToCart = async () => {


        if (localStorage.getItem('user_id') && variantSelected) {
            let user_id = localStorage.getItem('user_id')
            // /:user_id/add/:mouse_id/:variant_id
            try {
                await axios.post(BASE_URL + 'api/cart/' + user_id + "/add/" + mouse_id + "/" + selectedVariant,
                    {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem("accessToken")}`
                        }

                    }
                )
                alert('Added to cart!')

            } catch (error) {

                alert('Something went wrong')
                return false
            }

        } else if (!localStorage.getItem('user_id')) {
            alert('Please log in to add to cart')

        } else if (variantSelected === false) {
            alert('Please select a variant')
        }
    }

    const sendReview = async() => {
        if (localStorage.getItem('user_id')) {
            try {
                await axios.post(BASE_URL + 'api/mouses/comment', {
                    mouse_id : mouse_id,
                    rating : rating,
                    comment: newComment
                })
                window.location.reload()
            } catch (e) {
                alert('something went wrong')
                return false
            }
        } else (
            alert('Please log in to review the product.')
        )
    }


    return (
        <React.Fragment>
            <div className="container">
                {/* <div className="page-header-2 pt-5 pb-4 my-2 mx-auto">
                    <nav aria-label="breadcrumb d-flex justify-content-center mb-2">
                        <ol class="breadcrumb b-crumb d-flex justify-content-center">
                            <li class="breadcrumb-item"><a href="/mouses">Mouses</a></li>
                            <li class="breadcrumb-item active" aria-current="page">{currentMouse.name}</li>
                        </ol>
                    </nav>
                </div> */}
                <Row className='mt-4'>
                    <Col xs={12} lg={6}>
                        <Carousel autoFocus={true} emulateTouch={true}>
                            {currentMouse.variants?.length === 0 ?
                                <div>
                                    <img src='http://res.cloudinary.com/nanometre/image/upload/v1651226796/yuyr6i2kxlmivpgxrs8r.png' alt='notavailable' />
                                    <p className="legend">No image available for this product</p>
                                </div> :
                                currentMouse.variants?.map((v, i) =>
                                    <Carousel.Item key={i}>
                                        <img src={v.image_url} alt="Not available" className='d-block w-100'  />
                                    </Carousel.Item>)
                            }
                        </Carousel>
                    </Col>
                    <Col xs={12} lg={6}>
                        <div className='d-flex'>
                            <img src={currentMouse.brand?.image_url} height='40' />
                            <h1 className="header-text mx-3">{currentMouse.name}</h1>
                        </div>
                        
                        <h3 className="subheader-text">${(currentMouse.cost / 100).toFixed(2)}</h3>
                        <p className="mb-0 body-text"><strong>Great for:</strong> {currentMouse['gameType']?.name} gaming</p>
                        <p className="mb-0 body-text"><strong>Shape:</strong> {capitalizeFirstLetter(currentMouse.shape)}</p>
                        <p className="m-0 body-text"><strong>Connectivity:</strong> {capitalizeFirstLetter(currentMouse.connectivity)}</p>
                        <p className="m-0 body-text"><strong>Dimensions:</strong> L: {currentMouse.length}mm X W: {currentMouse.width}mm X H: {currentMouse.height}mm</p>
                        <p className="mb-0 body-text"><strong>Weight:</strong> {(currentMouse.weight)} grams</p>
                    
                        {/* <div className="mt-4">
                                <button className="btn rounded-0 p-2 px-5 addtocart-btn" onClick={addToCart}>Add To Cart</button>
                                
                                <Toast className="cart-toast box rounded-0 border-0 position-absolute mt-3" onClose={() => setShow(false)} show={show} delay={3000} autohide>
                                    <div class="toast-div d-flex">
                                        <Toast.Body><i className="bi bi-check-circle"></i> Item added to shopping cart!</Toast.Body>
                                        <button type="button" className="btn cart-toast me-2 m-auto" data-bs-dismiss="toast"><i class="bi bi-x-lg"></i></button>
                                    </div>
                                </Toast>
                            </div> */}


                        <div className='pt-3 border-top border-bottom mt-3'>
                            <p>{currentMouse.description}</p>
                        </div>


                        <div className='mt-3'>
                            <span>
                                <p>Colors:</p>
                                <div className='d-flex'>
                                {
                                    currentMouse.variants?.map(v =>
                                        <React.Fragment>
                                            <span className='me-3'>
                                                <input type='radio' name='colorVariant' id={v.id}
                                                    value={v.id} checked={selectedVariant === v.id}
                                                    onChange={selectVariant}
                                                />
                                                <label htmlFor={v.id} className='mx-2'>
                                                    <span>{v.color.name}</span>
                                                </label>
                                                <br />
                                                 <React.Fragment>
                                                    <p><span className='text-muted'>Stock left: </span>{v.stock}</p>
                                                </React.Fragment> 
                                            </span>
                                        </React.Fragment>

                                    )
                                }
                                </div>
                                
                            </span>
                        </div>


                        <div className='mt-3'>

                            <Button variant='info' onClick={addToCart} >
                                Add to Cart
                            </Button>
                        </div>
                    </Col>
                </Row>
                {/* <div className="row d-flex justify-content-center p-md-5">
                    <div className="col-12 col-md-6 px-3 px-md-4 py-4 py-md-0">
                        <Carousel autoFocus={true} emulateTouch={true} useKeyboardArrows={true}>
                            {currentMouse.variants?.length === 0 ?
                                <div>
                                    <img src='http://res.cloudinary.com/nanometre/image/upload/v1651226796/yuyr6i2kxlmivpgxrs8r.png' alt='notavailable' />
                                    <p className="legend">No image available for this product</p>
                                </div> :
                                currentMouse.variants?.map((v, i) =>
                                    <CarouselItem>
                                        <div key={i}><img src={v.image_url} alt="Not available" height="400" /></div>
                                    </CarouselItem>)
                            }
                        </Carousel>
                    </div>
                    <div className="col-12 col-md-6 px-3 px-md-4 product">
                        <div className="pt-3 pb-5">
                            <div className='d-flex'>
                                <img src={currentMouse.brand?.image_url} height='40' />
                                <h1 className="header-text mx-3">{currentMouse.name}</h1>
                            </div>
                            <p className="header-small">Great for: {currentMouse['gameType']?.name} gaming</p>
                            <h3 className="subheader-text">${currentMouse.cost / 100}</h3>
                            <p className="mt-4 mb-0 body-text"><strong>Shape:</strong>{currentMouse.shape}</p>
                            <p className="m-0 body-text"><strong>Connectivity:</strong> {currentMouse.connectivity}</p>
                            <div className="mt-4">
                                <button className="btn rounded-0 p-2 px-5 addtocart-btn" onClick={addToCart}>Add To Cart</button>
                                
                                <Toast className="cart-toast box rounded-0 border-0 position-absolute mt-3" onClose={() => setShow(false)} show={show} delay={3000} autohide>
                                    <div class="toast-div d-flex">
                                        <Toast.Body><i className="bi bi-check-circle"></i> Item added to shopping cart!</Toast.Body>
                                        <button type="button" className="btn cart-toast me-2 m-auto" data-bs-dismiss="toast"><i class="bi bi-x-lg"></i></button>
                                    </div>
                                </Toast>
                            </div>
                        </div>

                        <div className="description pt-5 border-top container">
                            <p className="container">{currentMouse.description}</p>
                        </div>
                    </div>

                </div> */}

                <div className="product-info mb-5 mt-4 mt-md-0 px-3 px-md-5 py-4">
                    <Accordion defaultActiveKey="0" className="p-2">
                        {/* <Accordion.Item eventKey="0">
                            <Accordion.Header>Dimensions</Accordion.Header>
                            <Accordion.Body className="body-text">
                                <p className="mt-2 body-text">Height: {currentMouse.height}mm</p>
                                <p className="mt-2 body-text">Length: {currentMouse['length']}mm</p>
                                <p className="mt-2 body-text">Width: {currentMouse.width}mm</p>
                                <p className="mt-2 body-text">Weight: {currentMouse.weight}grams</p>
                            </Accordion.Body>
                        </Accordion.Item> */}
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Features</Accordion.Header>
                            <Accordion.Body>
                                <ul className="mt-2 body-text">{currentMouse.features?.map(t => (<li className="m-1">{t.name}</li>))}</ul>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header className="mb-3">Other Technical Specs</Accordion.Header>
                            <Accordion.Body>
                                <p className="mt-2 body-text"><strong>Backlighting:</strong><br />{currentMouse.backlighting?.name}</p>
                                <p className="body-text"><strong>Number of Buttons:</strong><br />{currentMouse.numberOfButtons}</p>
                                <p className="body-text"><strong>Max DPI:</strong><br />{currentMouse.dpi}</p>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>

                <div className='border-top border-dark p-3'>
                    <Row className='container'>
                        <Col>
                        <label for="customRange3" class="form-label">Your Rating: {rating}/5</label>
                        <div className='d-flex'>
                            <input type="range" class="form-range" min={1} max={5} step={1} id="customRange3" 
                            value={rating} onChange={e => setRating(e.target.value)}
                            />
                            
                        </div>
                        </Col>
                        <Col></Col>
                        
                    </Row>


                    <Form.Control
                        as='textarea'
                        rows={3}
                        id="caption"
                        placeholder="Type your comment here.."
                        name="newComment"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="m-2"
                    />
                    <Button variant="secondary"
                        className="m-2"
                        onClick = {sendReview}
                    >Comment</Button>
                </div>

                <div className='mt-3'>
                    <Container>
                        {reviews.length >= 1 ? 
                        reviews.map(r => (
                            <React.Fragment>
                                <Container className="my-3">
                                    <Card>
                                        <Card.Header>
                                            <figcaption>{(r.review_datetime).slice(0,10)}<br/>Rating: {r.rating}/5</figcaption>
                                            <h6>{r.comment}</h6>
                                        </Card.Header>

                                    </Card>

                                </Container>
                            </React.Fragment>
                        )) :
                        <div>
                            <p>This product has no reviews yet.</p>
                        </div>    
                    }

                    </Container>

                </div>


            </div>
        </React.Fragment >
    )
}