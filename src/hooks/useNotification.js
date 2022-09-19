import { useDispatch } from 'react-redux';
import { NotificationActions } from '../features/notifications/notificationSlice';

export const useNotification = () => {
  const dispatch = useDispatch()

  const displayNotification = notification => {
    dispatch(NotificationActions.addNotification(notification))
  }

  const clearNotification = () => {
    dispatch(NotificationActions.clearNotification())
  }

  return {
    displayNotification,
    clearNotification
  }
}
