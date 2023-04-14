import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {Fragment, useEffect, useRef} from 'react';
import {useState} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {Button, HelperText, Text} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScaledSheet} from 'react-native-size-matters';

import Question from '@app/components/interaction-components/question/question';
import {submitInteraction} from '@app/modules/interactions/api';
import {useInteraction} from '@app/modules/interactions/service';
import {NavigatorParams} from '@app/navigation/navigator';

import {useCondition} from './conditions';

type Props = NativeStackScreenProps<NavigatorParams, 'interaction'>;

const InteractionScreen = ({route, navigation}: Props) => {
  const {id} = route.params;
  const {data: interaction, status} = useInteraction(id);
  const answersRef = useRef<any>({});
  const [defaults, setDefaults] = useState<any>({});
  const {check_or_and_collection: checkConditions} = useCondition(
    answersRef.current,
  );
  const [missedKeys, setMissedKeys] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [hideNext, setHideNext] = useState(false);
  const insets = useSafeAreaInsets();

  const findNextPage = (start: number) => {
    for (let i = start; i < interaction?.data.pages.length; i++) {
      if (checkConditions(interaction?.data.pages[i].conditions)) {
        return i;
      }
    }
    return -1;
  };

  const findPreviousPage = (start: number) => {
    for (let i = start; i >= 0; i--) {
      if (checkConditions(interaction?.data.pages[i].conditions)) {
        return i;
      }
    }
    return -1;
  };

  useEffect(() => {
    if (status === 'success') {
      navigation.setOptions({title: interaction.name});
      setPage(findNextPage(0));
      interaction.data.pages.forEach((int_page: {fields: any[]}) => {
        int_page.fields.forEach(field => {
          if (field.default) {
            setDefaults((prev: any) => ({...prev, [field.key]: field.default}));
            answersRef.current[field.key] = field.default;
          }
        });
      });
    }
  }, [interaction]);

  const handleAnswer =
    (questionKey: string) =>
    async (answer: any, skip: boolean = false) => {
      if (missedKeys.includes(questionKey)) {
        setMissedKeys(prev => prev.filter(key => key !== questionKey));
      }
      answersRef.current[questionKey] = answer;
      if (skip) {
        handleSubmit();
      }
    };

  const isRequired = (key: string) => {
    return missedKeys.includes(key);
  };

  const showHeader = () => {
    return !interaction?.data.pages[page]?.options?.hide_header ?? true;
  };

  const handleOptions = (nextPage: number) => {
    setHideNext(
      interaction?.data.pages[nextPage]?.options?.hide_buttons ?? false,
    );
    navigation.setOptions({
      orientation:
        interaction?.data.pages[nextPage]?.options?.screen_orientation ??
        'default',
      headerShown:
        !interaction?.data.pages[nextPage]?.options?.hide_header ?? true,
    });
  };

  const handleSubmit = async () => {
    const nextPage = findNextPage(page + 1);
    const requiredKeys = interaction?.data.pages[page].fields
      .filter((field: {required: any}) => field.required)
      .map((field: {key: any}) => field.key);
    const missingKeys = requiredKeys.filter(
      (key: string) =>
        answersRef.current[key] === undefined ||
        answersRef.current[key] === '' ||
        (Array.isArray(answersRef.current[key]) &&
          answersRef.current[key].length === 0),
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
    setDefaults((prev: any) => ({...prev, ...answersRef.current}));
    if (nextPage === -1) {
      await submitInteraction(id, answersRef.current);
      Notifier.showNotification({
        title: 'Interaction finished',
        description: 'You have finished the interaction',
        Component: NotifierComponents.Alert,
        componentProps: {
          alertType: 'success',
        },
      });
      navigation.navigate('tab');
    } else {
      setPage(nextPage);
      handleOptions(nextPage);
    }
  };

  const handleBack = () => {
    const prevPage = findPreviousPage(page - 1);
    if (prevPage !== -1) {
      setPage(prevPage);
      handleOptions(prevPage);
    } else {
      navigation.goBack();
    }
  };

  const findIndicators = () => {
    const indexArray: Array<number> = [];

    for (let i = 0; i < interaction?.data.pages[page].fields.length; ++i) {
      if (
        interaction?.data.pages[page].fields[i].type === 'indicator' &&
        interaction?.data.pages[page].fields[i].sticky
      ) {
        indexArray.push(i);
      }
    }
    return indexArray;
  };

  return (
    <View
      style={{
        flex: 1,
        paddingBottom: insets.bottom,
        paddingTop: showHeader() ? 0 : insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}>
      <View style={styles.paddedContainer}>
        {status === 'success' ? (
          <ScrollView
            stickyHeaderIndices={findIndicators()}
            contentContainerStyle={{flexGrow: 1}}>
            {interaction.data.pages[page].fields.map(
              (field: any, index: number) => {
                field.id = field.key;
                return (
                  <Fragment key={index.toString()}>
                    <Question
                      handleAnswer={handleAnswer}
                      value={defaults[field.id]}
                      {...field}
                    />
                    {isRequired(field.id) && (
                      <HelperText type="error">
                        This field is required
                      </HelperText>
                    )}
                    <View style={styles.fieldMargin} />
                  </Fragment>
                );
              },
            )}
            <View style={styles.container} />
            {!hideNext && (
              <View style={styles.buttonsContainer}>
                {interaction.back && (
                  <Button
                    onPress={handleBack}
                    style={styles.backButton}
                    mode="contained-tonal">
                    Back
                  </Button>
                )}
                <Button
                  style={styles.nextButton}
                  mode="contained"
                  onPress={handleSubmit}>
                  Next
                </Button>
              </View>
            )}
          </ScrollView>
        ) : status === 'loading' ? (
          <Text>Loading</Text>
        ) : (
          <Text>Error</Text>
        )}
      </View>
    </View>
  );
};

export default InteractionScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  paddedContainer: {
    flex: 1,
    paddingHorizontal: '10@s',
  },
  fieldsContainer: {
    flex: 1,
  },
  fieldMargin: {
    marginBottom: '10@s',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  nextButton: {
    flex: 2,
  },
  backButton: {
    flex: 1,
  },
});
