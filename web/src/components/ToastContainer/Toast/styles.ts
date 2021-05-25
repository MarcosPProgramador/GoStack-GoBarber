import { tint, transparentize } from 'polished';
import { animated } from 'react-spring';
import styled, { css } from 'styled-components';

interface IContainerProps {
  type?: 'success' | 'info' | 'error';
}

const containerTypeVariations = {
  info: css`
    color: ${props => transparentize(0.4, props.theme.colors.orange)};
    border-color: ${props => tint(0.05, props.theme.colors.orange)};
    > button svg {
      stroke: ${props => tint(0.4, props.theme.colors.orange)};
    }
  `,
  success: css`
    color: ${props => tint(0.1, props.theme.colors.success)};
    border-color: ${props => tint(0.3, props.theme.colors.success)};
    > button svg {
      stroke: ${props => tint(0.4, props.theme.colors.success)};
    }
  `,
  error: css`
    color: ${props => tint(0.1, props.theme.colors.error)};
    border-color: ${props => tint(0.3, props.theme.colors.error)};
    > button svg {
      stroke: ${props => tint(0.4, props.theme.colors.error)};
    }
  `,
};

export const Container = styled(animated.div)<IContainerProps>`
  position: relative;

  font-family: 'roboto';
  font-weight: bold;
  max-width: 400px;
  margin: 10px 0;
  border: 2px solid transparent;
  background-color: ${props =>
    transparentize(0.05, props.theme.colors.background)};
  cursor: pointer;
  padding: 10px 60px 10px 20px;
  border-radius: 11px;

  box-shadow: 2px 2px 8px
    ${props => transparentize(0.6, props.theme.colors.background)};

  backdrop-filter: blur(10px);

  ${props => containerTypeVariations[props.type || 'info']}

  > p {
    font-size: 12px;
  }
  > button {
    position: absolute;
    top: 10px;
    right: 20px;
  }
`;
export const Title = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  > strong {
    font-weight: bold;
  }
  > svg {
    flex-shrink: 0;
    margin-right: 10px;
  }
`;
