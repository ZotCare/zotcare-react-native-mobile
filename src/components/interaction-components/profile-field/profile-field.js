import ThemedMarkdown from '../../themed-markdown/themed-markdown';
import {View} from 'react-native';
import Markdown from 'react-native-markdown-display';
import Radiobuttons from '../radiobuttons/radiobuttons';
import {TextInput} from 'react-native-paper';
import DatetimePicker from '../datetime-picker/datetime-picker';
import NumberInput from '../number-input/number-input';

const ProfileField = props => {
  const {type, ...rest} = props;
  // TODO: 'date', 'time', 'datetime'
  return (() => {
    switch (type) {
      case 'select':
        return (
          <View>
            {rest.title && <Markdown>{rest.title}</Markdown>}
            <Radiobuttons
              options={rest.items}
              disabled={rest.editable === false}
              default={rest.value || rest.default}
              onChange={rest.handleAnswer}
            />
          </View>
        );
      case 'text':
        return (
          <View>
            {rest.title && <Markdown>{rest.title}</Markdown>}
            <TextInput
              disabled={rest.editable === false}
              defaultValue={rest.value || rest.default}
              onChangeText={rest.handleAnswer}
            />
          </View>
        );
      case 'number':
        return (
          <View>
            {rest.title && <Markdown>{rest.title}</Markdown>}
            <NumberInput
              disabled={rest.editable === false}
              default={rest.value || rest.default}
              onChange={rest.handleAnswer}
            />
          </View>
        );
      case 'date':
        return (
          <View>
            {rest.title && <Markdown>{rest.title}</Markdown>}
            <DatetimePicker
              mode="date"
              default={rest.value || rest.default}
              onValueChange={rest.handleAnswer}
            />
          </View>
        );
      case 'time':
        return (
          <View>
            {rest.title && <Markdown>{rest.title}</Markdown>}
            <DatetimePicker
              mode="time"
              default={rest.value || rest.default}
              onValueChange={rest.handleAnswer}
            />
          </View>
        );
    }
  })();
};

export default ProfileField;
