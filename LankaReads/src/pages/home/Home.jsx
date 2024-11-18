import React from 'react'
import Hero from '../../components/Herosection/Hero'
import './Home.css';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import Overview from '../../components/Overview/overview';
import Features from '../../components/Features/features';
import Recomended from '../../components/Recomand/recomended';
import Subscription from '../../components/Subscription/subscription';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/footer';
import ScrollTop from '../../components/Scroll-top/ScrollTop'
import Whatsapp from '../../components/Whatsapp/Whatsapp';

function Home() {
  return (
    <>
    
    <Header />
    <div className='home-page' >
      <div className='col-lg-12 d-flex flex-row align-items-center justify-content-between'>
        <div className='col-lg-4'>
        {/* <ProfileCard /> */}
        </div>
        <div className='col-lg-4'>
          
        </div>
      </div>
      <Hero />
    </div>
    <Features />
    <Recomended />
    <Overview />
    <Subscription />
    <ScrollTop/>
    <Whatsapp/>
    <Footer />
    </>
  )
}

export default Home