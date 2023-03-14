import styled from 'styled-components'; 
import { 
  MdArrowForward, 
  MdKeyboardArrowRight, 
} from 'react-icons/md'; 

export const HeroIcon = styled.img`
  width: 100%;
  max-width: 1200px;
  padding-left: 550px;
`;

export const HeroContainer = styled.div`
  background: white;
  display: flex;
  justify-content: center; 
  align-items: center;
  padding: 0 30px; 
  height: 700px; 
  position: relative; 
  z-index: 1;
`;

export const HeroContent = styled.div`
  z-index: 3;
  position: absolute; 
  display: flex;
  flex-direction: column; 
  width: 100%;
  max-width: 1200px;
`;

export const HeroH1 = styled.h1`
  color: #010606;
  font-size: 48px; 
  text-align: left; 
  margin-top: 50px;
  padding-left: 180px;

  @media screen and (max-width: 768px) {
    margin: 0px;
    font-size: 40px;
    text-align: center; 
    padding-left: 0px;
  }

  @media screen and (max-width: 480px) {
    margin: 0px;
    font-size: 32px; 
    text-align: center;
    padding-left: 0px;
  }
`;
export const HerorP = styled.div`
  margin-top: 24px; 
  color: #010606;
  font-size: 20px; 
  text-align: center; 
  max-width: 600px; 
  padding-right: 50px;

  @media screen and (max-width: 768px) {
    font-size: 20px; 
    padding: 20px;
    align-items: center;
  }

  @media screen and (max-width: 480px) {
    font-size: 18px; 
    padding: 20px;
  }


`;
export const HeroBtnWrapper = styled.div`
  display: flex;
  justify-content: flex-start; 
  padding-top: 50px;

  padding-left: 180px;

  @media screen and (max-width: 768px) {
    display: column;
    justify-content: center; 
    padding: 10px;
  }

  @media screen and (max-width: 480px) {
    display: column;
    justify-content: center; 
    padding: 10px;
  }
`;

export const ArrowForward = styled(MdArrowForward)`
  margin-left: 8px; 
  font-size: 20px; 
  `;
export const ArrowRight = styled(MdKeyboardArrowRight)`
  margin-left: 8px; 
  font-size: 20px; 
`;