import React, { ButtonHTMLAttributes } from 'react'
import { Container } from './styles'

type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<TButtonProps> = ({ children, ...rest }) => {
  return (
    <Container type="button" {...rest}>
      {children}
    </Container>
  )
}

export default Button
