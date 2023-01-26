import React, { useEffect, useState } from 'react'
import { View, Dimensions, BackHandler, SafeAreaView, Text, LayoutAnimation, ScrollView } from 'react-native';
import { ScaledSheet, moderateScale, verticalScale } from 'react-native-size-matters';
import { Header } from '../../components';
import Colors from "../../constants/Colors";
import { useDispatch, useSelector } from 'react-redux';
import { Button, FAB, Portal, Surface, IconButton, Avatar } from 'react-native-paper';
import { NavigationService } from '../../navigation'
import { getUUID, getProfile } from '../../modules/profile/selectors';
import * as profileActions from '../../modules/profile/actions';
import mainStyles from '../../views/Styles'
import CustomAvatar from '../../components/CustomAvatar'
import Layout from '../../constants/Layout';
import CustomButton from '../../components/CustomButton'
import ListComponent from '../../components/ListComponent'
import images from '../../assets/images';
import * as leaderboardSelector from '../../modules/leaderboard/selectors'
import { getLeaderboard } from '../../modules/leaderboard/actions';
import { getFriends } from '../../modules/user/actions';
import * as userSelector from '../../modules/user/selectors'

const OtherProfileScreen = ({ navigation }) => {

  const dispatch = useDispatch();
  const user_id = NavigationService.getActiveRouteParams()?.user_id;
  const uuid = useSelector((state) => getUUID(state));
  const profile = useSelector(state => getProfile(state))
  const [refresh, setRefresh] = useState(false)
  const leaderboard = useSelector(state => leaderboardSelector.getLeaderboard(state));
  const friends = useSelector(state => userSelector.getSearchFriends(state));

  useEffect(() => {
    if (!!uuid) {     
      setRefresh(false)
    }
  }, [uuid, refresh]);

  useEffect(() => {
    if(!!uuid)
      dispatch(profileActions.getProfile());
    if(leaderboard.length == 0)
      dispatch(getLeaderboard(3))
    if(friends.length == 0)
      dispatch(getFriends({ user_id, request_type: "accepted" }));
  }, [uuid]);

  return (
    <SafeAreaView style={[mainStyles.container]}>

      <Header haveBackBtn haveSettingBtn mode={"dark"} onMenuPress={() => NavigationService.navigate('EditProfile')} />    
      <ScrollView style={mainStyles.scrollViewContainer}>         
        <View style={{alignItems: "center"}}>      
          <CustomAvatar name={profile.name} image={{ uri: profile.avatar }} size={120} fontSize={40}/>       
          <Text style={styles.bigText}>{profile.name ?? ""}</Text>
          <Text style={styles.smallText}>{profile.biography ?? ""}</Text>
        </View>

        <View style={{flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginTop: verticalScale(30)}}>
          <Text style={[styles.bigText, {color: Colors.main_colors.purpleText}]}>{profile.num_of_games ?? "0"}</Text>
          <Text style={[styles.bigText, {color: Colors.main_colors.purpleText}]}>{!!profile.num_of_wins && !!profile.num_of_games && profile.num_of_games > 0 ? profile.num_of_wins/profile.num_of_games : "0%"}</Text>
          <Text style={[styles.bigText, {color: Colors.main_colors.purpleText}]}>{profile.score ?? "0"}</Text>
        </View>
        <View style={{flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
          <Text style={styles.smallText}>{"played"}</Text>
          <Text style={styles.smallText}>{"win ratio"}</Text>
          <Text style={styles.smallText}>{"scores"}</Text>
        </View>
        <View style={[{marginTop: verticalScale(35), marginHorizontal: Layout.marginHorizontal}]}>
            <Text style={mainStyles.titleText}>{"Leaderboard".toUpperCase()}</Text>       
            {leaderboard[0] && <ListComponent  name={leaderboard[0].name} image={leaderboard[0].image?.small} score={leaderboard[0].score} rank={1}/>}
            {leaderboard[1] && <ListComponent  name={leaderboard[1].name} image={leaderboard[1].image?.small} score={leaderboard[1].score} rank={1}/>}
            {leaderboard[2] && <ListComponent  name={leaderboard[2].name} image={leaderboard[2].image?.small} score={leaderboard[2].score} rank={1}/>}
            <CustomButton
              text={"show full leaderboard"}
              type={"white"} 
              onPress={()=>NavigationService.navigate("LeaderboardList", { user_id })}
              style={{marginHorizontal: 0}}
            />   
        </View> 
        <View style={[{marginTop: verticalScale(35), marginHorizontal: Layout.marginHorizontal}]}>
            <Text style={mainStyles.titleText}>{"Recent Friends".toUpperCase()}</Text>    
            {friends[0] && <ListComponent  name={friends[0].user.name} image={friends[0].user?.image?.small} score={friends[0].user?.score}/>}
            {friends[1] && <ListComponent  name={friends[1].user.name} image={friends[1].user?.image?.small} score={friends[1].user?.score}/>}
            {friends[2] && <ListComponent  name={friends[2].user.name} image={friends[2].user?.image?.small} score={friends[2].user?.score}/>}                
        </View> 
      </ScrollView> 
      {user_id !== uuid &&<View style={{height: verticalScale(60), backgroundColor: Colors.main_colors.blackText, justifyContent: "center"}}>
        <CustomButton
          text={"add friend"}
          type={"pink"} 
          onPress={()=>NavigationService.navigate("Tournament")}
        />
      </View>}     
    </SafeAreaView>
  )
}

export default OtherProfileScreen

const styles = ScaledSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    height: "100%",
    paddingBottom: "25@vs"
  },
  bigText: {
    fontSize: "35@ms",
    fontWeight: Platform.OS == "ios" ? '900' : "bold",
    color: Colors.main_colors.whiteText,
    marginTop: "10@vs"
  },
  smallText: {
    fontSize: "12@ms",
    fontWeight: "500",
    color: Colors.main_colors.whiteText
  }
})