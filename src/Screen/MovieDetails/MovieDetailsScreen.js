import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Navbar from '../../Components/Navbar';
import COLORS from '../../assets/colors';
import icons from '../../assets/icons';
import {movieAPI} from '../../Services/APIservices';

const MovieDetailsScreen = props => {
  const [moviesData, setMoviesData] = useState({});
  const [onLoad, setOnLoad] = useState(false);
  const {id, title, image} = props?.route?.params;

  useEffect(() => {
    movieAPI({
      route: `https://imdb-api.com/en/API/Title/k_c13f8ogf/${id}`,
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
                  fontSize: 12,
                  color: COLORS.white,
                  marginHorizontal: 3,
                }}>
                {moviesData.year}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: COLORS.white,
                  marginHorizontal: 3,
                }}>
                - {moviesData.contentRating}
              </Text>
              <Text
                style={{
                  fontSize: 12,
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
              <Text
                style={{
                  color: COLORS.white,
                  marginHorizontal: 3,
                  fontSize: 12,
                }}>
                {moviesData.genres} -
              </Text>
              <Image source={icons.star} style={{width: 13, height: 13}} />
              <Text
                style={{
                  color: COLORS.white,
                  marginHorizontal: 3,
                  fontSize: 12,
                }}>
                IMDB {moviesData.imDbRating}
              </Text>
              <Text
                style={{
                  color: COLORS.white,
                  marginHorizontal: 3,
                  fontSize: 12,
                }}>
                - {moviesData.imDbRatingVotes}
              </Text>
            </View>
          </View>
        </View>
        <View style={{alignItems: 'center', marginVertical: 20}}>
          <Image
            source={{uri: moviesData.image}}
            style={{width: 400, height: 400, borderRadius: 25}}
          />
        </View>
        <View style={{marginTop: 20, marginHorizontal: 20}}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 24,
              fontWeight: '600',
            }}>
            Actor List
          </Text>
          <FlatList
            data={moviesData.actorList}
            horizontal
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: 120,
                      height: 120,
                      justifyContent: 'center',
                      borderRadius: 60,
                    }}>
                    {onLoad && (
                      <View
                        style={{
                          position: 'absolute',
                          top: 0,
                          bottom: 0,
                          right: 0,
                          left: 0,
                          zIndex: 100,
                          flex: 1,
                        }}>
                        <ActivityIndicator
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                          }}
                          color={'red'}
                        />
                      </View>
                    )}
                    <Image
                      source={{uri: item.image}}
                      style={{
                        flex: 1,
                        marginHorizontal: 20,
                        overflow: 'hidden',
                      }}
                      resizeMode="center"
                      onLoadStart={() => {
                        setOnLoad(true);
                      }}
                      onError={() => {
                        console.log('error');
                      }}
                      onLoadEnd={() => {
                        setOnLoad(false);
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      color: COLORS.white,
                      fontSize: 16,
                      fontWeight: '600',
                    }}>
                    {item.name}
                  </Text>
                </View>
              );
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default MovieDetailsScreen;
