import React from 'react'
import { TextInputProps } from 'react-native'
import { Container, TextInput } from './styles'
import { Feather } from '@expo/vector-icons';


interface InputProps extends TextInputProps {
  name: string
  icon: "mail" | "lock" | "user"
}
const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {
  return (
    <Container>
      <Feather name={icon} size={20} color='#666360' />
      <TextInput
        keyboardAppearance="dark"
        placeholderTextColor="#666360" {...rest} />
    </Container>
  )
}

export default Input