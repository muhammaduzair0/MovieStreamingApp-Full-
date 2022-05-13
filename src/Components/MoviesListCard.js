import React from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import COLORS from '../assets/colors';

const MoviesListCard = props => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate('MovieDetails', {
          id: props.id,
          title: props.title,
          image: props.image,
        });
      }}>
      <View>
        <Image
          source={{uri: props.image}}
          style={{
            height: 150,
            width: 150,
            marginHorizontal: 15,
            borderRadius: 15,
          }}
        />
      </View>

      <View style={{alignItems: 'center', marginTop: 10}}>
        <Text
          style={{
            color: COLORS.white,
            fontWeight: '600',
            textAlign: 'center',
            marginHorizontal: 20,
          }}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MoviesListCard;
