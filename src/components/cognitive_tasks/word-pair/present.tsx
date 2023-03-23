import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import WordPair from './word-pair';

const Present = (props: any) => {
  const {wordPairs, duration, onEnd} = props;
  const [index, setIndex] = useState<number>(0);
  const countRef = React.useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (countRef.current < wordPairs.length - 1) {
        countRef.current++;
        setIndex(countRef.current);
      } else {
        onEnd();
        clearInterval(interval);
      }
    }, duration * 1000);

    return () => clearInterval(interval);
  }, [duration, onEnd, wordPairs]);

  return <WordPair wordPair={wordPairs[index]} />;
};

Present.propTypes = {
  wordPairs: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  duration: PropTypes.number.isRequired,
  onEnd: PropTypes.func.isRequired,
};

export default Present;
