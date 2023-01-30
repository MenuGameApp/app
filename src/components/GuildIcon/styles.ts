import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: 62,
    height: 66,
    borderRadius: 8,
    backgroundColor: theme.colors.discord,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    boxShadow: '0 4px 4px 4px #00000020',
    border: '6px solid #b6977b'

  },
  image: {
    width: 62,
    height: 66,
  },
  user: {
    width: 10,
    height: 10,
    backgroundColor: 'red'
  }
});