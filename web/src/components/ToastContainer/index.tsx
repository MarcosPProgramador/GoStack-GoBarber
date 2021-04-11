import React from 'react'
import { useTransition } from 'react-spring'
import { IToastMessage } from '../../contexts/ToastProvider'
import { Container } from './styles'
import Toast from './Toast'
interface IToastContainerProps {
  messages: IToastMessage[]
}
const ToastContainer: React.FC<IToastContainerProps> = ({ messages }) => {

  const transition = useTransition(
    messages,
    {
      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 }

    }
  );
  return (
    <Container>
      {transition((style, item) => (
        <Toast key={item.id} message={item} style={style} />
      ))}
    </Container>
  )
}

export default ToastContainer
