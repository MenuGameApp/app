import React from 'react';
import { Image, View } from 'react-native';

import { styles } from './styles';
import DiscordSvg from '../../assets/discord.svg';
import PlayerSvg from '../../assets/player.svg';

import Textura from '../../assets/textura_madeira_1.png'
import Textura2 from '../../assets/textura_madeira_2.png'
import { Feather } from '@expo/vector-icons';


// const { CDN_IMAGE } = process.env;

type Props = {
  guildId: string;
  iconId: string | null;
}

export function GuildIcon({ guildId, iconId }: Props) {
  // const uri = `${CDN_IMAGE}/icons/${guildId}/${iconId}.png`;

  console.log('iconId', iconId)

  const uri = 'https://www.iconsdb.com/icons/download/black/table-48.png';

  return (
    <View style={styles.container}>
      {
        iconId ?
          <Image
            source={{ uri }}
            style={styles.image}
            resizeMode="cover"
          />
          :
          <>
        <Image 
          source={{ uri: Textura }}
          style={styles.image}
          resizeMode="cover"    
        />
        </>

      }
    </View>
  )

}