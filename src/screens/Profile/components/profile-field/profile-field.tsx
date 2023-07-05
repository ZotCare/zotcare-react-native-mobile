import {View} from 'react-native';
import {TextInput} from 'react-native-paper';

import DatetimePicker from '@components/input-components/datetime-picker/datetime-picker';
import NumberInput from '@components/input-components/number-input/number-input';
import RadioButtons from '@components/input-components/radio-buttons/radio-buttons';
import ThemedMarkdown from '@components/themed-markdown/themed-markdown';

const ProfileField = (props: any) => {
  const {type, ...rest} = props;
  // TODO: 'datetime'
  return ((): JSX.Element => {
    switch (type) {
      case 'select':
        return (
          <View>
            {rest.title && <ThemedMarkdown>{rest.title}</ThemedMarkdown>}
            <RadioButtons
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
