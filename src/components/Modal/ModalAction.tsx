import {IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type Props = {
  visible?: boolean;
  title: string;
  actions: {
    icon: IconDefinition;
    title: string;
    onPress: () => void;
    backgroundColor?: string;
  }[];
};
const ModalAction = ({title, visible, actions}: Props) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {!!title && <Text style={styles.title}>{title}</Text>}
          {actions.map(({icon, onPress, title, backgroundColor}, i) => (
            <TouchableOpacity
              key={`${i}-${title}`}
              onPress={onPress}
              style={[styles.button, styles.buttonClose, {backgroundColor}]}>
              <FontAwesomeIcon icon={icon} size={15} />
              <Text
                style={styles.actionText}
                numberOfLines={2}
                adjustsFontSizeToFit>
                {title}
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
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
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  title: {
    marginBottom: 25,
    textAlign: 'center',
    color: '#000',
  },
  container: {
    width: 150,
    height: 100,
    right: 0,
    top: '100%',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'gray',
  },
  action: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {marginLeft: 4, fontSize: 15, color: '#000'},
});
