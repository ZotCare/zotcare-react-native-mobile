import React from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {Divider, Searchbar} from 'react-native-paper';
import {scale, ScaledSheet} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome';

import Colors from '../constants/Colors';

if (Platform.OS === 'ios') {
  Icon.loadFont();
}

export default class List extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      searchText: '',
    };
  }

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
      },
      () => {
        this.props.load(
          this.state.page,
          this.props.per_page,
          '',
          this.props.token,
        );
      },
    );
  };

  handleLoadMore = () => {
    //console.log("load moreeeeeeee", this.state.page < this.props.total_pages)
    if (this.state.page < this.props.total_pages) {
      this.setState(
        {
          page: this.state.page + 1,
        },
        () => {
          this.props.load(this.state.page);
        },
      );
    }
  };

  renderFooter = () => {
    if (!this.props.data || !this.props.data.loading) {
      return null;
    }

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE',
        }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  renderHeader = () => {
    if (this.props.hasHeader) {
      return (
        <Searchbar
          dark={true}
          placeholder="Search"
          style={{
            marginHorizontal: scale(15),
            borderRadius: 10,
            backgroundColor: '#222223',
            color: '#9597A1',
          }}
          onChangeText={query => {
            this.setState({searchText: query});
            this.props.onChangeText(query);
          }}
          value={this.state.searchText}
          theme={{
            roundness: 2,
            colors: {
              text: '#9597A1',
              primary: '#9597A1',
              placeholder: '#9597A1',
            },
          }}
          onIconPress={() => this.props.onIconPress(this.state.searchText)}
        />
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <FlatList
        initialNumToRender={10}
        windowSize={5}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={30}
        removeClippedSubviews={false}
        data={this.props.processData(this.props.data)}
        renderItem={this.props.renderItem}
        style={styles.container}
        keyExtractor={(item, index) => '' + index}
        refreshing={false}
        onRefresh={this.handleRefresh}
        keyExtractor={(item, index) => '' + index}
        ListFooterComponent={this.renderFooter}
        ListHeaderComponent={this.renderHeader}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={0.9}
        ItemSeparatorComponent={
          this.props.hide_seperator ? null : () => <Divider />
        }
        horizontal={this.props.horizontal}
        inverted={this.props.inverted}
      />
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
});
