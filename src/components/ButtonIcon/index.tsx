import React from 'react';
import { Text, Image, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import GoogleImg from '../../assets/google.png';
import { styles } from './styles';

type Props = RectButtonProps & {
  title: string;
}

export function ButtonIcon({ title, ...rest } : Props){
  return(
    <RectButton 
      style={styles.container} 
      {...rest }
    >
      <View style={styles.iconWrapper}>
        <Image source={GoogleImg} style={styles.icon} />
      </View>

      <Text style={styles.title}>
        { title }
      </Text>
    </RectButton>
  );
}