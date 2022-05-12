import React from 'react'
import {View, FlatList} from 'react-native'
import MoviesData from '../assets/Data/MoviesData'
import MoviesListCard from './MoviesListCard'

const MovieListDetails = (props) => {
    return(
        <View>
            <FlatList 
            data={props.movieData}
            renderItem={(data) =>{
                const {item} = data
                return <MoviesListCard {...item} navigation={props.navigation}/>
            }}
            horizontal={true}
            />

        </View>
    )
}
export default MovieListDetails