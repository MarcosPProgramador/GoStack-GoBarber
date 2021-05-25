import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.button`
  font-weight: bold;

  background-color: ${props => props.theme.colors.orange};
  transition: background-color ease 500ms, box-shadow ease 1s 500ms;
  &:hover {
    box-shadow: 0 0 15px ${props => shade(0.2, props.theme.colors.background)};
    background-color: ${props => shade(0.2, props.theme.colors.orange)};
  }
  color: ${props => props.theme.colors.background};

  padding: 17px 16px;
  border-radius: 10px;

  margin-top: 24px;
`;
