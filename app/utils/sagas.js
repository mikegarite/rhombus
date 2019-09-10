import { all } from 'redux-saga/effects';
import authSagas from 'enl-redux/modules/authSagas';
import uiSagas from 'enl-redux/modules/uiSagas';


export default function* sagas() {
  yield all([
    ...authSagas,
    ...uiSagas,
  ]);
}
