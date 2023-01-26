import React, {useEffect} from 'react';
import {useInteraction} from '../../modules/interactions/service';
import {useState} from 'react';
import {Button, HelperText, Text} from 'react-native-paper';
import Question from '../../components/interaction-components/question/question';
import {useCondition} from './conditions';
import {Notifier} from 'react-native-notifier';
import {ScrollView} from 'react-native-gesture-handler';
import {ScaledSheet} from 'react-native-size-matters';
import {View} from 'react-native';

const InteractionScreen = ({route, navigation}) => {
  const {id} = route.params;
  const {data: interaction, status} = useInteraction(id);
  const [answers, setAnswers] = useState({});
  const [defaults, setDefaults] = useState({});
  const {check_or_and_collection: checkConditions} = useCondition(answers);
  const [missedKeys, setMissedKeys] = useState([]);

  const findNextPage = start => {
    for (let i = start; i < interaction.data.pages.length; i++) {
      if (checkConditions(interaction.data.pages[i].conditions)) {
        return i;
      }
    }
    return -1;
  };

  const [page, setPage] = useState(findNextPage(0));

  useEffect(() => {
    interaction.data.pages.forEach(int_page => {
      int_page.fields.forEach(field => {
        if (field.default) {
          setDefaults(prev => ({...prev, [field.key]: field.default}));
          setAnswers(prev => ({...prev, [field.key]: field.default}));
        }
      });
    });
  }, [interaction]);

  const handleAnswer = questionKey => answer => {
    if (missedKeys.includes(questionKey)) {
      setMissedKeys(prev => prev.filter(key => key !== questionKey));
    }
    setAnswers({...answers, [questionKey]: answer});
  };

  const isRequired = key => {
    return missedKeys.includes(key);
  };

  const handleSubmit = () => {
    const nextPage = findNextPage(page + 1);
    const requiredKeys = interaction.data.pages[page].fields
      .filter(field => field.required)
      .map(field => field.key);
    const missingKeys = requiredKeys.filter(
      key =>
        answers[key] === undefined ||
        answers[key] === '' ||
        (Array.isArray(answers[key]) && answers[key].length === 0),
    );
    setMissedKeys(missingKeys);
    if (missingKeys.length > 0) {
      Notifier.showNotification({
        title: 'Missing required fields',
        description: 'Please fill out all required fields',
        alertType: 'error',
      });
      return;
    }
    setDefaults(prev => ({...prev, ...answers}));
    if (nextPage === -1) {
      Notifier.showNotification({
        title: 'Interaction finished',
        description: 'You have finished the interaction',
      });
    } else {
      setPage(nextPage);
    }
  };

  return status === 'success' ? (
    <View>
      <ScrollView>
        <View style={styles.container}>
          {interaction.data.pages[page].fields.map((field, index) => {
            field.id = field.key;
            return (
              <>
                <Question
                  key={(index + 1).toString()}
                  handleAnswer={handleAnswer}
                  value={defaults[field.id]}
                  {...field}
                />
                {isRequired(field.key) && (
                  <HelperText type="error" key={(-1 * (index + 1)).toString()}>
                    This field is required
                  </HelperText>
                )}
              </>
            );
          })}
          <Button onPress={handleSubmit}>Next</Button>
        </View>
      </ScrollView>
    </View>
  ) : (
    <Text>Error</Text>
  );
};

export default InteractionScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
