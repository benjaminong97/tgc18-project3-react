import React, { useState, useEffect } from "react";
import { Form, Accordion, Breadcrumb, Container, Card, Badge } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
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
    const [brandSearch, setBrandSearch] = useState([])
    const [featureSearch, setFeatureSearch] = useState([])
    const [backlightingSearch, setBacklightingSearch] = useState([])
    const [dpiSearch, setDpiSearch] = useState(0)
    const [gameTypeSearch, setGameTypeSearch] = useState('')
    const [connectivitySearch, setConnectivitySearch] = useState('')
    const [loadingDone, setLoadingDone] = useState(false)


    useEffect(() => {
        const fetchMouses = async () => {
            let response = await axios.get(BASE_URL + "api/mouses")
            setMouses(response.data)
            setLoadingDone(true)
        }
        const fetchBrands = async () => {
            let response = await axios.get(BASE_URL + "api/mouses/brands")
            setMouseBrands(response.data)
        }
        const fetchFeatures = async () => {
            let response = await axios.get(BASE_URL + "api/mouses/features")
            setMouseFeatures(response.data)
        }
        const fetchGameType = async () => {
            let response = await axios.get(BASE_URL + "api/mouses/gametypes")
            setMouseGameTypes(response.data)
        }
        const fetchBacklightings = async () => {
            let response = await axios.get(BASE_URL + "api/mouses/backlightings")
            setMouseBacklightings(response.data)
        }
        fetchBrands()
        fetchBacklightings()
        fetchFeatures()
        fetchGameType()
        fetchMouses()
    }, [])

    // useEffect(() => {
    //     const fetchBrands = async () => {
    //         let response = await axios.get(BASE_URL + "api/mouses/brands")
    //         setMouseBrands(response.data)
    //     }
    //     fetchBrands()
    // }, [])

    // useEffect(() => {
    //     const fetchFeatures = async () => {
    //         let response = await axios.get(BASE_URL + "api/mouses/features")
    //         setMouseFeatures(response.data)
    //     }
    //     fetchFeatures()
    // }, [])

    // useEffect(() => {
    //     const fetchGameType = async () => {
    //         let response = await axios.get(BASE_URL + "api/mouses/gametypes")
    //         setMouseGameTypes(response.data)
    //     }
    //     fetchGameType()
    // }, [])

    // useEffect(() => {
    //     const fetchBacklightings = async () => {
    //         let response = await axios.get(BASE_URL + "api/mouses/backlightings")
    //         setMouseBacklightings(response.data)
    //     }
    //     fetchBacklightings()
    // }, [])

    

    const updateBrand = e => {

        if (brandSearch.includes(e.target.value)) {
            let clone = brandSearch.slice()
            let currentIndex = brandSearch.findIndex(i => i === e.target.value)
            clone.splice(currentIndex, 1)

            setBrandSearch(clone)
        } else {
            let clone = brandSearch.slice()
            clone.push(e.target.value)
            setBrandSearch(clone)
        }
    }

    const updateFeature = e => {
        if (featureSearch.includes(e.target.value)) {
            let clone = featureSearch.slice()
            let currentIndex = featureSearch.findIndex(i => i === e.target.value)
            clone.splice(currentIndex, 1)
            setFeatureSearch(clone)
        } else {
            let clone = featureSearch.slice()
            clone.push(e.target.value)
            setFeatureSearch(clone)
        }
    }

    const updateBacklighting = e => {
        if (backlightingSearch.includes(e.target.value)) {
            let clone = backlightingSearch.slice()
            let currentIndex = backlightingSearch.findIndex(i => i === e.target.value)
            clone.splice(currentIndex, 1)
            setBacklightingSearch(clone)
        } else {
            let clone = backlightingSearch.slice()
            clone.push(e.target.value)
            setBacklightingSearch(clone)
        }
    }



    const search = async () => {
        let query = {}

        if (nameSearch) {
            query.name = nameSearch
        }

        if (brandSearch) {
            console.log(brandSearch)
            query.brand = brandSearch
        }

        if (backlightingSearch) {
            query.backlighting = backlightingSearch
        }

        if (dpiSearch) {
            query.dpi = dpiSearch
        }

        if (featureSearch) {
            query.features = featureSearch
        }

        if (gameTypeSearch) {
            query.gameType = gameTypeSearch
        }

        if (connectivitySearch) {
            query.connectivity = connectivitySearch
        }

        const response = await axios.post(BASE_URL + "api/mouses/search", query)
        console.log('results:', response.data)

        setMouses(response.data)
    }

    const searchReset = async () => {
        setNameSearch("")
        setBrandSearch([])
        setBacklightingSearch([])
        setFeatureSearch([])
        setDpiSearch(0)


        const response = await axios.get(BASE_URL + "api/mouses")

        setMouses(response.data)
    }

    return(!loadingDone? (
        <React.Fragment>
           <div className='m-auto d-flex align-items-center h-100'>
                <img src={require('../images/superior.gif')} style={{'position' : 'absolute', 'margin': 'auto', 'top': '0', 'bottom' : '0' , 'right' : '0', 'left' : '0'}}/>
            </div> 
        </React.Fragment>
    ) : (
        <React.Fragment>
            <Container className="m-3">
                {/* advertisement/ carousel  */}

                <div className='mt-md-5 row'>
                    {/* Search */}

                    <div className='col-12 col-md-3 mb-5' id='collapseExample'>
                        <div className="">
                            <div className='input-box d-flex flex-row align-items-center'>
                                <Form.Control name='nameSearch' value={nameSearch} onChange={(e) => setNameSearch(e.target.value)}
                                    placeholder="Search for Mouses" className="py-2"
                                />
                            </div>
                            <Form.Select className='my-3' name="connectivitySearch" value={connectivitySearch}
                                onChange={(e) => setConnectivitySearch(e.target.value)}
                            >
                                <option value=''>-- Connectivity --</option>
                                <option value="wired">Wired</option>
                                <option value="wireless">Wireless</option>

                            </Form.Select>
                            <Form.Select className='my-3' name='gameTypeSearch' value ={gameTypeSearch}
                                onChange={(e) => setGameTypeSearch(e.target.value)}
                            >
                                <option value = ''>-- Game Type --</option>
                                {mouseGameTypes.map(g => (
                                    <option key={g[0]} value={g[0]}>{g[1]}</option>
                                ))}
                            </Form.Select>

                            <Accordion className='my-3'>
                                <Accordion.Item eventKey='0'>
                                    <Accordion.Header>Brand</Accordion.Header>
                                    <Accordion.Body>
                                        {mouseBrands.map(b => (
                                            <Form.Check key={b[0]} name='brand' checked={brandSearch.includes(b[0].toString())} value={b[0]} label={b[1]} onChange={updateBrand} />
                                        ))}
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey='1'>
                                    <Accordion.Header>Features</Accordion.Header>
                                    <Accordion.Body>
                                        {mouseFeatures.map(f => (
                                            <Form.Check key={f[0]} name='feature' checked={featureSearch.includes(f[0].toString())} value={f[0]} label={f[1]} onChange={updateFeature} />
                                        ))}
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey='2'>
                                    <Accordion.Header>Backlighting</Accordion.Header>
                                    <Accordion.Body>
                                        {mouseBacklightings.map(b => (
                                            <Form.Check key={b[0]} name='backlighting' value={b[0]} label={b[1]} checked={backlightingSearch.includes(b[0].toString())} onChange={updateBacklighting} />
                                        ))}
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey='3'>
                                    <Accordion.Header>Maximum DPI</Accordion.Header>
                                    <Accordion.Body>
                                        <RangeSlider value={dpiSearch} min={0} max={32000} step={4000} onChange={e => setDpiSearch(e.target.value)} />
                                    </Accordion.Body>

                                </Accordion.Item>
                            </Accordion>
                        </div>
                        <div className="my-4 d-grid gap-2">
                            <button className="btn btn-secondary rounded-0 p-2" onClick={search}>Search</button>
                            <button className="btn btn-warning rounded-0 p-2" onClick={searchReset}>Clear All Filters</button>
                        </div>
                    </div>





                    {/* Listings */}
                    <div className="mb-5 col-12 col-md-9">
                        <div className="pb-3 row row-cols-2 row-cols-md-2 row-cols-lg-3 g-3 g-md-4">
                            {mouses.map((m) => (
                                <div className='col' key={m.id}>
                                    <Card bg='light' style={{ 'height': "470px" }}>
                                        <div class="wrapper">
                                            <Link to={'/mouses/' + m.id} className="text-decoration-none text-reset">
                                                <div className='img'>
                                                    <img src={m.variants[0].image_url} className='card-img-top rounded-0' alt='mouse image' style={{ 'height': '270px' }} />
                                                </div>
                                                <div className='d-flex row justify-content-between my-3 mx-1'>
                                                    <div className='col-12 col-md-7'>
                                                        <p className='product-title mb-2'>{m.name}</p>
                                                    </div>
                                                    <div className='col-12 col-md-5'>
                                                        <p className="product-title text-md-end text-start"><span>SG$ {(m.cost / 100).toFixed(2)}</span></p>
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

                </div>



            </Container>
        </React.Fragment >
    ))
}
