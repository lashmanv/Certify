import React, { useState, useEffect } from 'react';
import {
  InfoContainer, 
  InfoWrapper, 
  InfoRow, 
  Column1, 
  TextWrapper, 
  TopLine, 
  Heading, 
  Subtitle, 
  BtnWrap,
  Column2,
  ImgWrap,
  Img, 
  ArrowForward, 
  ArrowRight, 
} from './InfoElements';
import { Button1 } from '../ButtonElements'; 

const InfoSection = ({
  id, 
  lightBg, 
  lightText, 
  lightTextDesc, 
  topLine, 
  headline, 
  description, 
  buttonLabel, 
  imgStart, 
  img, 
  alt, 
  primary, 
  darkText, 
}) => {

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

  function scroll() {
		const body = document.querySelector('#root');
	
		body.scrollIntoView({
			behavior: 'smooth'
		}, 500)
	}

  return (
    <>
      <InfoContainer id={id} lightBg={lightBg}>
        <InfoWrapper>
          <InfoRow imgStart={imgStart}>
            <Column1>
              <TextWrapper>
                <TopLine>{topLine}</TopLine>
                <Heading lightText={lightText}>{headline}</Heading>
                <Subtitle darkText={darkText}>{description}</Subtitle>
                <BtnWrap>
                  <Button1 onClick={scroll}>
                    Scroll to Top
                  </Button1>
                </BtnWrap>
              </TextWrapper>
            </Column1>
            <Column2>
              <ImgWrap>
                <Img src={img} alt={alt} />
              </ImgWrap>
            </Column2>
          </InfoRow>
        </InfoWrapper>
      </InfoContainer>
    </>
  );
};

export default InfoSection;
