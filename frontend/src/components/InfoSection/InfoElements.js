import styled from 'styled-components'; 

export const InfoContainer = styled.div`
  color: #fff;
  background: ${({ lightBg }) => lightBg ? "white" : '#010606'};
  margin-bottom: 50px;

  @media screen and (max-width: 768px) {
    padding-bottom: 100px;
  }
`;

export const InfoWrapper = styled.div`
  display: grid; 
  z-index: 1; 
  width: 100%;
  margin-right: auto;
  margin-left: auto; 
  padding: 0 24px;
  justify-content: center; 
`;

export const InfoRow = styled.div`
  display: grid; 
  grid-auto-columns: minmax(auto, 1lf);
  align-items: center; 
  grid-template-areas: ${({ imgStart }) => imgStart ? `'col2 col1'` : `'col1 col2'`};

  @media screen and (max-width: 768px) {
    grid-template-areas: ${({ imgStart} ) => imgStart ? `'col2' 'col1'` : `'col1 col1' 'col2 col2'`};
  }
`;

export const Column1 = styled.div`
  margin-bottom: 20px;
  margin-left: 25px;
  grid-area: col1;
`;

export const Column2 = styled.div`
  grid-area: col2;
`;

export const TextWrapper = styled.div`
  max-width: 540px;
`;

export const TopLine = styled.div`
  color: #01bf71;
  font-size: 16px;
  line-height: 16px;
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
  max-width: 500px;
  margin-right: 200px;
`;

export const Img = styled.img`
  width: 100%;
`;