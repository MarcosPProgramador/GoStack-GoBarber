import { shade } from 'polished'
import { animated } from 'react-spring'
import styled from 'styled-components'
import signUpBackground from '../../static/sign-up-background.png'

export const Container = styled.div`
  display: flex;
  align-items: stretch; 

  height: 100vh;
`
export const Content = styled(animated.div)`
  display: flex;
  
  align-items: center;
  justify-content: center;

  flex-direction: column;

  width: 100%;
  max-width: 600px; 
  > img {
    width: 100%;
    max-width: 230.03px;
    margin-bottom: 100px;
  }
  > h1 {
    font-size: 16px;
    margin-bottom: 24px;
  }
  form {
    width: 100%;
    max-width: 340px;
    
    display: flex;
    flex-direction: column;

    padding: 0 5px;
  
    > a {
      font-weight: lighter;
      text-align: center;
      margin-top: 24px;
    }
  }
  > a {
    color: ${props => props.theme.colors.text};
    margin-top: 80px;
    display: flex;
    line-height: 0;
    transition: 400ms ease color;
    align-items: center;
    &:hover {
        color:  ${props => shade(0.3, props.theme.colors.text)}; 
        > svg {
          stroke:  ${props => shade(0.3, props.theme.colors.text)}; 
        }
    }
    > svg {
      transition: 400ms ease  stroke;
      margin-right: 16px;
    }
  }


  @media screen and (max-width: 1037px){
    max-width: unset;
  }
  position:relative;
`
export const Background = styled.div`
  border-radius: 10px;
  position: relative;
  flex: 1;
  background: url(${signUpBackground}) no-repeat center;
  background-size: cover;
  
  @media screen and (max-width: 1037px){
    display: none;
  }
`