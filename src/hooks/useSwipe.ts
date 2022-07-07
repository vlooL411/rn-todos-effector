import {useMemo, useRef, useState} from 'react';
import {Animated, PanResponder} from 'react-native';

type Props = {
  offset: number;
  onLeft: () => void;
  onRight: () => void;
};
const useSwipe = (props: Props) => {
  const translateSwipe = useRef(new Animated.Value(0)).current;

  const [state] = useState(props);
  state.offset = props.offset;
  state.onLeft = props.onLeft;
  state.onRight = props.onRight;

  const panResponder = useMemo(() => {
    return PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 1,

      onPanResponderMove: (_, g) => {
        translateSwipe.setValue(g.dx);
      },
      onPanResponderEnd: (_, g) => {
        Animated.spring(translateSwipe, {
          toValue: 0,
          useNativeDriver: true,
        }).start();

        if (Math.abs(g.dx) < state.offset) return;
        if (g.dx < state.offset) state.onRight();
        else if (g.dx > -state.offset) state.onLeft();
      },
    });
  }, []);

  return {translateSwipe, panHandlers: panResponder.panHandlers};
};

export default useSwipe;
