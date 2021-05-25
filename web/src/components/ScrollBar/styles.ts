import styled from 'styled-components';

interface IScrollProps {
  colors: {
    primary: string;
    secondary: string;
  };
}
export const Container = styled.div<IScrollProps>`
  &::-webkit-scrollbar {
    width: 16px;
    height: 16px;
    background-color: ${props => props.colors.primary};
  }
  &::-webkit-scrollbar-thumb {
    border-right-width: 3px;
    border-left-width: 3px;
    border-style: solid;
    border-color: ${props => props.colors.primary};

    background-color: ${props => props.colors.secondary};
    border-radius: 50rem;
  }
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`;
