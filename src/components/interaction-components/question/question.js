import Markdown from 'react-native-markdown-display';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import Slider from '@react-native-community/slider';
import React from 'react';
import Checkboxes from '../checkboxes/checkboxes';
import Radiobuttons from '../radiobuttons/radiobuttons';
import DatetimePicker from '../datetime-picker/datetime-picker';
import ThemedMarkdown from '../../themed-markdown/themed-markdown';
import Indicator from '../indicators/indicator';

const Question = props => {
  const {type, ...rest} = props;
  return (() => {
    switch (type) {
      case 'text':
        return <ThemedMarkdown>{rest.content}</ThemedMarkdown>;
      case 'checkboxes':
        return (
          <View>
            {rest.title && <Markdown>{rest.title}</Markdown>}
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
            {rest.title && <Markdown>{rest.title}</Markdown>}
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
            {rest.title && <Markdown>{rest.title}</Markdown>}
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
            {rest.title && <Markdown>{rest.title}</Markdown>}
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
            {rest.title && <Markdown>{rest.title}</Markdown>}
            <DatetimePicker
              mode={rest.mode}
              default={rest.value || rest.default}
              onValueChange={rest.handleAnswer(rest.id)}
            />
          </View>
        );
      case 'indicator':
        return <Indicator items={rest.items} />;
    }
  })();
};

export default Question;
