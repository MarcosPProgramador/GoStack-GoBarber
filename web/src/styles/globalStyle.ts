import { createGlobalStyle } from 'styled-components';
export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline: 0;
        appearance: none;
        box-sizing: border-box;        
    }    
    html, body, #app {
        width: 100%;
        min-height: 100vh;
        min-width: 260px;
        overflow: hidden;
      }
    #app {
      background-color: ${props => props.theme.colors.background};
      color: ${props => props.theme.colors.text};
      font-family: 'Roboto Slab', sans-serif;
    }
    h1,h2,h3,h4,h5,h6,strong {
      font-weight: 500;
      font-size: 16px;
    }
    ul {
      list-style: none;
    }
    a{
      text-decoration: none;
    }
    input::placeholder {
      font-weight: 400;
      color: ${props => props.theme.colors.hard}; 
    }
    
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      box-shadow: 0 0 0 30px ${props => props.theme.colors.inputs} inset !important;
    }
    input:-webkit-autofill {
      -webkit-text-fill-color: ${props => props.theme.colors.text} !important;
    }
    a, button, input {
      border-radius: 0;
      font-family: 'Roboto Slab', sans-serif;
      font-weight: 400;
      border: 0;
      background-color: transparent;
      color: ${props => props.theme.colors.text}; 
    }

    button {
      cursor: pointer;
      *{
        pointer-events: none;
      }
    }

`

