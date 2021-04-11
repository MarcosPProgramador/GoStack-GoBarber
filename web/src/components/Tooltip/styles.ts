import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  span {
    border-radius: 4px;
    padding: 8px 10px;

   
    opacity: 0;
    transition: opacity 400ms;
    visibility: hidden;
 

    text-align: center;
    width: 160px;
    position: absolute;

    bottom: calc(100% + 15px);
    left: calc(50%);
    transform: translateX(-50%);

    &::after {
      content: '';
      position: absolute;
      
      left: 50%;
      transform: rotateZ(45deg) translateX(-50%);
      bottom: -8px;

      width: 10px;
      height: 10px;
    }
  }
  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`
