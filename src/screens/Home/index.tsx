import React, { useState, useCallback } from 'react';
import { View, FlatList, ImageBackground, Text } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BannerImg from '../../assets/bannerAthenas.png';
import UserImg from '../../assets/player.svg';

import { CategorySelect } from '../../components/CategorySelect';
import { Appointment, AppointmentProps } from '../../components/Appointment';
import { ListDivider } from '../../components/ListDivider';
import { ListHeader } from '../../components/ListHeader';
import { Background } from '../../components/Background';
import { ButtonAdd } from '../../components/ButtonAdd';
import { Profile } from '../../components/Profile';
import { Load } from '../../components/Load';

import { styles } from './styles';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import { categories } from '../../utils/categories';


export function Home() {
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);

  const navigation = useNavigation();


  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId);
  }

  function handleAppointmentDetails(guildSelected: AppointmentProps) {
    navigation.navigate('Table', { guildSelected });
  }

  function handleAppointmentCreate() {
    navigation.navigate('AppointmentCreate');
  }

  async function loadAppointments() {

    setLoading(true);

    // const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const response = [{
      id: 'id001',
      guild: {
        id: 'gid001',
        name: 'Mesa 001',
        icon: undefined,
        owner: true
      },
      category: '1',
      date: '2 pessoas',
      description: 'Descrição'
    },
    {
      id: 'id002',
      guild: {
        id: 'gid002',
        name: 'Mesa 002',
        icon: undefined,
        owner: false
      },
      category: '1',
      date: '4 pessoas',
      description: 'Descrição'
    }];


    const storage: AppointmentProps[] = response; // ? JSON.parse(response) : [];

    if (category) {
      setAppointments(storage.filter(item => item.category === category));
    } else {
      setAppointments(storage)
    }

    setLoading(false);
  }

  useFocusEffect(useCallback(() => {

    loadAppointments();
  }, [category]));


  return (
    <Background>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={handleAppointmentCreate} />
      </View>


      <ImageBackground
        source={BannerImg}
        style={styles.banner}
      >
        <View style={styles.bannerHeader}>
          <Text style={styles.subtitle}>
          🏆 100 partidas
          </Text>

          <Text style={styles.subtitle}>
          🕹️ 200 players
          </Text>
        </View>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>
            Athenas Restaurante
          </Text>

          <Text style={styles.subtitle}>
            Descrição
          </Text>
        </View>
      </ImageBackground>

      {
        loading ? <Load /> :
          <>
            <ListHeader
              title="Mesas"
              /* subtitle={`Total ${appointments.length}`} */
            />

            <FlatList
              data={appointments}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Appointment
                  data={item}
                  onPress={() => handleAppointmentDetails(item)}
                />
              )}
              ItemSeparatorComponent={() => <ListDivider />}
              contentContainerStyle={{ paddingBottom: 69 }}
              style={styles.matches}
              showsVerticalScrollIndicator={false}
            />
          </>
      }
    </Background>
  );
}