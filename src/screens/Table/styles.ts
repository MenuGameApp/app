import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { theme } from '../../global/styles/theme';
import texturaMadeira from '../../assets/textura_madeira_2.png'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    width: '100%',
    height: 234,
  },
  bannerContent: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 24,
    backgroundColor: '#222644',
    height: 100
  },
  title: {
    fontSize: 28,
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading
  },
  subtitle: {
    fontSize: 13,
    fontFamily: theme.fonts.text400,
    color: theme.colors.heading,
    lineHeight: 21
  },
  members: {
    marginLeft: 24,
    marginTop: 27
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 20, 
    width: '50%'

  },

  table: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    borderRadius: 110,
    border: '10px solid #ba9d7f',
    boxShadow: '4px 4px 4px #00000050',
    // backgroundColor: '#464F87',
    overflow: 'hidden'

  },
  horizontal: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    height: '100%',
    alignContent: 'space-between',
    justifyItems: 'center'
  },
  vertical: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '100%',
    alignItems: 'center',
    width: '100%'
  },
  user: {
    width: 58,
    height: 58,
    backgroundColor: '#fff',
    borderRadius: 18,
    overflow: 'hidden',
    border: '4px solid white',
    boxShadow: '4px 4px 4px #00000050',

  },
  room: {
    width: 370,
    height: 200,
    marginTop: 60,
    marginBottom: 50,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
});