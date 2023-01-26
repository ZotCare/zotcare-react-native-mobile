import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

export default (rootReducer, rootSaga) => {
  const sagaMiddleware = createSagaMiddleware();
  const enhancer = applyMiddleware(sagaMiddleware, thunk);
  const store = createStore(rootReducer, enhancer);
  sagaMiddleware.run(rootSaga);

  //return { store, persistor }
  return {store};
};
