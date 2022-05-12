import React from 'react'
import {View, Image, TouchableOpacity} from 'react-native'
import icons from '../assets/icons'
import COLORS from '../assets/colors'

const Navbar = () => {
    return(
        <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
          marginVertical: 20,
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => console.log('Profile')}>
          <Image
            source={require('../assets/images/dummy_profile/profile_photo.png')}
            style={{
              height: 50,
              width: 50,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Screen Mirror')}>
          <Image
            source={icons.airplay}
            style={{
              height: 25,
              width: 25,
              tintColor: COLORS.primary,
            }}
          />
        </TouchableOpacity>
      </View>
    )
}

export default Navbar;