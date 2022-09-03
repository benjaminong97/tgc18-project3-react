import React, { useState, useEffect } from 'react';
import { Accordion, Toast, Carousel, Badge, CarouselItem, Row, Col, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'

const BASE_URL = "https://3000-benjaminong-tgc18projec-m60k3wuifkz.ws-us63.gitpod.io/"

export default function MouseDetails() {
    const [currentMouse, setCurrentMouse] = useState('')
    const [selectedVariant, setSelectedVariant] = useState('')
    const [variantSelected, setVariantSelected] = useState(false)

    let { mouse_id } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        const fetchMouse = async () => {
            let response = await axios.get(BASE_URL + 'api/mouses/' + mouse_id + '/details')
            console.log(response.data)

            setCurrentMouse(response.data)
        }

        fetchMouse()
    }, [mouse_id])

    const selectVariant = (e) => {
        setSelectedVariant(e.target.value)
        setVariantSelected(true)
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


    return (
        <React.Fragment>
            <div className="page-container container">
                <div className="page-header-2 pt-5 pb-4 my-2 mx-auto">
                    <nav aria-label="breadcrumb d-flex justify-content-center mb-2">
                        <ol class="breadcrumb b-crumb d-flex justify-content-center">
                            <li class="breadcrumb-item"><a href="/mouses">Mouses</a></li>
                            <li class="breadcrumb-item active" aria-current="page">{currentMouse.name}</li>
                        </ol>
                    </nav>
                </div>
                <Row>
                    <Col xs={12} lg={6}>
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
                    </Col>
                    <Col xs={12} lg={6}>
                        <div className='d-flex'>
                            <img src={currentMouse.brand?.image_url} height='40' />
                            <h1 className="header-text mx-3">{currentMouse.name}</h1>
                        </div>
                        <p className="header-small">Great for: {currentMouse['gameType']?.name} gaming</p>
                        <h3 className="subheader-text">${currentMouse.cost / 100}</h3>
                        <p className="mt-4 mb-0 body-text"><strong>Shape:</strong>{currentMouse.shape}</p>
                    
                        <p className="m-0 body-text"><strong>Connectivity:</strong> {currentMouse.connectivity}</p>
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
                            {
                                currentMouse.variants?.map(v =>
                                    <React.Fragment>
                                        <span>
                                            <input type='radio' name='colorVariant' id={v.id}
                                                value={v.id} checked={selectedVariant === v.id}
                                                onChange={selectVariant}
                                            />
                                            <label htmlFor={v.id}>
                                                <span></span>
                                            </label>
                                         <br/>
                                        {selectedVariant? <React.Fragment>
                                            <p><span className='text-muted'>Stock left: </span>{v.stock}</p>
                                        </React.Fragment> : null}
                                        </span>
                                    </React.Fragment>

                                )
                            }
                        </span>
                            </div>
                        

                        <div className='mt-3'>
                            
                            <Button onClick={addToCart}>
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
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Dimensions</Accordion.Header>
                            <Accordion.Body className="body-text">
                                <p className="mt-2 body-text">Height: {currentMouse.height}mm</p>
                                <p className="mt-2 body-text">Length: {currentMouse['length']}mm</p>
                                <p className="mt-2 body-text">Width: {currentMouse.width}mm</p>
                                <p className="mt-2 body-text">Weight: {currentMouse.weight}grams</p>
                            </Accordion.Body>
                        </Accordion.Item>
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

            </div>
        </React.Fragment >
    )
}