import React, { useState, useEffect, useCallback } from 'react';
import { Fontisto } from '@expo/vector-icons';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import * as Linking from 'expo-linking';

import {
  ImageBackground,
  Text,
  View,
  Alert,
  FlatList,
  Share,
  Platform,
  Image
} from 'react-native';

import BannerImg from '../../assets/banner.png';
import UserImg from '../../assets/player.svg';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import { api } from '../../services/api';

import { AppointmentProps } from '../../components/Appointment';
import { ListDivider } from '../../components/ListDivider';
import { Background } from '../../components/Background';
import { ListHeader } from '../../components/ListHeader';
import { Button } from '../../components/Button';
import { Member, MemberProps } from '../../components/Member';
import { Header } from '../../components/Header';
import { Load } from '../../components/Load';
import { CategorySelect } from '../../components/CategorySelect';

type Params = {
  guildSelected: AppointmentProps
}

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
}

export function Games() {
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');

  const route = useRoute();
  const { guildSelected } = route.params as Params;

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId);
  }
  async function fetchGuildWidget() {
    try {
      // const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);

      const response = {
        data: {
          id: 'gw001',
          name: 'Guild Widget 001',
          instant_invite: '',
          members: [
            {
              id: 'm001',
              username: 'Membro 1',
              avatar_url: UserImg,
              status: 'online'
            },
            {
              id: 'm002',
              username: 'Membro 2',
              avatar_url: UserImg,
              status: 'offline'
            }
          ]
        }
      }

      setWidget(response.data);
    } catch {
      Alert.alert('Verifique as configurações do servidor. Será que o Widget está habilitado?');
    } finally {
      setLoading(false);
    }
  }

  function handleShareInvitation() {
    const message = Platform.OS === 'ios'
      ? `Junte-se a ${guildSelected.guild.name}`
      : widget.instant_invite;

    Share.share({
      message,
      url: widget.instant_invite
    });
  }

  function handleOpenGuild() {
    Linking.openURL(widget.instant_invite);
  }

  useEffect(() => {
    fetchGuildWidget();
  }, []);




  return (
    <Background>
      <Header
        title="Games"
        action={
          guildSelected.guild.owner &&
          <BorderlessButton onPress={handleShareInvitation}>
            <Fontisto
              name="share"
              size={24}
              color={theme.colors.primary}
            />

            <Image
              source={{ uri: Fontisto }}
              style={{ width: 24, height: 24 }}
            />
          </BorderlessButton>
        }
      />
      <View style={{marginTop: 12}}>
        <CategorySelect
          categorySelected={category}
          setCategory={handleCategorySelect}
        />
      </View>

      {
        loading ? <Load /> :
          <>
            <ListHeader
              title="Jogadores"
              subtitle={`Total ${widget.members.length}`}
            />

            <FlatList
              data={widget.members}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Member data={item} />
              )}
              ItemSeparatorComponent={() => <ListDivider isCentered />}
              style={styles.members}
            />
          </>
      }

      {
        guildSelected.guild.owner &&
        <View style={styles.footer}>
          <Button
            title="Entrar na partida"
            onPress={handleOpenGuild}
          />
        </View>
      }
    </Background>
  );
}