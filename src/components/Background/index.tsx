import React, { ReactNode } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

type Props = {
  children: ReactNode;
}

export function Background({ children }: Props) {
  const { secondary80, secondary100 } = theme.colors;

  return (
    <LinearGradient
      style={styles.container}
      colors={['#363C6B', '#2A2F55']}
    >
      {children}
    </LinearGradient>
  )
}