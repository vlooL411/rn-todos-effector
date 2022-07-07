import {useEffect} from 'react';
import {Keyboard} from 'react-native';

type Props = {onBlur: () => void};
const useBlurKeyboardHide = ({onBlur}: Props) => {
  useEffect(() => {
    const keyboardHide = Keyboard.addListener('keyboardDidHide', () => {
      onBlur();
    });
    return () => keyboardHide.remove();
  }, [onBlur]);
};

export default useBlurKeyboardHide;
