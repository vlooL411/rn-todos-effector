import {faCheck, faXmark} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import ModalAction from '../Modal/ModalAction';

type Props = {title: string; onYes: () => void; onNot: () => void};
const ModalYesNot = ({title, onYes, onNot}: Props) => {
  return (
    <ModalAction
      title={title}
      actions={[
        {
          icon: faCheck,
          text: 'Yes',
          onPress: onYes,
          backgroundColor: '#c32626',
        },
        {
          icon: faXmark,
          text: 'Not',
          onPress: onNot,
        },
      ]}
    />
  );
};

export default ModalYesNot;
