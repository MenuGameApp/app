import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

type Props = {
  urlImage: string;
  circle?: boolean;
  large?: boolean;
}

export function Avatar({ urlImage, circle, large }: Props) {
  const { secondary50, secondary70 } = theme.colors;

  return (
    <LinearGradient
      style={[styles.container, circle && styles.circle, large && styles.large]}
      colors={[secondary50, secondary70]}
    >
      <Image 
        source={{ uri: urlImage }}
        style={ styles.avatar}
      />
    </LinearGradient>
  )

}