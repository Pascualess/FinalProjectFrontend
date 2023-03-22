import * as React from 'react';
import { Authentication } from './Authentication';
import Footer from './Footer';
import Navbar from './Navbar';
import './Navbar.css';
import './Hero.css';
import './Footer.css';
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
