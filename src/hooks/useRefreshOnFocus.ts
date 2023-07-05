import {useFocusEffect} from '@react-navigation/native';
import React from 'react';

const useRefreshOnFocus = <T>(refetch: () => Promise<T>) => {
  const firstTimeRef = React.useRef(true);

  useFocusEffect(
    React.useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;

        return;
      }

      refetch();
    }, [refetch]),
  );
};

export default useRefreshOnFocus;
