import Slider from '@react-native-community/slider';
import React from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';

import ThemedMarkdown from '../../themed-markdown/themed-markdown';
import Checkboxes from '../checkboxes/checkboxes';
import Custom1 from '../custom1/custom1';
import DatetimePicker from '../datetime-picker/datetime-picker';
import Indicator from '../indicators/indicator';
import Radiobuttons from '../radiobuttons/radiobuttons';

const Question = (props: any) => {
  const {type, ...rest} = props;
  return ((): JSX.Element => {
    switch (type) {
      case 'text':
        return <ThemedMarkdown>{rest.content}</ThemedMarkdown>;
      case 'checkboxes':
        return (
          <View>
            {rest.title && <ThemedMarkdown>{rest.title}</ThemedMarkdown>}
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
            {rest.title && <ThemedMarkdown>{rest.title}</ThemedMarkdown>}
            <Radiobuttons
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
            {rest.title && <ThemedMarkdown>{rest.title}</ThemedMarkdown>}
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
            {rest.title && <ThemedMarkdown>{rest.title}</ThemedMarkdown>}
            {rest.indicator && (
              <Indicator
                items={rest.indicator.items}
                mode={rest.indicator.mode}
              />
            )}
            <Slider
              tapToSeek={true}
              minimumValue={rest.min || 0}
              maximumValue={rest.max || 100}
              step={rest.step || 1}
              value={rest.value || rest.default}
              onSlidingComplete={rest.handleAnswer(rest.id)}
            />
          </View>
        );
      case 'datetime':
        return (
          <View>
            {rest.title && <ThemedMarkdown>{rest.title}</ThemedMarkdown>}
            <DatetimePicker
              mode={rest.mode}
              default={rest.value || rest.default}
              onValueChange={rest.handleAnswer(rest.id)}
            />
          </View>
        );
      case 'indicator':
        return <Indicator items={rest.items} />;
      case 'custom1':
        return <Custom1 {...rest} onEnd={rest.handleAnswer(rest.id)} />;
      default:
        return <></>;
    }
  })();
};

export default Question;
