import React from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';

import Slider from '@app/components/interaction-components/slider/slider';

import ThemedMarkdown from '../../themed-markdown/themed-markdown';
import Checkboxes from '../checkboxes/checkboxes';
import Custom1 from '../custom1/custom1';
import Custom2 from '../custom2/custom2';
import Custom3 from '../custom3/custom3';
import Custom4 from '../custom4/custom4';
import DatetimePicker from '../datetime-picker/datetime-picker';
import Indicator from '../indicators/indicator';
import Radiobuttons from '../radiobuttons/radiobuttons';

const Question = (props: any) => {
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
      case 'custom1':
        return <Custom1 {...rest} onEnd={rest.handleAnswer(rest.id)} />;
      case 'custom2':
        return <Custom2 {...rest} onEnd={rest.handleAnswer(rest.id)} />;
      case 'custom3':
        return <Custom3 {...rest} onEnd={rest.handleAnswer(rest.id)} />;
      case 'custom4':
        return <Custom4 {...rest} onEnd={rest.handleAnswer(rest.id)} />;
      default:
        return <></>;
    }
  })();
};

export default Question;

const styles = ScaledSheet.create({
  title: {
    marginBottom: '5@s',
  },
});
