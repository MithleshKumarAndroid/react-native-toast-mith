import { DeviceEventEmitter } from 'react-native';

interface Props {
  type: 'success' | 'error';
  message?: string;
  title?: string;
}

const type = ({ type, message, title }: Props) => {
  switch (type) {
    case 'success':
      DeviceEventEmitter.emit('SHOW_TOAST', { message, type: 'success' });
      break;
    case 'error':
      DeviceEventEmitter.emit('SHOW_TOAST', { message, type: 'error' });
      break;
    default:
      break;
  }
};

// const type = {
//   success: (options: string) => {
//     DeviceEventEmitter.emit('SHOW_TOAST', { options, type: 'success' });
//   },
// };

export default type;
