import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { View, Text, Image } from 'react-native';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import PlayerSvg from '../../assets/player.svg';
import CalendarSvg from '../../assets/calendar.svg';

import { GuildProps } from '../Guild';
import { GuildIcon } from '../GuildIcon';
import { categories } from '../../utils/categories';


export type AppointmentProps = {
  id: string;
  guild: GuildProps;
  category: string;
  date: string;
  description: string;
}

type Props = RectButtonProps & {
  data: AppointmentProps;
}

export function Appointment({ data, ...rest }: Props) {
  const [category] = categories.filter(item => item.id === data.category);
  const { owner } = data.guild;
  const { primary, on, secondary80, secondary100 } = theme.colors;

  return (
    <RectButton {...rest}>
      <LinearGradient
        colors={['#363C6B', '#2A2F55']}
        style={styles.container}
      >
        <LinearGradient
          style={styles.guildIconContainer}
          colors={[secondary80, secondary100]}
        >
          <GuildIcon guildId={data.guild.id} iconId={data.guild.icon} />
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {data.guild.name}
            </Text>

            <Text style={styles.category}>
              {category.title}
            </Text>
          </View>

          {/* <View style={styles.footer}>
            <View style={styles.dateInfo}>
              <Image
                source={{ uri: CalendarSvg }}
                resizeMode="cover"
              />
              <Text style={styles.date}>
                {data.date}
              </Text>
            </View>

            <View style={styles.playersInfo}>
              <Image
                source={{ uri: PlayerSvg }}
                style={{ width: 24, height: 24 }}
              />
              <Text style={[
                styles.player,
                { color: owner ? primary : on }
              ]}>
                {owner ? 'Anfitrião' : 'Visitante'}
              </Text>
            </View>
          </View> */}
        </View>
      </LinearGradient>
    </RectButton>
  )

}