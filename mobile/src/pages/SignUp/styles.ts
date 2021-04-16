import { Platform } from 'react-native'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 20px ${Platform.OS === 'android' ? 80 : 40}px;
`
export const Title = styled.Text`
  margin: 30px 0 8px;
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
  color: #f0f8ff;
  
`
export const BackToSignInButton = styled.TouchableOpacity`
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
export const BackToSignInButtonText = styled.Text`
  margin-left: 10px;

  font-family: 'RobotoSlab-Medium';
  color: #fff;
`