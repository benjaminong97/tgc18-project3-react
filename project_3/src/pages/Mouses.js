import React, { useState, useEffect } from "react";
import { Form, Accordion, Breadcrumb, Container, Card, Badge } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from 'axios'

const BASE_URL = 'https://3000-benjaminong-tgc18projec-m60k3wuifkz.ws-us63.gitpod.io/'

export default function Mouses() {
    const [mouses, setMouses] = useState([])
    const [mouseBrands, setMouseBrands] = useState([])
    const [mouseFeatures, setMouseFeatures] = useState([])
    const [mouseGameTypes, setMouseGameTypes] = useState([])
    const [mouseBacklightings, setMouseBacklightings] = useState([])

    const [nameSearch, setNameSearch] = useState('')


    useEffect(() => {
        const fetchMouses = async () => {
            let response = await axios.get(BASE_URL + "api/mouses")
            setMouses(response.data)

        }
        fetchMouses()
    }, [])

    useEffect(() => {
        const fetchBrands = async () => {
            let response = await axios.get(BASE_URL + "api/mouses/brands")
            setMouseBrands(response.data)
        }
        fetchBrands()
    }, [])

    useEffect(() => {
        const fetchFeatures = async () => {
            let response = await axios.get(BASE_URL + "api/mouses/features")
            setMouseFeatures(response.data)
        }
        fetchFeatures()
    }, [])

    useEffect(() => {
        const fetchGameType = async () => {
            let response = await axios.get(BASE_URL + "api/mouses/gametypes")
            setMouseGameTypes(response.data)
        }
        fetchGameType()
    }, [])

    useEffect(() => {
        const fetchBacklightings = async () => {
            let response = await axios.get(BASE_URL + "api/mouses/backlightings")
            setMouseBacklightings(response.data)
        }
        fetchBacklightings()
    }, [])

    return (
        <React.Fragment>
            <Container className="m-3">





                {/* Listings */}
                <div className="products mb-5 col-12 col-md-9">
                    <div className="pb-3 row row-cols-2 row-cols-md-2 row-cols-lg-3 g-3 g-md-4">
                        {mouses.map((m) => (
                            <div className='col' key={m.id}>
                                <Card bg='light' style={{'height': "470px"}}>
                                    <div class="wrapper">
                                        <Link to={'/mouses/' + m.id} className="text-decoration-none text-reset">
                                            <div className='img'>
                                                <img src={m.variants[0].image_url} className='card-img-top rounded-0' alt='mouse image' style={{'height': '270px'}} />
                                            </div>
                                            <div className='d-flex row justify-content-between my-3 mx-1'>
                                                <div className='col-12 col-md-7'>
                                                    <p className='product-title mb-2'>{m.name}</p>
                                                </div>
                                                <div className='col-12 col-md-5'>
                                                    <p className="product-title text-md-end text-start"><span>SG$ {(m.cost/100).toFixed(2)}</span></p>
                                                </div>
                                                <div>
                                                    {
                                                        m.features.map(f => (<Badge pill bg='success'>{f.name}</Badge>))
                                                    }
                                                    
                                                </div>
                                                {/* add in some features here */}
                                            </div>
                                            <div class="product-price-btn m-3">
                                            
                                            <button type="button">buy now</button>
                                        </div>

                                        </Link>
                                    </div>

                                </Card>

                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </React.Fragment>
    )
}
