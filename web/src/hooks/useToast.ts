import { useContext } from 'react';
import { IToastContext, ToastContext } from '../contexts/ToastProvider';

function useToast(): IToastContext {
  const context = useContext(ToastContext);

  if (!context) throw new Error('useToast must be used within a ToastProvider');

  return context;
}

export default useToast;
