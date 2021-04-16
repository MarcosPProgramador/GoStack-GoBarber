import React from 'react'
import { Image, KeyboardAvoidingView, Platform, View } from 'react-native'
import logo from '../../assets/logo.png'
import Input from '../../components/Input'
import Button from '../../components/Button'
import {
  Container, Title, ForgotPassword,
  ForgotPasswordText, CreateAccountButton,
  CreateAccountButtonText
} from './styles'
import { Feather } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/core'

const SignIn: React.FC = () => {
  const navigation = useNavigation()
  
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >


          <Container>
            <Image source={logo} />
            <View>
              <Title>Faça seu Logon</Title>
            </View>

            <Input name="email" icon="mail" placeholder="E-mail" />
            <Input name="password" icon="lock" placeholder="Senha" />

            <Button onPress={() => { }} title="enviar">Enviar</Button>
            <ForgotPassword>
              <Feather icon="" />
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>

          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Feather name={'log-in'} size={20} color='#ff9000' />
        <CreateAccountButtonText>Criar conta</CreateAccountButtonText>
      </CreateAccountButton>

    </>
  )
}


export default SignIn