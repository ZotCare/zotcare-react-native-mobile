import React from 'react';
import {View, Text, Image, TouchableOpacity, Modal} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Feather';
import {TextInput, Searchbar} from 'react-native-paper';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import Colors from '../constants/Colors';
import {Kaede} from 'react-native-textinput-effects';
import FIcon from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect from 'react-native-picker-select';

if (Platform.OS === 'ios'){
  FIcon.loadFont();
  Icon.loadFont();
}
export default class InputPicker extends React.PureComponent {


  constructor(props) {
    super(props);

    this.state = {
      focused: false,
      wheelVisible: false,
      selectedItem:
        this.props.data.length >= 8 ? 4 : this.props.data.length / 2,
      firstTime: true,
      selectedRound: 0,
      searchText: '',
      selector: null,
    };
  }

  render() {
    return (
      <View>
        <View style={styles.surface}>
          <RNPickerSelect
            onValueChange={value => {
              this.props.onValueChanged(value);  
            }}
            items={this.props.data.map((d, index) => {
              return {label: d, value: index};
            })}
            ref={el => {
              this.state.selector = el;
            }}

          <TouchableOpacity
            style={styles.surface2}
            onPress={() => {
              this.state.selector.togglePicker(true);
            }}>
            <Kaede
              style={styles.inputText}
              label={this.props.placeholder}
              keyboardType={'default'}
              // multiline = {true}
              // numberOfLines = {2}
              // iconClass={FIcon}
              pointerEvents="none"
              value={this.props.code === null ? '' : this.props.code}
              editable={false}
              labelStyle={{fontSize: 12, marginRight: 20}}
              // onFocus={() => {if(this.props.data.length > 0)this.setState({wheelVisible: true})}}
              // iconName={'edit'}
              // iconColor={Colors.primaryColorDark}
              // iconSize={20}
              // iconWidth={40}
              inputPadding={16}
            />
            {(this.props.code === '' || this.props.code === null) && (
              <Icon
                name="chevron-down"
                style={styles.icon}
                size={20}
                color={Colors.secondaryColor}
              />
            )}
          </TouchableOpacity>
        </View>

    </View>
    );
  }
}

const styles = ScaledSheet.create({
  inputText: {
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.primaryColorDark,
    marginVertical: '5@vs',
    width: '100%',
    overflow: 'hidden',
  },
  surface: {
    width: '100%',
    fontSize: '15@ms',
    alignItems: 'center',
  },
  surface2: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    right: 0,
    width: '20%',
    height: '50@vs',
    top: '10@vs',
    borderLeftWidth: 1.5,
    borderLeftColor: Colors.secondaryColor,
    paddingLeft: '20@ms',
    paddingVertical: '15@vs'

  },
  content: {
    flex: 1,
    fontSize: '15@ms',
  },
  picker: {
    height: '150@vs',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    padding: '10@vs',
    // justifyContent: "center"
  },
  
});
