import React, { useState, useEffect } from 'react';
import { Accordion, Toast, Carousel, Badge } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'

const BASE_URL = "https://3000-benjaminong-tgc18projec-m60k3wuifkz.ws-us63.gitpod.io/"

export default function MouseDetails() {
    const [currentMouse, setCurrentMouse] = useState('')

    let { mouse_id } = useParams()

    useEffect(() => {
        const fetchMouse = async () => {
            let response = await axios.get(BASE_URL + 'api/mouses/' + mouse_id + '/details')
            console.log(response.data)

            setCurrentMouse(response.data)
        }

        fetchMouse()
    }, [mouse_id])


    return (
        <React.Fragment>
            <div className="page-container">
                <div className="page-header-2 pt-5 pb-4 my-2 mx-auto">
                    <nav aria-label="breadcrumb d-flex justify-content-center mb-2">
                        <ol class="breadcrumb b-crumb d-flex justify-content-center">
                            <li class="breadcrumb-item"><a href="/mouses">Mouses</a></li>
                            <li class="breadcrumb-item active" aria-current="page">{currentMouse.name}</li>
                        </ol>
                    </nav>
                </div>

                <div className="row d-flex justify-content-center p-md-5">
                    <div className="col-12 col-md-6 px-3 px-md-4 py-4 py-md-0">
                        <Carousel autoFocus={true} emulateTouch={true} useKeyboardArrows={true}>
                            {currentMouse.variants?.length === 0 ?
                                <div>
                                    <img src='http://res.cloudinary.com/nanometre/image/upload/v1651226796/yuyr6i2kxlmivpgxrs8r.png' alt='notavailable' />
                                    <p className="legend">No image available for this product</p>
                                </div> :
                                currentMouse.variants?.map((v, i) =>
                                    <div key={i}><img src={v.image_url} alt="Not available" /></div>)
                            }
                        </Carousel>
                    </div>
                    <div className="col-12 col-md-6 px-3 px-md-4 product">
                        <div className="pt-3 pb-5">
                            <h1 className="header-text">{currentMouse.name}</h1>
                            <p className="header-small">Great for: {currentMouse.gameType['name']} gaming</p>
                            <h3 className="subheader-text">${currentMouse.cost/100}</h3>
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
                        </div>

                        <div className="description pt-5 border-top">
                            <p className="body-text">{currentMouse.description}</p>
                        </div>
                    </div>

                </div>

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
                                {/* <p className="mt-2 body-text">{currentMouse.features.map(t => (<Badge bg="secondary" className="m-1">{t}</Badge>))}</p> */}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header className="mb-3">Other Technical Specs</Accordion.Header>
                            <Accordion.Body>
                                {/* <p className="mt-2 body-text"><strong>Backlighting:</strong><br />{currentMouse.backlighting.name}</p> */}
                                <p className="body-text"><strong>Number of Buttons:</strong><br />{currentMouse.numberOfButtons}</p>
                                <p className="body-text"><strong>Max DPI:</strong><br />{currentMouse.dpi}</p>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>

            </div>
        </React.Fragment>
    )
}