import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../Screen/Home/Home';
import MovieDetailsScreen from '../Screen/MovieDetails/MovieDetailsScreen';


const HomeStack = createNativeStackNavigator();

const HomeRoutes = () => {
    return(
        <HomeStack.Navigator initialRouteName="HomeMain">
        <HomeStack.Screen
          options={{
            headerShown: false,
          }}
          name="HomeMain"
          component={HomeScreen}
        />
        <HomeStack.Screen
          options={{
            headerShown: false,
          }}
          name="MovieDetails"
          component={MovieDetailsScreen}
        />
        </HomeStack.Navigator>
    )
}
export default HomeRoutes;