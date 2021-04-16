import { Platform } from 'react-native'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 20px ${Platform.OS === 'android' ? 80 : 40}px;
`
export const Title = styled.Text`
  margin: 34px 0 24px;
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
  color: #f0f8ff;
  
`
export const ForgotPassword = styled.TouchableOpacity`
  padding: 5px;

`

export const ForgotPasswordText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  color: #f0f8ff;
  font-size: 12px;
`
export const CreateAccountButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0; 
  background-color: #312e38; 
  border-top-width: 1px;
  border-color: #232129;

  flex-direction: row;
  justify-content: center;

  padding: 15px;

`
export const CreateAccountButtonText = styled.Text`
  margin-left: 10px;

  font-family: 'RobotoSlab-Medium';
  color: #ff9000;
`