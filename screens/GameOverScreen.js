import React from 'react';
import { View, Text, StyleSheet, Button, Image, Dimensions, ScrollView } from 'react-native';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';
import TitleText from '../components/TitleText';
import colors from '../constants/colors';

const GameOverScreen = props => {
  return (

    // ScrollView is added for the smaller screen
    <ScrollView>
    <View style={styles.screen}>
      <TitleText>The Game is Over!</TitleText>
      <View style={styles.imageContainer}>
      <Image 
        source={require('../assets/success.png')} 
        // source={{uri: 'https://image.shutterstock.com/image-photo/evening-view-ama-dablam-on-260nw-258841592.jpg'}} 
        style={styles.images}
        resizeMode="cover"/>
      </View>
      <View style={styles.resultContainer}>
      <BodyText style={styles.resultText}>Your phone needed {' '} 
      <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the number {' '}
      <Text style={styles.highlight}> {props.userNumber}</Text>  
      </BodyText>
      </View>
      <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
  images:{
    width: '100%',
    height: '100%'
  },
  imageContainer:{
    // width: 300,
    // height: 300,
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    // borderRadius: 150,
    borderRadius: Dimensions.get('window').width * 0.7 / 2,
    borderWidth: 2,
    borderColor:'black',
    overflow: 'hidden',
    // marginVertical: 30
    marginVertical: Dimensions.get('window').height / 20
  },
  highlight:{
    color: colors.primary,
    fontFamily: 'open-sans-bold'
  },
  resultContainer:{
    marginHorizontal: 30,
    marginVertical: Dimensions.get('window').height / 40
  },
  resultText:{
    fontSize: Dimensions.get('window').height < 400 ? 16 : 20,
    textAlign: 'center'
  }
});

export default GameOverScreen;
