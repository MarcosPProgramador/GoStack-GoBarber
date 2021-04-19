import React from 'react';
import { ButtonProps as ReactNativeButtonProps } from 'react-native';
import { Container, ButtonText } from './styles';

const Button: React.FC<ReactNativeButtonProps> = ({ children, onPress, ...rest }) => {
  return (
    <Container onPress={onPress} {...rest}>
      <ButtonText>{children}</ButtonText>
    </Container>
  );
};

export default Button;
