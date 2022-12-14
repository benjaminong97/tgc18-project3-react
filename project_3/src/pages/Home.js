import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
export default function Home() {

    const [loadingDone, setLoadingDone] = useState(false)

    useEffect(() => {
        setLoadingDone(true)
    })

    return (!loadingDone ? (
        <React.Fragment>
            <div className='m-auto d-flex align-items-center h-100'>
                <img src={require('../images/superior.gif')} style={{ 'position': 'absolute', 'margin': 'auto', 'top': '0', 'bottom': '0', 'right': '0', 'left': '0' }} />
            </div>
        </React.Fragment>
    ) :
        (
            <React.Fragment>
                <div id="home-bg">
                    <video autoPlay loop muted id='home-video'>
                        <source src={require('../images/razer_ad.mp4')} type='video/mp4' />
                    </video>
                </div>
                <div></div>
                <div id="callout" className='justify-content-center'>
                    <h1>Superior Sensors</h1>
                    <p>
                        We pride ourselves in offering
                        the best mice at affordable prices for all your gaming needs. 
                    </p>
                    <div>
                        <Link to={"/mouses"} className="btn btn-light btn-outline-dark mt-2 justify-content-center">Get me a mouse!</Link>
                    </div>
                </div>
            </React.Fragment>

        ))
}