import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { shade } from 'polished';
import React, { useCallback, useRef, useState } from 'react';
import { FiArrowLeft, FiLock } from 'react-icons/fi';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useTransition } from 'react-spring';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';
import Button from '../../components/Button';
import Input from '../../components/Input';
import ScrollBar from '../../components/ScrollBar';
import useToast from '../../hooks/useToast';
import api from '../../services/api';
import logo from '../../static/logo.svg';
import getValidationErrors from '../../utils/getValidationErrors';
import { Background, Container, Content } from './styles';

export interface IResetPasswordFormData {
  password: string;
  password_confirmation: string;
}
const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  const { addToast } = useToast();

  const history = useHistory();
  const location = useLocation();

  const handleSubmit = useCallback(
    async ({ password, password_confirmation }: IResetPasswordFormData) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().min(8, 'No mínimo 8 caracteres'),
          password_confirmation: Yup.string()
            .min(8, 'No mínimo 8 caracteres')
            .oneOf([Yup.ref('password'), null], 'A senha não combina'),
        });

        await schema.validate(
          {
            password,
            password_confirmation,
          },
          {
            abortEarly: false,
          },
        );
        const [, token] = location.search.split('?token=');

        await api.post('/password/reset', {
          token,
          password,
          password_confirmation,
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          title: 'Erro ao realizar a autenticação.',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
          type: 'error',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, history],
  );

  const transition = useTransition(true, {
    from: { left: '-100px', opacity: 0 },
    enter: { left: '0%', opacity: 1 },
  });

  return (
    <ScrollBar
      colors={{
        primary: colors.background,
        secondary: shade(0.3, colors.background),
      }}
    >
      <Container>
        {transition(style => (
          <Content style={style}>
            <img src={logo} alt="brand" />

            <h1>Redefinir senha</h1>

            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                icon={{
                  component: FiLock,
                  props: {
                    size: 20,
                    color: colors.hard,
                  },
                }}
                name="password"
                type="password"
                placeholder="Nova senha"
              />
              <Input
                icon={{
                  component: FiLock,
                  props: {
                    size: 20,
                    color: colors.hard,
                  },
                }}
                name="password_confirmation"
                type="password"
                placeholder="Confirmar senha"
              />

              <Button loading={loading} type="submit">
                Alterar senha
              </Button>
            </Form>
            <Link to="/">
              <FiArrowLeft size={20} color={colors.orange} />
              Ir para logon
            </Link>
          </Content>
        ))}
        <Background />
      </Container>
    </ScrollBar>
  );
};

export default ResetPassword;
