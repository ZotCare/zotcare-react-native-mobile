import { CommonActions, StackActions } from '@react-navigation/native';
//import LogManager from '../shared/utils/logging/LogManager';

let _navigator;
let modal;
let activeRouteName = '';

function setModal(modal) {
	modal = modal;
}
function showModal(visible) {
	//alert(LogManager.parseJsonObjectToJsonString(modal));
	// modal.open();
}

function setTopLevelNavigator(navigatorRef) {
	_navigator = navigatorRef;

}

function navigate(routeName, params) {
	try {
		_navigator && _navigator.navigate(routeName, params);
	} catch (err) {
	}
}

function goBack() {
	_navigator && _navigator.goBack()
}

function pop() {
	_navigator && _navigator.dispatch(StackActions.pop());
}

function replace(routeName, params) {
	_navigator && _navigator.dispatch(StackActions.replace(routeName, params));
}

function setParams(params, key) {
	_navigator && _navigator.setParams({ params, key });
}

function popToTop() {
	_navigator && _navigator.dispatch(StackActions.popToTop());
}

function resetRoot() {
	_navigator && _navigator.resetRoot()
}

function reset(input) {
	_navigator && _navigator.reset(input);
}

function getNavigator() {
	return _navigator;
}
// add other navigation functions that you need and export them

// gets the current screen from navigation state
function getActiveRouteName() {
	activeRouteName = _navigator && _navigator.getCurrentRoute().name;
	return activeRouteName;
}

// gets the current screen from navigation state
function getActiveRouteParams() {
	return _navigator && _navigator.getCurrentRoute().params;
}

export default {
	navigate,
	setTopLevelNavigator,
	goBack,
	setParams,
	getNavigator,
	pop,
	popToTop,
	setModal,
	showModal,
	getActiveRouteName,
	getActiveRouteParams,
	resetRoot,
	reset,
	replace
};
