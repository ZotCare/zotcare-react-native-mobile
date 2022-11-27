import React from 'react'
import { Text, View } from 'react-native'
import { TouchableHighlight, TouchableNativeFeedback } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-paper';
import { ScaledSheet } from 'react-native-size-matters';
import { moderateScale } from 'react-native-size-matters';
import Colors from '../constants/Colors';
import Layout from "../constants/Layout";
import { numberWithCommas } from "../libs/utils"
import moment from 'moment'
import Icon from "react-native-vector-icons/MaterialIcons";
import AvatarImage from './Avatar'
import Titles from '../constants/Titles';

if (Platform.OS === 'ios') Icon.loadFont();

export default function ListItem({onPress, item}) {
    let briefStyle = {};
    if (Titles.deleteMessage == item.brief) {
      briefStyle = { fontStyle: "italic", color: '#ccc' }
    }
    const TouchableCmt = Platform.select({ ios: TouchableHighlight, android: TouchableNativeFeedback });
    const background = Platform.select({ios: null, android: TouchableNativeFeedback.Ripple(Colors.underlayColor, false)});
    return (
        <View style={styles.surface}>
            <TouchableCmt style={styles.touchable} useForeground={false} background={background} underlayColor={Colors.underlayColor} onPress={onPress}>
                <View style={styles.surface2}>
                    <AvatarImage size={50} source={item.contact.avatar} />
                    <View style={styles.detail}>
                        <Text style={[styles.name, Layout.font]}>
                            {item.contact !== undefined && item.contact.name}
                        </Text>
                        <View style={styles.rowContent} >
                            <Text style={[styles.content, Layout.font, briefStyle]} numberOfLines={1}>
                                {item.brief}
                            </Text>
                        </View>
                    </View>

                    <View style={{ justifyContent: "flex-start" }}>
                        <Text style={[styles.content, Layout.font]}>{(moment().diff(moment(item.updatedAt).format("YYYY-MM-DD HH:mm")) / 3600000 > 48) ? moment(item.updatedAt).format("YYYY-MM-DD") : ((moment().diff(moment(item.updatedAt).format("YYYY-MM-DD HH:mm")) / 3600000 > 24) ? "Yesterday" : moment(item.updatedAt).format("HH:mm A"))}</Text>
                        <View style={styles.view}>
                            <Text>{(!item.total || item.total === 0) ? "" : numberWithCommas(item.total)}</Text>
                            {!item.seen && <Avatar.Text size={moderateScale(10)} label={""} labelStyle={{ fontSize: 10 }} />}
                        </View>
                    </View>
                </View>
            </TouchableCmt>
        </View>
    )
}

const styles = ScaledSheet.create({
    view: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-around"
    },
    surface: {
        flex: 1, width: '100%',
        // flexDirection: "row",
        // justifyContent: "space-between",
        // alignItems: 'stretch',
    },
    touchable: {
        paddingHorizontal: "10@s",
        paddingVertical: "5@vs",
    },
    surface2: {

        flex: 1,
        flexDirection: "row",
        alignItems: 'center',

    },
    counter: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    imageFrame: {
        borderRadius: 70,
        aspectRatio: 1,
        backgroundColor: "#efefef"
    },
    image: {
        borderRadius: 70,
        aspectRatio: 1,
        height: "90%",
        paddingVertical: "5@vs",
        paddingHorizontal: "5@s",
    },
    detail: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: "space-between",

    },
    rowContent: {
        // flexDirection: "row",
        justifyContent: "space-between",
        // alignItems: 'center',
        paddingHorizontal: "10@s",
        alignSelf: 'baseline'
    },
    status: {
        borderRadius: "10@ms",
        backgroundColor: Colors.backgroundColor,
        paddingHorizontal: "5@s",
        paddingVertical: "5@vs",
        textAlign: 'right',
        alignSelf: 'baseline'

    },
    content: {
        fontSize: "12@ms",
        lineHeight: "25@vs",
        // paddingBottom: "10@vs",
        textAlign: "right",
        color: Colors.textOnsecondaryColor
    },
    title: {
        fontWeight: 'normal',
        fontSize: "12@ms",
        paddingHorizontal: "5@s",
        lineHeight: "25@vs",
        maxHeight: "30@vs",
        color: Colors.textOnsecondaryColor
    },
    name: {
        textAlign: "left",
        fontWeight: 'normal',
        fontSize: "16@ms",
        paddingHorizontal: "10@s",
        lineHeight: "25@vs",
        maxHeight: "30@vs",
        color: Colors.textOnsecondaryColor
    }

});

