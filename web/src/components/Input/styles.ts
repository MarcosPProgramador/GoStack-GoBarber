import { shade } from 'polished'
import styled, { css } from 'styled-components'
import Tooltip from '../Tooltip'
interface IContainerProps {
  isFocused: boolean
  isFilled: boolean
  isErrored: boolean
}
export const Container = styled.div<IContainerProps>`
  display: flex;
  align-items: center;

  border: 2px solid ${props => props.theme.colors.inputs};
  background-color: ${props => props.theme.colors.inputs};

  border-radius: 10px;
  padding: 0 16px;

  ${props => props.isFocused && css`
    border-color: ${props.theme.colors.orange};
    > svg{
      color:${props.theme.colors.orange} !important; 
    }
  `}
  ${props => props.isFilled && css`
    > svg{
      color:${props.theme.colors.orange} !important; 
    }
  `}

  ${props => props.isErrored && css`
    border-color: ${props.theme.colors.error};
    > svg {
      color:${props.theme.colors.error} !important; 
    }
    > input {
      &::placeholder{
        color: ${props.theme.colors.error};
      }
    }
  `}
  & + div {
    margin-top: 8px; 
  }
  > input {
    flex: 1;
    
    padding: 17px 15px;
  }
`

export const Error = styled(Tooltip)`
cursor: pointer;
  color: ${props => shade(0.4, props.theme.colors.error)};
  font-weight: bold;
  font-size: 14px;
  font-family: 'Roboto';

  span {
    background-color: ${props => props.theme.colors.error};

    &::after {
      background-color: ${props => props.theme.colors.error}; 
    }
  }

`