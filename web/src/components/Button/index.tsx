import React, { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<TButtonProps> = ({ children, loading, ...rest }) => {
  return (
    <Container type="button" {...rest}>
      {loading ? 'Carregando...' : children}
    </Container>
  );
};

export default Button;
