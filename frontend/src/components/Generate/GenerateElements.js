import styled from 'styled-components'; 

export const InfoContainer = styled.div`
  color: #fff;
  background: '#fff';
  margin-bottom: ${({ primary }) => primary ? `100px` : `0px`}; 

  @media screen and (max-width: 768px) {
    padding: 100px 0;
  }
`;

export const Top = styled.div`
  margin-left: 500px;

  @media screen and (max-width: 768px) {
    padding: 100px 0;
  }
`;

export const InfoWrapper = styled.div`
  display: flex; 
  height: ${({ primary }) => primary ? `auto` : `800px`};  
  width: 100%;
  max-width: 1100px; 
  margin-right: auto;
  margin-left: auto; 
  margin-top: 50px; 
  padding: 0 24px;
  justify-content: flex; 
`;

export const InfoWrapper1 = styled.div`

`;

export const InfoRow = styled.div`
  display: grid; 
  justify-content: flex-start; 
  grid-auto-columns: minmax(auto, 1lf);
  align-items:  ${({ primary }) => primary ? `0px` : `center`}; 
  grid-template-areas: ${({ imgStart }) => imgStart ? `'col2 col1'` : `'col1 col2'`};

  @media screen and (max-width: 768px) {
    grid-template-areas: ${({ imgStart} ) => imgStart ? `'col2' 'col1'` : `'col1 col1' 'col2 col2'`};   
  }
`;

export const InfoRow1 = styled.div`
  display: grid; 
  justify-content: flex-start; 
  grid-auto-columns: minmax(auto, 1lf);
  align-items:  ${({ primary }) => primary ? `0px` : `center`}; 
  grid-template-areas: ${({ imgStart }) => imgStart ? `'col2 col1'` : `'col1 col2'`};

  @media screen and (max-width: 768px) {
    grid-template-areas: ${({ imgStart} ) => imgStart ? `'col2' 'col1'` : `'col1 col1' 'col2 col2'`};   
  }
`;

export const Column1 = styled.div`
  margin-top:  ${({ primary }) => primary ? `0px` : `0px`};
  margin-bottom:  ${({ primary }) => primary ? `0px` : `15px`};
  margin-left:  ${({ primary }) => primary ? `100px` : `0px`};
  margin-right:  ${({ primary }) => primary ? `0px` : `0px`};
  padding: 0 15px;
  grid-area: col1;

  @media screen and (max-width: 768px) {
    margin: 0px;  
    margin-top: -50px; 
  }
`;

export const Column2 = styled.div`
  margin-bottom: ${({ primary }) => primary ? `0px` : `15px`};
  margin-left: ${({ primary }) => primary ? `0px` : `0px`};
  margin-right: ${({ primary }) => primary ? `550px` : `0px`};
  grid-area: col2;

  @media screen and (max-width: 768px) {
    margin: 0px;   
    margin-top: -250px;
    margin-left: 50px;
    align-items: center; 

    margin:  ${({ primary }) => primary ? `0px` : `0px`};
    margin-top: ${({ primary }) => primary ? `0px` : `-200px`};
    margin-left: ${({ primary }) => primary ? `0px` : `-45px`};

  }
`;

export const Column3 = styled.div`
  margin-bottom: 15px;
  margin-top: -10px;
  margin-left: 300px;
  grid-area: col2;

  @media screen and (max-width: 768px) {
    margin: 0px;   
    margin-top: -250px;
    margin-left: 50px;
    align-items: center; 

    margin:  ${({ primary }) => primary ? `0px` : `0px`};
    margin-top: ${({ primary }) => primary ? `0px` : `-200px`};
    margin-left: ${({ primary }) => primary ? `0px` : `-45px`};

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
  margin-top: ${({ primary }) => primary ? `150px` : `16px`};
  margin-bottom: ${({ primary }) => primary ? `15px` : `16px`};

  @media screen and (max-width: 768px) {
    font-size: ${({ primary }) => primary ? `14px` : `16px`};
    margin: ${({ primary }) => primary ? `0px` : `10px`};
  }
`;

export const Heading = styled.h1`
  margin-top: ${({ primary }) => primary ? `20px` : `16px`};
  margin-bottom: ${({ primary }) => primary ? `20px` : `24px`};
  font-size: 48px;
  line-height: 1.1;
  font-weight: 600;
  color: ${({ lightText }) => lightText ? '#f7f8fa' : '#010606'};

  @media screen and (max-width: 768px) {
    font-size: 32px; 
    margin-bottom: ${({ primary }) => primary ? `10px` : `16px`};
  }
`;

export const Subtitle = styled.p`
  max-width: 440px;
  margin-bottom: ${({ primary }) => primary ? `10px` : `35px`};
  font-size: 18px;
  line-height: 24px;
  color: ${({ darkText }) => darkText ? '#010606' : '#fff'};

  @media screen and (max-width: 768px) {
    align-content: center; 
    font-size: 16px; 
    margin-bottom: ${({ primary }) => primary ? `0px` : `35px`};

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
