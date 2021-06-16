import { shade } from 'polished';
import { animated } from 'react-spring';
import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
`;
export const Header = styled.div`
  padding: 0 3%;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.colors.medium};
  height: 144px;
`;
export const Content = styled(animated.div)`
  padding-top: 100px;
  display: flex;
  position: relative;

  align-items: center;
  justify-content: center;

  flex-direction: column;

  width: 100%;

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
        color: ${props => shade(0.2, props.theme.colors.text)};
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
      color: ${props => shade(0.2, props.theme.colors.orange)};
      > svg {
        stroke: ${props => shade(0.2, props.theme.colors.orange)};
      }
    }
    > svg {
      transition: 500ms ease stroke;
      margin-right: 16px;
    }
  }

  @media screen and (max-width: 1037px) {
    max-width: unset;
  }
  position: relative;
`;
export const InputAvatar = styled.button`
  height: 180px;
  position: absolute;
  top: -90px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 180px;
  border-radius: 50%;
  &:hover {
    &::before {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      position: absolute;
      z-index: 1;
      font-weight: bold;
      content: 'Alterar foto';
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    }
    img {
      transform: scale(1.05);
    }
  }
  img {
    transition: 500ms transform;
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }
`;
export const CameraContainer = styled.div`
  position: absolute;
  border-radius: 50%;
  z-index: 2;
  right: 5px;
  bottom: 5px;
  width: 50px;
  height: 50px;
  background-color: ${props => props.theme.colors.orange};
  display: flex;
  svg {
    margin: auto;
  }
`;
export const Passwords = styled.div`
  padding-top: 10px;
`;
