import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView, FlatList, Dimensions } from 'react-native';

import { Ionicons } from "@expo/vector-icons";

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';

// import { ScreenOrientation } from "expo";
import * as ScreenOrientation from 'expo-screen-orientation'

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

// For ScrollView
// const renderListItem = (value, numOfRounds) => (
//   <View key={value} style={styles.listItem}>
//     <BodyText>#{numOfRounds}</BodyText>
//     <BodyText>{value}</BodyText>
//   </View>
// );

// For FlatList
const renderListItem = (itemLength, itemData) => (
    <View style={styles.listItem}>
      <BodyText>#{itemLength - itemData.index}</BodyText>
      <BodyText>{itemData.item}</BodyText>
    </View>
  );



const GameScreen = props => {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

  const initialGuess = generateRandomBetween(1, 100, props.userChoice)
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  // used for ScrollView
  // const [pastGuesses, setPastGuesses] = useState([initialGuess]);

  // used for flatlist as it takes string 
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get('window').width);
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get('window').height);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect (()=>{
    const updateLayout =()=>{
      setAvailableDeviceHeight(Dimensions.get('window').height);
      setAvailableDeviceWidth(Dimensions.get('window').width);
    }

    Dimensions.addEventListener('change', updateLayout);

    return() =>{
      Dimensions.removeEventListener('change', updateLayout)
    }
  })

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' }
      ]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    // setRounds(curRounds => curRounds + 1);
    // this is for the scrollview
    // setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses])
 
    // this is for flatlist
    setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses]);

  };

  let listContainerStyle = styles.listContainer;

  if (availableDeviceWidth < 350) {
    listContainerStyle = styles.listContainerBig;
  }

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponent's Guess</Text>
      <View style={styles.controls}> 
      <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <NumberContainer>{currentGuess}</NumberContainer>
        <MainButton
          onPress={nextGuessHandler.bind(this, 'greater')}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </View>
      
      {/* <Card style={styles.buttonContainer}> */}
        
      {/* </Card> */}
      <View style={styles.listContainer}>
        {/* Using ScrollView */}
      {/* <ScrollView contentContainerStyle={styles.list}>
        {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
      </ScrollView> */}

      {/* Using FlatList */}
      <FlatList 
        keyExtractor={item => item} 
        data={pastGuesses} 
        renderItem={renderListItem.bind(this, pastGuesses.length)}
        contentContainerStyle={styles.list}
      />
      </View>
    </View>
    )
  }
  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponent's Guess</Text>
      
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
      <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton
          onPress={nextGuessHandler.bind(this, 'greater')}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        {/* Using ScrollView */}
      {/* <ScrollView contentContainerStyle={styles.list}>
        {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
      </ScrollView> */}

      {/* Using FlatList */}
      <FlatList 
        keyExtractor={item => item} 
        data={pastGuesses} 
        renderItem={renderListItem.bind(this, pastGuesses.length)}
        contentContainerStyle={styles.list}
      />
      </View>
    </View>   
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // marginTop: 20,
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    width: 400,
    maxWidth: '90%'
  },
  controls:{
    flexDirection: 'row',
    justifyContent: 'space-around', 
    alignItems: 'center',
    width: '80%'
  },
  listItem:{
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  listContainer:{
    width: '60%',
    flex: 1
  },
  listContainerBig:{
    width: '80%',
    flex: 1
  },
  list:{
    // alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'flex-end'
  }
});

export default GameScreen;
