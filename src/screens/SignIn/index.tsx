import React from 'react';
import * as WebBrowser from 'expo-web-browser';

import { 
  View, 
  Text, 
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';


import { useAuth } from '../../hooks/auth';

import IllustrationImg from '../../assets/illustration.png';
import { theme } from '../../global/styles/theme';
import { styles } from './styles';

import { ButtonIcon } from '../../components/ButtonIcon';
import { Background } from '../../components/Background';

WebBrowser.maybeCompleteAuthSession();


export function SignIn(){
  const { loading, signIn } = useAuth();

  async function handleSignIn() {
    try {
      await signIn();
    }catch (error: any) {
      Alert.alert(error);
    }
  }

  return(
    <Background>
      <View style={styles.container}>     
        <Image 
          source={IllustrationImg} 
          style={styles.image} 
          resizeMode="stretch"
        />

        <View style={styles.content}>
          <Text style={styles.title}>
            Conecte-se {'\n'}
            e organize suas {'\n'} 
            jogatinas
          </Text>

          <Text style={styles.subtitle}>
            Interaja com seu grupo de amigos {'\n'} 
            conectados em uma mesa de bar
          </Text>

          {
            loading ? <ActivityIndicator color={theme.colors.primary} /> :
            <ButtonIcon 
              title="Entrar com Google"
              onPress={handleSignIn}
            />  
          }                             
        </View>
      </View>
    </Background>
  );
}