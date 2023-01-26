import React from 'react';
import { Image, View } from 'react-native';

import { styles } from './styles';
import DiscordSvg from '../../assets/discord.svg';
import PlayerSvg from '../../assets/player.svg';

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
        <Image 
          source={{ uri: DiscordSvg }}
          style={styles.image}
          resizeMode="cover"    
        />
       
      }
    </View>
  )

}