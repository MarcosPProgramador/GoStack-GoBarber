import React from 'react';
import { ButtonProps } from 'react-native';
import { Container, ButtonText } from './styles';

const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <Container>
      <ButtonText>{children}</ButtonText>
    </Container>
  );
};

export default Button;
