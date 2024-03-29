import React from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';

import Checkboxes from '@components/input/checkboxes/checkboxes';
import DatetimePicker from '@components/input/datetime-picker/datetime-picker';
import Indicator from '@components/input/indicators/indicator';
import RadioButtons from '@components/input/radio-buttons/radio-buttons';
import Slider from '@components/input/slider/slider';
import ThemedMarkdown from '@components/themed-markdown/themed-markdown';

const InteractionField = (props: any) => {
  const {type, ...rest} = props;
  return ((): JSX.Element => {
    switch (type) {
      case 'text':
        return (
          <ThemedMarkdown alignment={rest.alignment || 'left'}>
            {rest.content}
          </ThemedMarkdown>
        );
      case 'checkboxes':
        return (
          <View>
            {rest.title && (
              <ThemedMarkdown style={styles.title}>{rest.title}</ThemedMarkdown>
            )}
            <Checkboxes
              options={rest.options}
              default={rest.value || rest.default}
              onChange={rest.handleAnswer(rest.id)}
              mode={rest.mode}
            />
          </View>
        );
      case 'radiobutton':
        return (
          <View>
            {rest.title && (
              <ThemedMarkdown style={styles.title}>{rest.title}</ThemedMarkdown>
            )}
            <RadioButtons
              options={rest.options}
              default={rest.value || rest.default}
              onChange={rest.handleAnswer(rest.id)}
              mode={rest.mode}
            />
          </View>
        );
      case 'textbox':
        return (
          <View>
            {rest.title && (
              <ThemedMarkdown style={styles.title}>{rest.title}</ThemedMarkdown>
            )}
            <TextInput
              placeholder={rest.placeholder}
              value={rest.value || rest.default}
              multiline={rest.multiline}
              onChangeText={rest.handleAnswer(rest.id)}
            />
          </View>
        );
      case 'slider':
        return (
          <View>
            {rest.title && (
              <ThemedMarkdown style={styles.title}>{rest.title}</ThemedMarkdown>
            )}
            {rest.indicator && (
              <Indicator
                items={rest.indicator.items}
                mode={rest.indicator.mode}
              />
            )}
            <Slider
              default={rest.value || rest.default}
              onValueChange={rest.handleAnswer(rest.id)}
              {...rest}
            />
          </View>
        );
      case 'datetime':
        return (
          <View>
            {rest.title && (
              <ThemedMarkdown style={styles.title}>{rest.title}</ThemedMarkdown>
            )}
            <DatetimePicker
              mode={rest.mode}
              default={rest.value || rest.default}
              onValueChange={rest.handleAnswer(rest.id)}
            />
          </View>
        );
      case 'indicator':
        return <Indicator items={rest.items} mode={rest.mode} />;
      default:
        return <></>;
    }
  })();
};

export default InteractionField;

const styles = ScaledSheet.create({
  title: {
    marginBottom: '5@s',
  },
});
