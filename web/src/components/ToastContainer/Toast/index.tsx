import React, { useEffect } from 'react'
import { FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi'
import { IToastMessage } from '../../../contexts/ToastProvider'
import useToast from '../../../hooks/useToast'
import { Container, Title } from './styles'

interface IToastProps {
  message: IToastMessage,
  style: object
}
const icons = {
  info: <FiInfo size={20} />,
  success: <FiCheckCircle size={20} />,
  error: <FiAlertCircle size={20} />,
}

const Toast: React.FC<IToastProps> = ({ message, style }) => {
  const { removeToast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id)
    }, 6000);


    return () => {
      clearTimeout(timer)
    }
  }, [message.id, removeToast])


  return (
    <Container type={message.type} onClick={() => removeToast(message.id)} style={style}>
      <Title>

        {icons[message.type || 'info']}
        <strong>{message.title}</strong>

      </Title>
      {message.description && <p>{message.description}</p>}
      <button type='button'><FiXCircle size={20} /></button>
    </Container>
  )
}

export default Toast
