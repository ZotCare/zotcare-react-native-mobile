import { StyleSheet, Platform } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { MAX_SCREEN_CONTENT_WIDTH } from '../constants/tablet';
import Colors from "../constants/Colors"
import Layout from '../constants/Layout';

export default ScaledSheet.create({
	container: {
		flex: 1,
		alignItems: "stretch",
		justifyContent: "flex-start",
		backgroundColor: Colors.main_colors.tabBackground
	},
	authContainer: {
		flex: 1,
		alignItems: "stretch",
		justifyContent: "flex-start",
		backgroundColor: Colors.main_colors.authBackgroundColor
	},
	scrollViewContainer: {
		flex: 1,
		backgroundColor: Colors.main_colors.backgroundColor,
		marginBottom: "5@vs"
	},
	titleText: {
		color: Colors.main_colors.whiteText,
		fontSize: "20@ms",
		fontWeight: "900",
	},
	center: {
		alignItems: "center"
	},
	button: {
		height: "40@vs",
		borderRadius: "20@vs",
	},
	textBold: {
		...Platform.select({
			ios: {
				fontWeight: '900'
			},
			android: {
				fontWeight: 'bold'
			}
		})
	},
	containerScrollView: {
		padding: 15,
		paddingBottom: 30
	},
	tabletScreenContent: {
		justifyContent: 'center',
		alignSelf: 'center',
		width: MAX_SCREEN_CONTENT_WIDTH
	},
	borderRadius: {
		borderRadius: 10
	},
	boxBorderRadius: {
		borderRadius: 15
	},
	boxBorderLeftRadius: {
		borderTopLeftRadius: 15,
		borderBottomLeftRadius: 15
	},
	modalFormSheet: {
		// Following UIModalPresentationFormSheet size
		// this not change on different iPad sizes
		width: 540,
		height: 620,
		overflow: 'hidden',
		borderRadius: 10
	},
	status: {
		position: 'absolute',
		bottom: -3,
		right: -3,
		borderWidth: 3
	},
	textAlignCenter: {
		textAlign: 'center'
	},
	opacity5: {
		opacity: 0.5
	},
	loginTitle: {
		fontSize: 20,
		marginVertical: 15,
		lineHeight: 28
	},
	loginSubtitle: {
		fontSize: 16,
		lineHeight: 20,
		marginBottom: 15
	},
	separator: {
		height: StyleSheet.hairlineWidth
	},
	separatorTop: {
		borderTopWidth: StyleSheet.hairlineWidth
	},
	separatorBottom: {
		borderBottomWidth: StyleSheet.hairlineWidth
	},
	separatorVertical: {
		borderTopWidth: StyleSheet.hairlineWidth,
		borderBottomWidth: StyleSheet.hairlineWidth
	},
	separatorLeft: {
		borderLeftWidth: StyleSheet.hairlineWidth
	},
	textRegular: {
		textAlign: 'left',
		backgroundColor: 'transparent',
		...Platform.select({
			ios: {
				fontFamily: 'System',
				fontWeight: '400'
			},
			android: {
				includeFontPadding: false,
				fontFamily: 'sans-serif',
				fontWeight: 'normal'
			}
		})
	},
	textMedium: {
		textAlign: 'left',
		backgroundColor: 'transparent',
		...Platform.select({
			ios: {
				fontFamily: 'System',
				fontWeight: '500'
			},
			android: {
				includeFontPadding: false,
				fontFamily: 'sans-serif-medium',
				fontWeight: 'normal'
			}
		})
	},
	textSemibold: {
		textAlign: 'left',
		backgroundColor: 'transparent',
		...Platform.select({
			ios: {
				fontFamily: 'System',
				fontWeight: '600'
			},
			android: {
				includeFontPadding: false,
				fontFamily: 'sans-serif',
				fontWeight: 'bold'
			}
		})
	},
	inputLastChild: {
		marginBottom: 15
	},
	notchLandscapeContainer: {
		marginTop: -34,
		paddingHorizontal: 30
	}
});
