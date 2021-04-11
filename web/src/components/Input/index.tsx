import { useField } from '@unform/core'
import React, { ComponentType, InputHTMLAttributes, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { FiAlertCircle } from 'react-icons/fi'
import { IconBaseProps } from 'react-icons/lib'
import { ThemeContext } from 'styled-components'
import { Container, Error } from './styles'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon: {
    component: ComponentType<IconBaseProps>;
    props: IconBaseProps
  }

}
const Input: React.FC<IInputProps> = ({
  name,
  icon: {
    component: Component,
    props
  },
  ...rest
}) => {
  const { colors } = useContext(ThemeContext)

  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    });
  }, [fieldName, registerField]);


  return (
    <Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled}>
      {Component && <Component {...props} />}
      <input
        type="text"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
      {error &&
        (
          <Error title={error} >
            <FiAlertCircle size={20} color={colors.error} />
          </Error>
        )
      }
    </Container>
  )
}

export default Input;
