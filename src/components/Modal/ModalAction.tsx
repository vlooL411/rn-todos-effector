import {IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type Props = {
  visible?: boolean;
  title: string;
  actions: {
    icon: IconDefinition;
    text: string;
    onPress: () => void;
    backgroundColor?: string;
  }[];
};
const ModalAction = ({title, visible, actions}: Props) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.container}>
        <View style={styles.modal}>
          {!!title && <Text style={styles.title}>{title}</Text>}
          {actions.map(({icon, onPress, text, backgroundColor}, i) => (
            <TouchableOpacity
              key={`${i}-${text}`}
              onPress={onPress}
              style={[styles.button, styles.buttonClose, {backgroundColor}]}>
              <FontAwesomeIcon icon={icon} size={15} />
              <Text
                style={styles.buttonText}
                numberOfLines={2}
                adjustsFontSizeToFit>
                {text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default ModalAction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modal: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    marginBottom: 25,
    textAlign: 'center',
    color: '#000',
  },
  button: {
    minWidth: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 5,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  buttonText: {marginLeft: 4, fontSize: 15, color: '#000'},
});
