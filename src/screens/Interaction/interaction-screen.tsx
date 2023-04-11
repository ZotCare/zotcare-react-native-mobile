import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {useState} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {Button, HelperText, Text} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';

import Question from '../../components/interaction-components/question/question';
import {useInteraction} from '../../modules/interactions/service';
import {NavigatorParams} from '../../navigation/navigator';
import {useCondition} from './conditions';

type Props = NativeStackScreenProps<NavigatorParams, 'interaction'>;

const InteractionScreen = ({route}: Props) => {
  const {id} = route.params;
  const {data: interaction, status} = useInteraction(id);
  const [answers, setAnswers] = useState<any>({});
  const [defaults, setDefaults] = useState<any>({});
  const {check_or_and_collection: checkConditions} = useCondition(answers);
  const [missedKeys, setMissedKeys] = useState<string[]>([]);


  const findNextPage = (start: number) => {
    for (let i = start; i < interaction.data.pages.length; i++) {
      if (checkConditions(interaction.data.pages[i].conditions)) {
        return i;
      }
    }
    return -1;
  };

  const [page, setPage] = useState(findNextPage(0));

  useEffect(() => {
    interaction.data.pages.forEach((int_page: {fields: any[]}) => {
      int_page.fields.forEach(field => {
        if (field.default) {
          setDefaults((prev: any) => ({...prev, [field.key]: field.default}));
          setAnswers((prev: any) => ({...prev, [field.key]: field.default}));
        }
      });
    });
  }, [interaction]);

  const handleAnswer = (questionKey: string) => (answer: any) => {
    if (missedKeys.includes(questionKey)) {
      setMissedKeys(prev => prev.filter(key => key !== questionKey));
    }
    setAnswers({...answers, [questionKey]: answer});
  };

  const isRequired = (key: string) => {
    return missedKeys.includes(key);
  };

  const handleSubmit = () => {
    const nextPage = findNextPage(page + 1);
    const requiredKeys = interaction.data.pages[page].fields
      .filter((field: {required: any}) => field.required)
      .map((field: {key: any}) => field.key);
    const missingKeys = requiredKeys.filter(
      (key: string) =>
        answers[key] === undefined ||
        answers[key] === '' ||
        (Array.isArray(answers[key]) && answers[key].length === 0),
    );
    setMissedKeys(missingKeys);
    if (missingKeys.length > 0) {
      Notifier.showNotification({
        title: 'Missing required fields',
        description: 'Please fill out all required fields',
        Component: NotifierComponents.Alert,
        componentProps: {
          alertType: 'error',
        },
      });
      return;
    }
    setDefaults((prev: any) => ({...prev, ...answers}));
    if (nextPage === -1) {
      Notifier.showNotification({
        title: 'Interaction finished',
        description: 'You have finished the interaction',
        Component: NotifierComponents.Alert,
        componentProps: {
          alertType: 'success',
        },
      });
    } else {
      setPage(nextPage);
    }
  };

  const findIndicators = () => {
    const indexArray: Array<number> = []
    for (let i = 0; i < interaction.data.pages[page].fields.length; ++i) {
      if (interaction.data.pages[page].fields[i].type === "indicator" &&
          interaction.data.pages[page].fields[i].sticky)
        indexArray.push(i)
    }
    return indexArray
  }

  return status === 'success' ? (

    <View>
      <ScrollView 
        stickyHeaderIndices={ findIndicators() }
        >
          
          {interaction.data.pages[page].fields.map(
            (field: any, index: number) => {
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
                    <HelperText
                      type="error"
                      key={(-1 * (index + 1)).toString()}>
                      This field is required
                    </HelperText>
                  )}
                </>
              );
            },
          )}
          <Button onPress={handleSubmit}>Next</Button>
        
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
  headerStyle : {
    backgroundColor: '#e5e5e5',
    height: 20
  },
  myShadowStyle: {
    elevation: 3,
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      height: 3,
      width: 0,
    }
  }
});
