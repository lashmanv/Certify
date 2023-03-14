import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 

import {
  HeroIcon,
  HeroContainer,
  HeroContent, 
  HeroH1, 
  HerorP, 
  HeroBtnWrapper, 
  ArrowForward, 
  ArrowRight, 
} from './HeroElements';
import {
  Button1, 
} from '../ButtonElements'; 

import icon from '../../images/icon1.png';

function toggleHome() {
  return (
    <>
    <Link to="/generate" />
    </>
  );
};

const HeroSection = () => {
  const [hover, setHover] = useState(false);
  const onHover = () => setHover(!hover);

  useEffect(() => {
		setTimeout(() => setHover(false), 1000);
	}, [hover]);

  useEffect(() => {
    const body = document.querySelector('#root');

    body.scrollIntoView({
        behavior: 'smooth'
    }, 500)

  }, []);

  return (
    <HeroContainer id="home">
        <HeroIcon src={icon} alt="icon" />
        <HeroContent>
        <HeroH1>Certify</HeroH1>
        <HerorP>
        A Decentralized Certificate Issuance and Verification System to create certificates that are Immutable, Cryptographically Secured, and have Zero Downtime.
        All powered by decentralized Ethereum Smart Contracts
        </HerorP>
        <HeroBtnWrapper>
						<Button1 to="generate" onClick={toggleHome} onMouseOver={onHover} >
              Get started {hover ? <ArrowForward /> : <ArrowRight />}
            </Button1>
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
