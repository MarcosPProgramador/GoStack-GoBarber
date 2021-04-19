import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useCallback, useRef } from 'react';
import { Image, KeyboardAvoidingView, Platform, View, TextInput, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Yup from 'yup';
import logo from '../../assets/logo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';
import useAuth from '../../hooks/useAuth';
import getValidationErrors from '../../utils/getValidationErrors';
import {
  Container,
  CreateAccountButton,
  CreateAccountButtonText,
  ForgotPassword,
  ForgotPasswordText,
  Title,
} from './styles';

interface SignInFormData {
  email: string;
  password: string;
}
const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const { signIn } = useAuth();

  const formRef = useRef<FormHandles>(null);
  const inputPasswordRef = useRef<TextInput>(null);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório!')
            .email('Este e-mail é inválido.')
            .max(50, 'O mínimo de caracteres é 50'),
          password: Yup.string()
            .min(8, 'O mínimo de caracteres é 8')
            .max(60, 'O mínimo de caracteres é 60'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        Alert.alert('Sucesso ao realizar login', 'Você agora tem acesso a plataforma!');
        // navigation.navigate('Dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }
        Alert.alert('Erro no logon', 'Ocorreu um erro ao realizar o logon.');
      }
    },
    [signIn]
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1 }}>
          <Container>
            <Image source={logo} />
            <View>
              <Title>Faça seu Logon</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSubmit} style={{ width: '100%' }}>
              <Input
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  inputPasswordRef.current?.focus();
                }}
              />
              <Input
                ref={inputPasswordRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
                title="enviar">
                Enviar
              </Button>
            </Form>
            <ForgotPassword>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Feather name="log-in" size={20} color="#ff9000" />
        <CreateAccountButtonText>Criar conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
};

export default SignIn;
