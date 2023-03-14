import styled from 'styled-components'; 
import { Link } from 'react-router-dom'; 

export const Button = styled(Link)`
  border-radius: 50px;
  background: ${({ primary }) => primary ? "#00A300" : '#010606'};
  white-space: nowrap; 
  padding: ${({ big }) => big ? '14px 48px' : '12px 30px'};
  font-size: ${({ fontBig }) => fontBig ? '20px' : '16px'};
  outline: none;
  border: none; 
  cursor: pointer; 
  display: flex;
  justify-content: center; 
  align-items: center; 
  transition: all .2s ease-in-out; 

  &:hover {
    transition: all .2s ease-ease-in-out; 
    background: ${({ primary }) => primary ? '#fff' : "#00A300"};
  }

  @media screen and (max-width: 768px) {
    margin-bottom: -50px;
  }
`;

export const Button1 = styled(Link)`
  border-radius: 50px;
  background: #00A300;
  padding: 12px 30px;
  font-size: 16px;
  color: black;
  cursor: pointer; 
  display: flex;
  justify-content: center; 
  align-items: center;

  &:hover {
    background: #010606;
    color: white};
  }

  @media screen and (max-width: 768px) {
    margin-left: 0px;
  }
`;

export const Button2 = styled(Link)`
  border-radius: 50px;
  background: ${({ primary }) => primary ? "#00A300" : '#010606'};
  white-space: nowrap; 
  padding: ${({ big }) => big ? '14px 48px' : '12px 30px'};
  font-size: ${({ fontBig }) => fontBig ? '20px' : '16px'};
  outline: none;
  border: none; 
  cursor: pointer; 
  display: flex;
  justify-content: center; 
  align-items: center; 
  transition: all .2s ease-in-out; 

  &:hover {
    transition: all .2s ease-ease-in-out; 
    background: #fff };
    color: #010606;
  }

`;