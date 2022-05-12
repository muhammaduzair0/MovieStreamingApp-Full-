import React, {useEffect, useState} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import Navbar from '../../Components/Navbar';
import COLORS from '../../assets/colors';
import {movieAPI} from '../../Services/APIservices';
const MovieDetailsScreen = props => {
  const [moviesData, setMoviesData] = useState({});
  console.log(moviesData);
  const {id, title, image} = props?.route?.params;

  useEffect(() => {
    movieAPI({
      route: `https://imdb-api.com/en/API/Title/k_g21rwgmf/${id}`,
    })
      .then(response => {
        return response.json();
      })
      .then(e => {
        setMoviesData(e);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <ScrollView style={{flex: 1, backgroundColor: COLORS.black}}>
      <Navbar />
      <View>
        <View style={{marginTop: 20, marginHorizontal: 20}}>
          <View>
            <Text
              style={{
                color: COLORS.primary,
                fontSize: 24,
                fontWeight: '600',
              }}>
              {moviesData.title}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  color: COLORS.white,
                  marginHorizontal: 3,
                }}>
                {moviesData.year}
              </Text>
              <Text
                style={{
                  color: COLORS.white,
                  marginHorizontal: 3,
                }}>
                - {moviesData.contentRating}
              </Text>
              <Text
                style={{
                  color: COLORS.white,
                  marginHorizontal: 3,
                }}>
                - {moviesData.runtimeStr}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text style={{color: COLORS.white, marginHorizontal: 3}}>
                {moviesData.genres}
              </Text>
              <Text style={{color: COLORS.white, marginHorizontal: 3}}>
                - {moviesData.imDbRating}
              </Text>
              <Text style={{color: COLORS.white, marginHorizontal: 3}}>
                - {moviesData.imDbRatingVotes}
              </Text>
            </View>
          </View>
        </View>
        <Image source={{uri:moviesData.image}}/>
      </View>
    </ScrollView>
  );
};

export default MovieDetailsScreen;
