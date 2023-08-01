import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

import rootReducers from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
export default configureStore({
  reducer: rootReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware).concat(thunk),
});
sagaMiddleware.run(sagas);
