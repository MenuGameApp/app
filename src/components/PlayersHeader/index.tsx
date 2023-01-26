import React from 'react';
import { ScrollView } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { Avatar } from '../Avatar';

import { styles } from './styles';

type Props = {
  players: [];
}

export function PlayersHeader({ 
  players 
}: Props){

  
  return(
    <ScrollView
      horizontal
      style={styles.container}  
      showsHorizontalScrollIndicator={false}  
      contentContainerStyle={{ paddingRight: 40 }}
    >
      {
        players?.map(player => (
          <Avatar large circle urlImage={player.avatar_url} />
        ))
      }
    </ScrollView>
  );
}