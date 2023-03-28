import styled from 'styled-components'; 

export const RegisterContainer = styled.div`
  color: #fff;
  background: '#fff';
  margin-bottom: 0px; 

  @media screen and (max-width: 768px) {
    padding: 100px 0;
  }
`;

export const RegisterWrapper = styled.div`
  height: 850px;  
  width: 100%;
  max-width: 1100px; 
  margin-right: auto;
  margin-left: auto; 
  margin-top: 0px;
  padding: 0 24px;

  display: flex;
  justify-content: center;
`;

export const ReloadIcon = styled.img`
  height: 250px;
  width: 250px;
  margin-top:-75px;
  margin-bottom:-50px;
`;

export const RefreshIcon = styled.img`
  margin-left: 18px;
  margin-top: 10px;
  height: 25px;
  width: 25px;

  &:hover {
    transform: scale(1.02);
    transition: all .2s ease-in-out;
    cursor: pointer;
  }

  
  @media screen and (max-width: 768px) {
    margin-left: 8px;
    margin-top: 5px;
  }
`;

export const RegisterH1 = styled.h1`
  font-size: 2.1rem;
  color: black;
  margin-top: 0px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const RegisterH2 = styled.h2`
  font-size: 1rem;
  margin-bottom: 20px;
  margin-top: 20px;
`;

export const RegisterRow = styled.div`
  display: grid; 
  justify-content: center;
  grid-auto-columns: minmax(auto, 1lf);
  align-items: center; 
  grid-template-areas: ${({ imgStart }) => imgStart ? `'col2 col1'` : `'col1 col2'`};

  @media screen and (max-width: 768px) {
    grid-template-areas: ${({ imgStart} ) => imgStart ? `'col2' 'col1'` : `'col1 col1' 'col2 col2'`};   
  }
`;


export const Column1 = styled.div`
  margin-top: 0px;
  margin-bottom: 15px;
  margin-left: 0px;
  margin-right: 0px;
  padding: 0 15px;
  grid-area: col1;

  justify-content: center;

  @media screen and (max-width: 768px) {
    margin: 0px;  
    margin-top: 10px; 
  }
`;

export const Column2 = styled.div`
  margin-bottom:15px;
  margin-left:0px;
  margin-right: 0px;
  grid-area: col2;

  @media screen and (max-width: 768px) {
    margin: 0px;   
    margin-top: -250px;
    margin-left: 50px;
    align-items: center; 

    margin: 0px;
    margin-top:0px;
    margin-left:-45px;

  }
`;

export const TextWrapper = styled.div`
  max-width: 540px;

  @media screen and (max-width: 768px) {
    font-size: 20px; 
    padding: 20px;
    align-items: center;
  }
`;

export const TopLine = styled.div`
  color: #01bf71;
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  letter-spacing: 1.4px;
  text-transform: uppercase; 
  margin-top: 16px;
  margin-bottom: 16px;

  display: grid; 
  justify-content: center;

  @media screen and (max-width: 768px) {
    font-size: 16px;

  }
`;

export const Heading = styled.h1`
  margin-top: 16px;
  margin-bottom: 24px;
  font-size: 48px;
  line-height: 1.1;
  font-weight: 600;
  color: ${({ lightText }) => lightText ? '#f7f8fa' : '#010606'};

  @media screen and (max-width: 768px) {
    font-size: 32px; 
    margin-bottom: 16px;
  }
`;

export const Subtitle = styled.p`
  max-width: 440px;
  margin-bottom: 35px;
  font-size: 18px;
  line-height: 24px;
  color: ${({ darkText }) => darkText ? '#010606' : '#fff'};

  @media screen and (max-width: 768px) {
    align-content: center; 
    font-size: 16px; 
    margin-bottom:35px;

  }
`;

export const BtnWrap = styled.div`
  display: flex;
  justify-content: flex-start; 
`;

export const ImgWrap = styled.div`
  width: 100%;
  margin-left:50px;

  @media screen and (max-width: 768px) {
    margin-left:0px;
  }
`;

export const Img = styled.img`
  width: 100%;

  @media screen and (max-width: 768px) {
    width: 300px;
    margin-left:135px;
    margin-top:50px;
  }
`;
