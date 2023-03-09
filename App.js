import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Audio } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000);

const image = require('./assets/ukulele.png');
const music = require('./assets/music/ukulele.mp3');

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);

  const playMusic = () => {
    if (isPlaying)
      sound.pauseAsync();
    else
      sound.playAsync();
    
    setIsPlaying(!isPlaying);
  }
  
  useEffect(() => {
    const loadSound = async () => {
      const status = {
        shouldPlay: isPlaying
      };
  
      const { sound } = await Audio.Sound.createAsync(music, status);
      setSound(sound);
    }
    loadSound();
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aloha Music</Text>
      <Image style={styles.image} source={image}></Image>
      <TouchableOpacity onPress={playMusic}>
        {isPlaying ?
          <Feather name="pause" size={32} color="#000"/> :
          <Feather name="play" size={32} color="#000"/>
        }
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4e3cf',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    width: 300,
    fontSize: 30,
    fontWeight: 'bold',
    backgroundColor: '#da9547',
    textAlign: 'center',
    marginBottom: 40,
  },
  image: {
    height: 500,
    width: 300,
    marginBottom: 30
  }
});