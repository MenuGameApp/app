import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: 49,
    height: 49,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  circle: {
    borderRadius: 50,
    overflow: 'hidden',
    border: '2px solid #fff'
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 8
  },
  large: {
    width: 64,
    height: 64
  }
});