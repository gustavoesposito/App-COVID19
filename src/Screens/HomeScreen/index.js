import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';
import virus from '../../assets/corona.png';
import { Button, Divider } from 'react-native-elements';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const url = 'https://api.covid19api.com/summary';
  const [report, setReport] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(url);
        setReport(data);
      } catch (error) {
        alert(error.message);
      }
    };

    getData();
  }, []);

  const callGlobal = () => navigation.navigate('Global', { report: report.Global });
  const callCountries = () => navigation.navigate('Countries', { countries: report.Countries });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatório CoVid 19</Text>
      <Image source={virus} style={styles.logo}></Image>
      <View style={styles.group}>
        <Button onPress={callGlobal} title="Situação Global" containerStyle={styles.separator} />

        <Button onPress={callCountries} title="Situação por país" />
      </View>
    </View>
  );
};

export default HomeScreen;
