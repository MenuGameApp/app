import React,
{
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { SCOPE } = process.env;
const { CLIENT_ID } = process.env;
const { CDN_IMAGE } = process.env;
const { REDIRECT_URI } = process.env;
const { RESPONSE_TYPE } = process.env;

import { api } from '../services/api';
import { COLLECTION_USERS } from '../configs/database';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();


type User = {
  id: string;
  username: string;
  firstName: string;
  avatar: string;
  email: string;
  token: string;
}

type AuthContextData = {
  user: User;
  loading: boolean;
  signIn: () => Promise<void>;
  singOut: () => Promise<void>;
}

type AuthProviderProps = {
  children: ReactNode;
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
  params: {
    access_token?: string;
    error?: string;
  }
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: '808146574977-3g9imj3n4dhjcgfaibbkocvag7a5rs33.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;


      api.defaults.headers.authorization = `Bearer ${authentication.accessToken}`;

      loadDataProfile(authentication)

    }
  }, [response]);


  const loadDataProfile = async (authentication) => {
    const userInfo = await api.get('/oauth2/v3/userinfo');

    const firstName = userInfo.given_name;
    userInfo.data.avatar = userInfo.picture;

    const userData = {
      ...userInfo,
      firstName,
      token: authentication.accessToken,
      id: authentication.state
    }

    await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(userData));
    setUser(userData);
  }

  React.useEffect(() => {
    setLoading(!request)
  }, [request]);

  async function signIn() {
    try {
      await promptAsync()
    } catch {
      throw new Error('Não foi possível autenticar');
    }
  }

  async function singOut() {
    setUser({} as User);
    await AsyncStorage.removeItem(COLLECTION_USERS);
  }

  async function loadUserStorageData() {
    const storage = await AsyncStorage.getItem(COLLECTION_USERS);


    if (storage) {
      const userLogged = JSON.parse(storage) as User;

      api.defaults.headers.authorization = `Bearer ${userLogged.token}`;

      setUser(userLogged);
    }
  }

  useEffect(() => {
    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signIn,
      singOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export {
  AuthProvider,
  useAuth
}