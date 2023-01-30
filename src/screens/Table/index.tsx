import React, { useState, useEffect, useCallback } from 'react';
import { Fontisto } from '@expo/vector-icons';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import * as Linking from 'expo-linking';
import Carousel from 'react-native-reanimated-carousel';

import {
  ImageBackground,
  Text,
  View,
  Alert,
  FlatList,
  Share,
  Platform,
  Image,
  Dimensions
} from 'react-native';

import BannerImg from '../../assets/banner.png';
import UserImg from '../../assets/player.svg';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import { api } from '../../services/api';
import { useAuth } from '../../hooks/auth';

import { AppointmentProps } from '../../components/Appointment';
import { ListDivider } from '../../components/ListDivider';
import { Background } from '../../components/Background';
import { ListHeader } from '../../components/ListHeader';
import { Button } from '../../components/Button';
import { Member, MemberProps } from '../../components/Member';
import { Header } from '../../components/Header';
import { Load } from '../../components/Load';
import { CategorySelect } from '../../components/CategorySelect';
import { PlayersHeader } from '../../components/PlayersHeader';
import { Avatar } from '../../components/Avatar';


import { games } from '../../utils/games';
import JogoCartasImage from '../../assets/jogocartas.png';
import { Feather } from '@expo/vector-icons';
import TexturaMadeira from '../../assets/textura_madeira_1.png';


type Params = {
  guildSelected: AppointmentProps
}

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
}

export function Table() {
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');

  const { user } = useAuth();


  const route = useRoute();
  const { guildSelected } = route.params as Params;

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId);
  }


  console.log("user", user?.picture)

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

      setWidget({
        ...response.data,
        members: [{
          id: user.id,
          username: user.data.name,
          avatar_url: user.data.picture,
          status: 'online'
        }, ...response.data.members]
      });
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

  const width = Dimensions.get('window').width;

  console.log('members', widget)

  return (
    <Background>
      <Header
        title={guildSelected.guild.name}
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

      {/* <View style={{ marginTop: 12 }}>
        <PlayersHeader
          players={widget.members}
        />
      </View> */}



      {
        loading ? <Load /> :
          <>
            {/* <ListHeader
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
            /> */}
            <View style={styles.room}>
              <ImageBackground
                source={TexturaMadeira}
                style={styles.table}
                resizeMode={'stretch'}
              />

              <View style={styles.horizontal}>
                <View style={styles.user} >
                  <Image
                    source={{ uri: user?.picture }}
                    style={{ width: 58, height: 58 }}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.user} />
                <View style={styles.user} />
                <View style={styles.user} />
                <View style={styles.user} />
                <View style={styles.user} />
                <View style={styles.user} />
                <View style={styles.user} />
              </View>
              <View style={styles.vertical}>
                <View style={styles.user} />
                <View style={styles.user} />
              </View>
            </View>
            {/* <View>
              <Text>Neste jogo você terá que tirar</Text>
            </View> */}

            <View style={{ marginTop: 12 }}>
              <View style={{ flex: 1 }}>
                <Carousel
                  loop
                  width={width}
                  height={300}
                  autoPlay={false}
                  data={games}
                  scrollAnimationDuration={1000}
                  onSnapToItem={(index) => console.log('current index:', index)}
                  mode="parallax"
                  modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 50,
                  }}
                  renderItem={({ index }) => {
                    return (
                      <View
                        style={{
                          flex: 1,
                          borderWidth: 1,
                          justifyContent: 'center',
                          backgroundColor: 'white',
                          borderRadius: 25,
                          overflow: 'hidden'
                        }}
                      >
                        <ImageBackground
                          source={games[index].image}
                          style={styles.banner}
                        >
                          <View style={styles.footer}>
                            <Button
                              title="Iniciar partida"
                              onPress={handleOpenGuild}
                            />
                          </View>
                        </ImageBackground>
                        <View style={styles.bannerContent}>
                          <Text style={styles.title}>
                            {games[index].title}
                          </Text>

                          <Text style={styles.subtitle}>
                            Descrição do jogo
                          </Text>
                        </View>
                      </View>
                    )
                  }}
                />
              </View>
            </View>
          </>


      }


    </Background>
  );
}