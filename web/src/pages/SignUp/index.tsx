import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import React, { useCallback, useContext, useRef } from 'react'
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import { useTransition } from 'react-spring'
import { ThemeContext } from 'styled-components'
import * as Yup from 'yup'
import Button from '../../components/Button'
import Input from '../../components/Input'
import useToast from '../../hooks/useToast'
import api from '../../services/api'
import logo from '../../static/logo.svg'
import getValidationErrors from '../../utils/getValidationErrors'
import { Background, Container, Content } from './styles'

interface ISignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp = () => {

  const { colors } = useContext(ThemeContext)
  const { addToast } = useToast()
  const formRef = useRef<FormHandles>(null)
  const history = useHistory()

  const handleSubmit = useCallback(
    async (data: ISignUpFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório.'),
          email: Yup.string()
            .email('Este não é um E-mail válido.')
            .required('E-mail obrigatório.'),
          password: Yup.string().min(8, 'No mínimo 8 caracteres.')
        });

        await schema.validate(data, {
          abortEarly: false
        });
        console.log('ok');


        await api.post('/users', data)

        history.push('/')

        addToast({
          title: 'Cadastro realizado.',
          description: 'Você já pode fazer logon no GoBarber.',
          type: 'success',
        })

      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          return;
        }
        addToast({
          title: 'Erro ao realizar o cadastro.',
          description: 'Ocorreu um erro ao fazer cadastro.',
          type: 'error',
        })
      }
    },
    [history, addToast]
  );
  const transition = useTransition(true, {
    from: { right: '-100px', opacity: 0 },
    enter: { right: '0%', opacity: 1 },
  })
  return (
    <Container>
      <Background />
      {transition((style) => (
        <Content style={style}>
          <img src={logo} alt={'brand'} />

          <h1>Faça seu cadastro</h1>

          <Form ref={formRef} onSubmit={handleSubmit}>

            <Input icon={{
              component: FiUser,
              props: {
                size: 20,
                color: colors.hard
              }
            }} name='name' placeholder={'Nome'} />
            <Input icon={{
              component: FiMail,
              props: {
                size: 20,
                color: colors.hard
              }
            }} name='email' placeholder={'E-mail'} />
            <Input icon={{
              component: FiLock,
              props: {
                size: 20,
                color: colors.hard
              }
            }} name='password' type="password" placeholder={'Senha'} />

            <Button type="submit">Cadastrar</Button>

          </Form>
          <Link to="/">
            <FiArrowLeft size={20} color={colors.text} />
            Ir para logon
          </Link>
        </Content>
      ))}
    </Container>
  )
}

export default SignUp
