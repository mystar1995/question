import {takeEvery,all,delay,put,fork} from 'redux-saga/effects';
import {ANSWER_POST,Loading,NEXT_STEP} from '../constant';

//when answer is posting
export function* init_question()
{
    yield takeEvery(ANSWER_POST,function*(payload){
        if(!payload.answer)
        {
            yield delay(4000);
        }
        yield delay(1000);
        yield put({type:NEXT_STEP,answer:payload.answer});
    })
}

export default function* question()
{
    yield all(
        [
            fork(init_question)
        ]
    )
}