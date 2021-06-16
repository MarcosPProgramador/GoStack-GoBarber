import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { shade } from 'polished';
import React, { useCallback, useRef, useState } from 'react';
import { FiArrowLeft, FiLock, FiMail, FiCamera } from 'react-icons/all';
import { Link } from 'react-router-dom';
import { useTransition } from 'react-spring';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';
import Button from '../../components/Button';
import Input from '../../components/Input';
import ScrollBar from '../../components/ScrollBar';
import useAuth from '../../hooks/useAuth';
import useToast from '../../hooks/useToast';
import defaultAvatarImg from '../../static/default-avatar.jpg';
import getValidationErrors from '../../utils/getValidationErrors';
import {
  Container,
  Content,
  Header,
  InputAvatar,
  CameraContainer,
  Passwords,
} from './styles';

export interface IProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}
const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  const { user } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: IProfileFormData) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório.'),
          email: Yup.string()
            .required('E-mail obrigatório.')
            .email('Este não é um E-mail válido.'),

          old_password: Yup.string().when({
            is: (input_value: string) => !!input_value,
            then: Yup.string().min(8, 'O mínimo de caracteres é 8'),
          }),
          password: Yup.string().when('old_password', {
            is: (input_value: string) => !!input_value,
            then: Yup.string().min(8, 'O mínimo de caracteres é 8'),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (input_value: string) => !!input_value,
              then: Yup.string().required('Campo obrigatório'),
            })
            .oneOf(
              [Yup.ref('password'), null],
              'Confirmação de senha incorreta',
            ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        addToast({
          title: 'Perfil atualizado com sucesso.',
          type: 'success',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          title: 'Erro ao realizar a atualização do perfil.',
          description:
            'Ocorreu um erro ao fazer atualização do seu perfil, cheque as credenciais.',
          type: 'error',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  const transition = useTransition(true, {
    from: { top: '-100px', opacity: 0 },
    enter: { top: '0', opacity: 1 },
  });

  return (
    <ScrollBar
      colors={{
        primary: colors.background,
        secondary: shade(0.3, colors.background),
      }}
    >
      <Container>
        <Header>
          <Link to="/dashboard">
            <FiArrowLeft size={30} color={colors.sub} />
          </Link>
        </Header>
        {transition(style => (
          <Content style={style}>
            <h1>Meu perfil</h1>

            <Form
              ref={formRef}
              initialData={{
                name: user.name,
                email: user.email,
              }}
              onSubmit={handleSubmit}
            >
              <InputAvatar type="button">
                <CameraContainer>
                  <FiCamera color={colors.background} size={23} />
                </CameraContainer>
                <img src={defaultAvatarImg} alt="avatar" />
              </InputAvatar>
              <Input
                icon={{
                  component: FiMail,
                  props: {
                    size: 20,
                    color: colors.hard,
                  },
                }}
                name="name"
                placeholder="Nome completo"
              />
              <Input
                icon={{
                  component: FiMail,
                  props: {
                    size: 20,
                    color: colors.hard,
                  },
                }}
                name="email"
                placeholder="E-mail"
              />
              <Passwords>
                <Input
                  icon={{
                    component: FiLock,
                    props: {
                      size: 20,
                      color: colors.hard,
                    },
                  }}
                  name="old_password"
                  type="password"
                  placeholder="Senha atual"
                />
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
              </Passwords>

              <Button loading={loading} type="submit">
                Atualizar perfil
              </Button>
            </Form>
          </Content>
        ))}
      </Container>
    </ScrollBar>
  );
};

export default Profile;
