import React, { ReactNode } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Text, View, ImageBackground } from 'react-native';

import { theme } from '../../global/styles/theme';
import { styles } from './style';
import BannerAthenas from '../../assets/bannerAthenas.png'

type Props = {
  title: string;
  action?: ReactNode;
}

export function Header({ title, action }: Props) {
  const { secondary100, secondary80, heading } = theme.colors;

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <ImageBackground
      style={styles.container}
      source={BannerAthenas}
    >
      <BorderlessButton onPress={handleGoBack}>
        <Feather
          name="arrow-left"
          size={24}
          color={heading}
        />
      </BorderlessButton>

      <Text style={styles.title}>
        {title}
      </Text>

      {
        action
          ?
          <View>
            {action}
          </View>
          :
          <View style={{ width: 24 }} />
      }
    </ImageBackground>
  );
}