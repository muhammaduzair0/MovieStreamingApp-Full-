import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  TouchableWithoutFeedback,
  ImageBackground,
  Dimensions,
} from 'react-native';
import Navbar from '../../Components/Navbar';
import COLORS from '../../assets/colors';
import icons from '../../assets/icons';
import MovieListDetails from '../../Components/MovieListDetails';
import SIZES from '../../assets/sizes';
import MovieData from '../../assets/Data/MoviesData';
import Profiles from '../../Components/Profile';
import {movieAPI} from '../../Services/APIservices';
const {width, height} = Dimensions.get('window');

const HomeScreen = ({navigation, route}) => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    movieAPI({route: 'https://imdb-api.com/en/API/Top250Movies/k_g21rwgmf'})
      .then(e => {
        return e.json();
      })
      .then(a => {
        const arr = [];

        for (let i = 0; i < a.items.length; i++) {
          const obj = {
            title: a.items[i].title,
            id: a.items[i].id,
            image: a.items[i].image,
          };
          arr.push(obj);
          if (i == 11) {
            break;
          }
        }
        setMovies(arr);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
  const newSeasonScrollX = React.useRef(new Animated.Value(0)).current;
  const dotPosition = Animated.divide(newSeasonScrollX, width);
  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1, backgroundColor: COLORS.black}}>
      
      <Navbar />
      <Animated.FlatList
        horizontal
        pagingEnabled
        snapToAlignment="center"
        snapToInterval={SIZES.width}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        decelerationRate={0}
        contentContainerStyle={{
          marginTop: 12,
        }}
        data={MovieData.newSeason}
        keyExtractor={item => `${item.id}`}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: newSeasonScrollX}}}],
          {useNativeDriver: false},
        )}
        renderItem={({item, index}) => {
          return (
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate('MovieDetails', {selectedMovie: item})
              }>
              <View
                style={{
                  width: width,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ImageBackground
                  source={item.thumbnail}
                  resizeMode="cover"
                  style={{
                    width: width * 0.85,
                    height: width * 0.85,
                    justifyContent: 'flex-end',
                  }}
                  imageStyle={{borderRadius: 40}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      height: 60,
                      width: '100%',
                      marginBottom: 12,
                      paddingHorizontal: 12,
                    }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: 40,
                          width: 40,
                          borderRadius: 20,
                          backgroundColor: COLORS.transparentWhite,
                        }}>
                        <Image
                          source={icons.play}
                          resizeMode="contain"
                          style={{
                            width: 15,
                            height: 15,
                            tintColor: COLORS.white,
                          }}
                        />
                      </View>
                      <Text style={{marginLeft: 8, color: COLORS.white}}>
                        Play Now
                      </Text>
                    </View>
                    {item.stillWatching.length > 0 && (
                      <View style={{justifyContent: 'center'}}>
                        <Text style={{color: COLORS.white}}>
                          Still Watching
                        </Text>

                        <Profiles profiles={item.stillWatching} />
                      </View>
                    )}
                  </View>
                </ImageBackground>
              </View>
            </TouchableWithoutFeedback>
          );
        }}
      />
      <View
        style={{
          marginTop: 24,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {MovieData.newSeason.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          const dotWidth = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [6, 20, 6],
            extrapolate: 'clamp',
          });
          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [COLORS.lightGray, COLORS.primary, COLORS.lightGray],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={`dot-${index}`}
              opacity={opacity}
              style={{
                borderRadius: 8,
                marginHorizontal: 3,
                width: dotWidth,
                height: 6,
                backgroundColor: dotColor,
              }}></Animated.View>
          );
        })}
      </View>
      <View
        style={{
          marginTop: 50,
          paddingBottom: 50,
        }}>
        <View
          style={{
            marginHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: COLORS.white, fontWeight: '600', fontSize: 22}}>
            Continue Watching
          </Text>
          <TouchableOpacity onPress={() => {
            navigation.navigate('MovieDetails',{continueWatching: items.image})
            console.log(item)
          }}>
            <Image
              source={icons.rightArrow}
              style={{
                tintColor: COLORS.primary,
                width: 20,
                height: 20,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{marginVertical: 25, paddingBottom: 35}}>
          <MovieListDetails movieData={movies} navigation={navigation} />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
