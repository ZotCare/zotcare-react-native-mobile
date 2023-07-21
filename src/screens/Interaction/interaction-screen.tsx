import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {Fragment, useEffect, useRef} from 'react';
import {useState} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {Button, HelperText, Text} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScaledSheet} from 'react-native-size-matters';

import {NavigatorParams} from '@app/navigation/navigator';
import {submitInteraction} from '@app/services/interactions/api';
import {useInteraction} from '@app/services/interactions/service';

import InteractionField from './components/interaction-field/interaction-field';
import useCondition from './hooks/useCondition';

type Props = NativeStackScreenProps<NavigatorParams, 'interaction'>;

const InteractionScreen = ({route, navigation}: Props) => {
  const {id} = route.params;
  const {data: interaction, status} = useInteraction(id);
  const answersRef = useRef<any>({});
  const metaRef = useRef<any>({page_advances: []});
  const [defaults, setDefaults] = useState<any>({});
  const {check_or_and_collection: checkConditions} = useCondition(
    answersRef.current,
  );
  const [missedKeys, setMissedKeys] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [hideNext, setHideNext] = useState(false);
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);

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
      if (page === 0) {
        setPage(prevPage => findNextPage(prevPage));
      }
      interaction.data.pages.forEach((int_page: {fields: any[]}) => {
        int_page.fields.forEach(field => {
          if (field.default) {
            setDefaults((prev: any) => ({...prev, [field.key]: field.default}));
            answersRef.current[field.key] = field.default;
          }
        });
      });
      metaRef.current.started_at = new Date().getTime();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    scrollViewRef.current?.scrollTo({y: 0, animated: false});
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
      metaRef.current.finished_at = new Date().getTime();
      await submitInteraction(id, answersRef.current, metaRef.current);
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
      metaRef.current.page_advances.push({
        to: nextPage,
        from: page,
        time: new Date().getTime(),
      });
      setPage(nextPage);
      handleOptions(nextPage);
    }
  };

  const handleBack = () => {
    const prevPage = findPreviousPage(page - 1);
    metaRef.current.page_advances.push({
      to: prevPage,
      from: page,
      time: new Date().getTime(),
    });
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

  const isLastPage = () => {
    return findNextPage(page + 1) === -1;
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
            ref={scrollViewRef}
            bounces={false}
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={findIndicators()}
            contentContainerStyle={{flexGrow: 1}}>
            {interaction.data.pages[page].fields.map(
              (field: any, index: number) => {
                field.id = field.key;
                return (
                  <Fragment key={index.toString()}>
                    <InteractionField
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
                  {isLastPage() ? 'Submit' : 'Next'}
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
    marginTop: 'auto',
  },
  nextButton: {
    flex: 2,
  },
  backButton: {
    flex: 1,
  },
});
