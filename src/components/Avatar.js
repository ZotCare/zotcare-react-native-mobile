import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-paper';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import images from '../assets/images';

export const getAvatarSource = (avatar, token) => {
    const headers = { Authorization: 'bearer ' + token };
    let avatarSource = {};
    if (avatar == "no_image" || avatar === undefined || avatar === "") avatarSource = images.default_avatar;
    else if (typeof avatar === 'number') avatarSource = avatar;
    else avatarSource = { uri: avatar, headers }
    return avatarSource;
}

const AvatarComponent = (props) => {
    const token = useSelector(state => state.auth.token);
    const avatarSource = getAvatarSource(props.source, token)
    let size = undefined;
    let scaleFunction = moderateScale;
    if (!!props.verticalScale) scaleFunction = verticalScale
    if (props.size) size = scaleFunction(props.size);
    ////console.log('AvatarComponent', avatarSource)
    return (
        <Avatar.Image size={size} source={avatarSource} />
    );
}

export default AvatarComponent

const styles = StyleSheet.create({})
