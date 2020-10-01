import React from 'react'
import "./Home.css"
import Product from './Product'
function Home() {
    return (
        <div className="home">
            <div className="home__container">
                <img className="home__image" src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg">
                </img>
                <div className="home__row">
                    <Product id="123456" title="The Lean Startup: How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses Hardcover – Illustrated, 13" price={29.99} image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg" rating={5}/>
                    <Product id="789012" title="AmazonBasics MFi-Certified Lightning to USB A Cable for Apple iPhone and iPad - 6 Feet (1.8 Meters) - 2 -Pack - White" price={17.29} image="https://m.media-amazon.com/images/I/613Wvm+VqKL._AC_UY218_.jpg" rating={4}/>

                  
                </div>
                <div className="home__row">
                <Product id="343434" title="Creative Pebble 2.0 USB-Powered Desktop Speakers with Far-Field Drivers and Passive Radiators for Pcs and Laptops (Black)" price={19.99} image="https://m.media-amazon.com/images/I/31lrbOsJ2qL._AC_UY218_.jpg" rating={5}/>
                <Product id="111100" title="AmazonBasics Lightweight Durable Sports Duffel Gym and Overnight Travel Bag" price={40} image="https://m.media-amazon.com/images/I/A1CHoYEcU4L._AC_UL320_.jpg" rating={5}/>
                <Product id="676789" title="Xiaomi Mi Band 4 Fitness Tracker, Newest 0.95” Color AMOLED Display Bluetooth 5.0 Smart Bracelet Heart Rate Monitor 50 Meters Waterproof Bracelet with 135mAh Battery up to 20 Days" price={31} image="https://m.media-amazon.com/images/I/51ADqWUs7mL._AC_UY218_.jpg" rating={4}/>
                </div>
                <div className="home__row">
                <Product id="232323" title="28” LED HDTV by Continu.us | CT-2860 High Definition Television 720p 60Hz Eco-Friendly TV, Lightweight and Slim Design, VGA/HDMI/USB Inputs, VESA Wall Mount Compatible." price={169.89} image="https://m.media-amazon.com/images/I/61lWiyzjxmL._AC_UY218_.jpg" rating={3}
                />
                </div>
            </div>
        </div>
    )
}

export default Home
