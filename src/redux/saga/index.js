import {all} from 'redux-saga/effects';
import question from './question';

export default function* runSaga()
{
    yield all([
        question()
    ])
}