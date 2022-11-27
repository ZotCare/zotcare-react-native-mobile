import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Dimensions,
  BackHandler,
  SafeAreaView,
  ScrollView,
  Text,
  Platform,
} from 'react-native';
import {
  ScaledSheet,
} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {getUUID} from '../../modules/profile/selectors';
import mainStyles from '../../views/Styles';
import HomeHeader from '../../components/HomeHeader';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import * as profileActions from '../../modules/profile/actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getToken} from '../../modules/auth/selectors';
import {useFocusEffect} from '@react-navigation/native';
import CustomModal from '../../components/CustomModal'
import { signOut } from '../../modules/auth/actions';

if (Platform.OS === 'ios') {
  Icon.loadFont();
}

const HomeScreen = ({navigation}) => {  
  const dispatch = useDispatch();
  const uuid = useSelector(state => getUUID(state));
  const token = useSelector(getToken);
  const [visibleLogout, setVisibleLogout] = useState(false);
  
  useFocusEffect(
    React.useCallback(() => {
      return () => {};
    }, []),
  );

  return (
    <SafeAreaView style={[mainStyles.container]}>      
      <HomeHeader text={"Info"}/>
      <ScrollView style={[mainStyles.scrollViewContainer]}>
        <CustomButton
          text={"Logout"}
          buttonColor={Colors.main_colors.secondaryColor} 
          onPress={()=> {
            setVisibleLogout(true)            
          }}
        />
      </ScrollView>
      <CustomModal 
        visible={visibleLogout} 
        hasButtons
        onBackdropPress={() => setVisibleLogout(false)} 
        component={<Text style={{fontSize: 17, fontWeight: Platform.OS == "ios" ? '900' : "bold", color: Colors.main_colors.whiteText, textAlign: "center"}}>{"Are you sure you want to logout?"}</Text>} 
        whiteText={"No"} 
        pinkText={"Yes"}
        onPinkButtonPress={()=>dispatch(signOut())}
        onWhiteButtonPress={()=>setVisibleLogout(false)}
        />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = ScaledSheet.create({
  boxesView: {
    // height: "160@vs",
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: '15@vs',
  },
  boxSubTextView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    borderRadius: 10,
    backgroundColor: Colors.main_colors.boxesBackground,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: Layout.marginHorizontal,
    paddingBottom: '10@vs',
    paddingHorizontal: '20@s',
  },
  boxTexts: {
    color: Colors.main_colors.homeBoxTextsColor,
    fontWeight: Platform.OS == 'ios' ? '900' : 'bold',
    fontSize: '15@ms',
    textAlign: 'center',
    marginTop: '10@vs',
  },
  boxSubText: {
    color: Colors.main_colors.homeBoxSubTextsColor,
    fontWeight: Platform.OS == 'ios' ? '900' : 'bold',
    fontSize: '14@ms',
  },
  invitesView: {
    marginHorizontal: Layout.marginHorizontal,
    marginBottom: '15@vs',
  },
  inviteBoxes: {
    height: '145@vs',
    width: '125@s',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '10@vs',
    marginRight: '8@s',
    backgroundColor: '#D6DAED',
    // paddingVertical: "15@vs"
  },
  invitesText: {
    color: Colors.main_colors.whiteText,
    fontWeight: Platform.OS == 'ios' ? '900' : 'bold',
    fontSize: '20@ms',
  },
  image: {
    backgroundColor: Colors.main_colors.noImageBackground,
    resizeMode: 'cover',
    height: '145@vs',
    width: '125@s',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: '10@vs',
  },
  inviteBoxText: {
    color: Colors.main_colors.whiteText,
    fontWeight: '500',
    marginVertical: '5@vs',
  },
  vipPass: {
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingVertical: '15@vs',
    marginTop: '10@vs',
    overflow: 'hidden',
    // paddingHorizontal: Layout.paddingHorizontal,
    backgroundColor: Colors.main_colors.mainBoxColor,
  },
});
