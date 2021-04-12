import { shade } from 'polished'
import { animated } from 'react-spring'
import styled from 'styled-components'
import signInBackground from '../../static/sign-in-background.png'

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
  max-width: 700px; 
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
      transition: 500ms ease color;
      &:hover {
        color:  ${props => shade(0.2, props.theme.colors.text)}; 
      }
    }
  }
  > a {
    color: ${props => props.theme.colors.orange};
    margin-top: 80px;
    display: flex;
    line-height: 0;
    align-items: center;
    transition: 500ms ease color;
    padding-bottom: 20px;
    &:hover {
        color:  ${props => shade(0.2, props.theme.colors.orange)}; 
        > svg {
          stroke:  ${props => shade(0.2, props.theme.colors.orange)}; 
        }
    }
    > svg {
      transition: 500ms ease  stroke;
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
  background: url(${signInBackground}) no-repeat center;
  background-size: cover;
  
  @media screen and (max-width: 1037px){
    display: none;
  }
`