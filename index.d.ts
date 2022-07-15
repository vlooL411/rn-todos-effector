import {ImageRequireSource} from 'react-native';

declare module '*.png' {
  const content: ImageRequireSource;
  export default content;
}

declare module '*.jpeg' {
  const content: ImageRequireSource;
  export default content;
}

declare module '*.jpg' {
  const content: ImageRequireSource;
  export default content;
}
