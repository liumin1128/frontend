import { combineReducers } from 'redux';
import { reducerFactory } from '../utils/reducer';

const reducers = reducerFactory([
  'loading',
  {
    namespace: 'global',
    initState: { locale: 'en' },
  },
  {
    namespace: 'book',
    initState: { },
  },
  'user',
]);

export default combineReducers({
  ...reducers,
});
