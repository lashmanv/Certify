import styled from 'styled-components'; 

export const RegisterContainer = styled.div`
  height: auto;
  min-height: 100% !important;
  padding:100px;
  display: flex;
  margin-top: -50px;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  background: white;

  @media screen and (max-width: 768px) {
    height: fit-content;
  }

  @media screen and (max-width: 480px) {
    height: fit-content; 
  }
`;



export const RegisterCard = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
  align-items: center;
  border-radius: 40px; 
  width: fit-content;
  margin-top:10px;
  height: fit-content;
  box-shadow: 0 1px 3px rgba(0,0,0,.2);
  transition: all .2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    transition: all .2s ease-in-out;
    cursor: pointer;
  }
`;

export const RegisterC = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
  align-items: center;
  border-radius: 40px; 
  margin-top: 20px;
  width: 300px;
  height: 150px;
  box-shadow: 0 1px 3px rgba(0,0,0,.2);
  transition: all .2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    transition: all .2s ease-in-out;
    cursor: pointer;
  }
`;

export const RegisterIcon = styled.img`
  height: 250px;
  width: 250px;
`;

export const ReloadIcon = styled.img`
  height: 250px;
  width: 250px;
  margin-top:-75px;
  margin-bottom:-50px;
`;

export const RefreshIcon = styled.img`
  margin: 18px;
  height: 25px;
  width: 25px;

  &:hover {
    transform: scale(1.02);
    transition: all .2s ease-in-out;
    cursor: pointer;
  }
`;

export const RegisterH1 = styled.h1`
  font-size: 2.5rem;
  color: black;
  margin-top: 75px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const RegisterH2 = styled.h2`
  font-size: 1rem;
  margin-bottom: 20px;
  margin-top: 20px;
`;

export const RegisterH3 = styled.h3`
  color: black;
  font-size: 1rem;
  margin-top: 100px;
  margin-bottom: -50px
`;

export const RegisterH4 = styled.h4`
  color: black;
  font-size: 1rem;
  margin-bottom: 20px;
  margin-top: 20px;
`;

export const Register1 = styled.p`
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  background: green;
  width: 100%;
  height: 50px;
  border-radius: 00px 00px 40px 40px;
  box-shadow: 0 1px 3px rgba(0,0,0,.2);
  transition: all .2s ease-in-out;
  &:hover {
    transform: scale(1.02);
    transition: all .2s ease-in-out;
    cursor: pointer;
  }
`;

export const Register = styled.p`
  color: black;
  width: 100%;
  height: 50px;
  border-radius: 00px 00px 40px 40px;
  box-shadow: 0 1px 3px rgba(0,0,0,.2);
  }
`;


export const RegisterMany = styled.p`
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  background: green;
  width: 100px;
  height: 50px;
  margin-bottom: 20px;
  border-radius: 40px ;
  box-shadow: 0 1px 3px rgba(0,0,0,.2);
  transition: all .2s ease-in-out;
  &:hover {
    transform: scale(1.02);
    transition: all .2s ease-in-out;
    cursor: pointer;
  }
`;


export const RegisterWrapper = styled.div`
  display: grid; 
  z-index: 1; 
  height: 800px; 
  width: 100%;
  max-width: 1100px; 
  margin-right: auto;
  margin-left: auto; 
  padding: 0 24px;
  justify-content: center; 
`;

export const RegisterRow = styled.div`
  display: grid; 
  justify-content: flex-start; 
  grid-auto-columns: minmax(auto, 1lf);
  align-items: center; 
  grid-template-areas: ${({ imgStart }) => imgStart ? `'col2 col1'` : `'col1 col2'`};

  @media screen and (max-width: 768px) {
    grid-template-areas: ${({ imgStart} ) => imgStart ? `'col2' 'col1'` : `'col1 col1' 'col2 col2'`};   
  }
`;

export const Column1 = styled.div`
  margin-bottom: 15px;
  padding: 0 15px;
  grid-area: col1;
`;

export const Column2 = styled.div`
  margin-bottom: 15px;
  margin-left: -100px;
  grid-area: col2;
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
  margin-bottom: 16px; 
`;

export const Heading = styled.h1`
  margin-bottom: 24px;
  font-size: 48px;
  line-height: 1.1;
  font-weight: 600;
  color: ${({ lightText }) => lightText ? '#f7f8fa' : '#010606'};

  @media screen and (max-width: 768px) {
    font-size: 32px; 
  }
`;

export const Subtitle = styled.p`
  max-width: 440px;
  margin-bottom: 35px;
  font-size: 18px;
  line-height: 24px;
  color: ${({ darkText }) => darkText ? '#010606' : '#fff'};

  @media screen and (max-width: 768px) {
    align-items: center; 
    font-size: 16px; 
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
`;