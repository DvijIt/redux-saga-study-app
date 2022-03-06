import { LOCATION_CHANGE } from "connected-react-router";
import { matchPath } from "react-router";
import { call, apply, put, takeEvery, take, select, fork } from "redux-saga/effects";
import { DETAILS, getRoutesConfig, PEOPLE } from "../../../routes";
import { LOAD_USERS, LOAD_USERS_FAILURE, LOAD_USERS_SUCCESS } from "../../reducers/people/actions";
import {
  LOAD_USER_DETAILS,
  LOAD_USER_DETAILS_FAILURE,
  LOAD_USER_DETAILS_SUCCESS,
} from "../../reducers/peopleDetails/actions";
import { selectPeople } from "../../reducers/people/selectors";

export function* loadPeopleDetails({ payload }) {
  const { id } = payload;

  try {
    const request = yield call(fetch, `https://swapi.dev/api/people/${id}`);

    const data = yield apply(request, request.json);

    yield put({ type: LOAD_USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: LOAD_USER_DETAILS_FAILURE, payload: error.message });
  }
}

export function* loadPeopleList({ payload }) {
  const { page, search } = payload;

  try {
    const request = yield call(fetch, `https://swapi.dev/api/people?page=${page}&search=${search}`);

    const data = yield apply(request, request.json);

    yield put({ type: LOAD_USERS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: LOAD_USERS_FAILURE, payload: error.message });
  }
}

export function* routeChangeSaga() {
  while (true) {
    const action = yield take(LOCATION_CHANGE);

    const peoplePage = matchPath(action.payload.location.pathname, getRoutesConfig(PEOPLE));

    if (peoplePage) {
      const { page, search } = yield select(selectPeople);

      yield put({ type: LOAD_USERS, payload: { page, search } });
    }

    const detailsPage = matchPath(action.payload.location.pathname, getRoutesConfig(DETAILS));

    if (detailsPage) {
      const { id } = detailsPage.params;

      yield put({ type: LOAD_USER_DETAILS, payload: { id } });
    }
  }
}

function* peopleSaga() {
  yield fork(routeChangeSaga);
  yield takeEvery(LOAD_USERS, loadPeopleList);

  yield takeEvery(LOAD_USER_DETAILS, loadPeopleDetails);
}

export default peopleSaga;
