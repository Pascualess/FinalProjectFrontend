import * as React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import '../css/Navbar.css';
import '../css/Hero.css';
import '../css/Footer.css';
import Hero from './Hero';


export interface ILoginProps {
}

export function Login (props: ILoginProps) {
  return (
    <div>
        <Navbar />
        <Hero />
        <Footer />
    </div>
  );
}
