import {View} from 'react-native';
import {TextInput} from 'react-native-paper';

import ThemedMarkdown from '../../themed-markdown/themed-markdown';
import DatetimePicker from '../datetime-picker/datetime-picker';
import NumberInput from '../number-input/number-input';
import Radiobuttons from '../radiobuttons/radiobuttons';

const ProfileField = (props: any) => {
  const {type, ...rest} = props;
  // TODO: 'date', 'time', 'datetime'
  return ((): JSX.Element => {
    switch (type) {
      case 'select':
        return (
          <View>
            {rest.title && <ThemedMarkdown>{rest.title}</ThemedMarkdown>}
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
            {rest.title && <ThemedMarkdown>{rest.title}</ThemedMarkdown>}
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
            {rest.title && <ThemedMarkdown>{rest.title}</ThemedMarkdown>}
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
            {rest.title && <ThemedMarkdown>{rest.title}</ThemedMarkdown>}
            <DatetimePicker
              mode="date"
              default={rest.value || rest.default}
              onValueChange={rest.handleAnswer}
              disabled={rest.editable === false}
            />
          </View>
        );
      case 'time':
        return (
          <View>
            {rest.title && <ThemedMarkdown>{rest.title}</ThemedMarkdown>}
            <DatetimePicker
              mode="time"
              default={rest.value || rest.default}
              onValueChange={rest.handleAnswer}
              disabled={rest.editable === false}
            />
          </View>
        );
      default:
        return <View />;
    }
  })();
};

export default ProfileField;
