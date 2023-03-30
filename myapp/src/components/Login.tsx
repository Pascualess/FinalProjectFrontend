import * as React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import '../css/Navbar.css';
import '../css/Hero.css';
import '../css/Footer.css';
import Hero from './Hero';
import { useEffect } from 'react';
import { getNearbySearch } from '../services/nearbySearchService';


export interface ILoginProps {
}

export function Login (props: ILoginProps) {
  // useEffect(() => {
  //   getNearbySearch(42.4985242, -83.457077, 1000).then((res) => {
  //     console.log(res);
  //   })
  // }, []); 

  return (
    <div>
        <Navbar />
        <Hero />
        <Footer />
    </div>
  );
}
