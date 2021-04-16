import React from 'react'
import { Image, KeyboardAvoidingView, Platform, View } from 'react-native'
import logo from '../../assets/logo.png'
import Input from '../../components/Input'
import Button from '../../components/Button'
import {
  Container,
  Title,
  BackToSignInButton,
  BackToSignInButtonText
} from './styles'
import { Feather } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/core'

const SignUp: React.FC = () => {
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
              <Title>Crie sua conta</Title>
            </View>

            <Input name="name" icon="user" placeholder="Nome" />
            <Input name="email" icon="mail" placeholder="E-mail" />
            <Input name="password" icon="lock" placeholder="Senha" />

            <Button onPress={() => { }} title="enviar">Cadastrar</Button>

          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <BackToSignInButton onPress={() => navigation.navigate('SignIn')}>
        <Feather name={'arrow-left'} size={20} color='#fff' />
        <BackToSignInButtonText>Voltar para logon</BackToSignInButtonText>
      </BackToSignInButton>

    </>
  )
}


export default SignUp