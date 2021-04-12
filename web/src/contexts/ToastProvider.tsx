import React, { createContext, useCallback, useState } from 'react';
import { v4 as uuid } from 'uuid';
import ToastContainer from '../components/ToastContainer';
export interface IToastContext {
  addToast: (message: Omit<IToastMessage, 'id'>) => void
  removeToast: (id: string) => void
}

export interface IToastMessage {
  id: string,
  type?: 'info' | 'success' | 'error'
  title: string,
  description?: string

}
export const ToastContext = createContext<IToastContext>({} as IToastContext)

const ToastProvider: React.FC = ({ children }) => {

  const [messages, setMessages] = useState<IToastMessage[]>([])

  const addToast = useCallback(
    ({ type, title, description }: Omit<IToastMessage, 'id'>) => {
      const id = uuid()

      const message = {
        id,
        type,
        title,
        description,
      }

      setMessages((messages) => [...messages, message])
    },
    [],
  )
  const removeToast = useCallback(
    (id: string) => {
      setMessages((messages) => messages.filter((message) => message.id !== id))
    },
    [],
  )


  return (
    <ToastContext.Provider value={{
      addToast,
      removeToast
    }}>{children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  )
}

export default ToastProvider
