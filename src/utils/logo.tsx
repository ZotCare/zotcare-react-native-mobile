import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// @ts-ignore - no types available
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';

export const getLogo = (type: string, name: string) => {
  switch (type) {
    case 'AntDesign':
      return AntDesign.hasIcon(name) ? (
        <AntDesign name={name} size={45} />
      ) : (
        <EvilIcons name="question" size={45} />
      );
    case 'Entypo':
      return <Entypo name={name} size={45} />;
    case 'EvilIcons':
      return EvilIcons.hasIcon(name) ? (
        <EvilIcons name={name} size={45} />
      ) : (
        <EvilIcons name="question" size={45} />
      );
    case 'Feather':
      return Feather.hasIcon(name) ? (
        <Feather name={name} size={45} />
      ) : (
        <EvilIcons name="question" size={45} />
      );
    case 'FontAwesome':
      return FontAwesome.hasIcon(name) ? (
        <FontAwesome name={name} size={45} />
      ) : (
        <EvilIcons name="question" size={45} />
      );
    case 'FontAwesome5':
      return <FontAwesome5 name={name} size={45} />;
    case 'FontAwesome6':
      return <FontAwesome6 name={name} size={45} />;
    case 'Fontisto':
      return Fontisto.hasIcon(name) ? (
        <Fontisto name={name} size={45} />
      ) : (
        <EvilIcons name="question" size={45} />
      );
    case 'Foundation':
      return Foundation.hasIcon(name) ? (
        <Foundation name={name} size={45} />
      ) : (
        <EvilIcons name="question" size={45} />
      );
    case 'MaterialIcons':
      return <MaterialIcons name={name} size={45} />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons name={name} size={45} />;
    case 'Octicons':
      return Octicons.hasIcon(name) ? (
        <Octicons name={name} size={45} />
      ) : (
        <EvilIcons name="question" size={45} />
      );
    case 'Ionicons':
      return <Ionicons name={name} size={45} />;
    case 'Zocial':
      return <Zocial name={name} size={45} />;
    case 'SimpleLineIcons':
      return <SimpleLineIcons name={name} size={45} />;
    default:
      return <FontAwesome5 name={name} size={45} />;
  }
};
