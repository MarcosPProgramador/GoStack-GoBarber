import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { shade } from 'polished'
import React, { useCallback, useRef } from 'react'
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import { useTransition } from 'react-spring'
import { useTheme } from 'styled-components'
import * as Yup from 'yup'
import Button from '../../components/Button'
import Input from '../../components/Input'
import ScrollBar from '../../components/ScrollBar'
import useAuth from '../../hooks/useAuth'
import useToast from '../../hooks/useToast'
import logo from '../../static/logo.svg'
import getValidationErrors from '../../utils/getValidationErrors'
import { Background, Container, Content } from './styles'

export interface ISignInFormData {
  email: string
  password: string
}
const SignIn = () => {
  const formRef = useRef<FormHandles>(null)

  const { colors } = useTheme()
  const { signIn } = useAuth();
  const { addToast } = useToast()

  const history = useHistory()

  const handleSubmit = useCallback(async ({
    email,
    password
  }: ISignInFormData) => {

    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório.').email('Este não é um E-mail válido.'),
        password: Yup.string().min(8, 'No mínimo 8 caracteres')
      })

      await schema.validate({
        email,
        password
      }, {
        abortEarly: false
      })

      await signIn({
        email,
        password
      })
      history.push('/dashboard')

      addToast({
        title: 'Logon realizado com sucesso.',
        description: 'Você já pode usar a plataforma normalmente.',
        type: 'success',
      })

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)

        formRef.current?.setErrors(errors)

        return
      }

      addToast({
        title: 'Erro ao realizar a autenticação.',
        description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        type: 'error',
      })
    }
  }, [addToast, signIn, history])

  const transition = useTransition(true, {
    from: { left: '-100px', opacity: 0 },
    enter: { left: '0%', opacity: 1 },
  })

  return (
    <ScrollBar colors={{
      primary: colors.background,
      secondary: shade(0.3, colors.background)
    }}>
      <Container>
        {transition((style, item) => (
          <Content style={style}>
            <img src={logo} alt='brand' />

            <h1>Faça seu logon</h1>

            <Form ref={formRef} onSubmit={handleSubmit}>

              <Input icon={{
                component: FiMail,
                props: {
                  size: 20,
                  color: colors.hard
                }
              }} name='email' placeholder='E-mail' />
              <Input icon={{
                component: FiLock,
                props: {
                  size: 20,
                  color: colors.hard
                }
              }} name='password' type="password" placeholder='Senha' />

              <Button type="submit">Enviar</Button>

              <Link to="/forgot">Esqueci minha senha</Link>
            </Form>
            <Link to="/signup">
              <FiLogIn size={20} color={colors.orange} />
              Criar conta
            </Link>
          </Content>
        ))}
        <Background />
      </Container >

    </ScrollBar>
  )
}

export default SignIn
