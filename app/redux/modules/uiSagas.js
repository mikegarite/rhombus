import {
  call, fork, put, take, takeEvery, all
} from 'redux-saga/effects';
import { auth, publisherDetails, publisherAnalytics, publisherEmbeds } from '../../api';
import history from '../../utils/history';
import {
  VIEW_PUB,
  VIEW_PUB_ANALYTICS,
  VIEW_PUB_EMBEDS,
} from '../constants/uiConstants';
import {
  viewPublisher,
  publisherDataSuccess,
  publisherAnalyticsDataSuccess,
  publisherEmbedsDataSuccess,
} from '../actions/uiActions';


function getUrlVars() {
  const vars = {};
  const parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) { // eslint-disable-line
    vars[key] = value;
  });
  return vars;
}

function* viewPublisherSaga(payload) {
  try {
    const data = yield call(publisherDetails, payload);
    if (data) {
      yield put(publisherDataSuccess(data));

    } else {
      // Redirect to dashboard if no next parameter
      //yield history.push('/app');
    }
  } catch (error) {
    console.log('error');
  }
}

function* viewPublisherAnalyticsSaga(payload) {
  try {
    const data = yield call(publisherAnalytics, payload);
    if (data) {
      yield put(publisherAnalyticsDataSuccess(data));

    } else {

    }
  } catch (error) {
    console.log('error');
  }
}

function* viewPublisherEmbedsSaga(payload) {
  try {
    const data = yield call(publisherEmbeds, payload);
    if (data) {
      yield put(publisherEmbedsDataSuccess(data));
    } else {
      // Redirect to dashboard if no next parameter
      //yield history.push('/app');
    }
  } catch (error) {
    console.log('errrorrr');
  }
}

function* loginWithEmailSaga(payload) {  
  try {
    const data = yield call(auth, payload);
    if (data.token) {
      // Redirect to next route
      yield put(loginWithEmailSuccess(data));
      yield put(syncUser(data));
      localStorage.removeItem('userData');
      localStorage.setItem('userData', JSON.stringify(data));
      yield history.push('/app');
    } 
    else{
      yield put(loginWithEmailFailure(error));
    }
  } catch (error) {
      console.error(error);
    error = "Unauthorized User"
    console.log('this is the login error', error);
    yield put(loginWithEmailFailure(error));
  }
}


//= ====================================
//  WATCHERS
//-------------------------------------

function* dashboardDetailSaga() {
  yield all([
    takeEvery(VIEW_PUB, viewPublisherSaga),
    takeEvery(VIEW_PUB_ANALYTICS, viewPublisherAnalyticsSaga),
    takeEvery(VIEW_PUB_EMBEDS, viewPublisherEmbedsSaga)
  ]);
}

const uiSagas = [
  fork(dashboardDetailSaga),
];

export default uiSagas;
