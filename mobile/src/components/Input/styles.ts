import { Feather } from '@expo/vector-icons';
import styled, { css } from 'styled-components/native';

interface InputProps {
  isFocused: boolean;
  isErrored: boolean;
  isFilled: boolean;
}
export const Container = styled.View<InputProps>`
  width: 100%;
  height: 55px;

  background: #232129;
  border-radius: 10px;
  margin-bottom: 8px;

  flex-direction: row;
  align-items: center;
  padding: 0 16px;

  border-width: 2px;
  border-color: #232129;

  ${props =>
    props.isErrored &&
    css`
      border-color: #f33333;
    `}
  ${props =>
    props.isFocused &&
    css`
      border-color: #ff9000;
    `}
`;
export const TextInput = styled.TextInput`
  padding: 0 16px;
  height: 100%;
  width: 100%;
  color: #f0f8ff;
  font-family: 'RobotoSlab-Regular';
`;
/* eslint-disable-next-line prettier/prettier */
export const Icon = styled(Feather) <InputProps>`
  color: #666360;
  ${props =>
    props.isErrored &&
    css`
      color: #f33333;
    `}
  ${props =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}
    ${props =>
    props.isFocused &&
    css`
      color: #ff9000;
    `}
`;
