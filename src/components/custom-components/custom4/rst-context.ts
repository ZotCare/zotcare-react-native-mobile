import {createContext} from 'react';

export type RSTContext = {
  testPauseDuration: number;
  feedbackDuration: number;
};

export default createContext<RSTContext>({
  testPauseDuration: 1,
  feedbackDuration: 3,
});
