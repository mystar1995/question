import {takeEvery,all,delay,put,fork,call} from 'redux-saga/effects';
import {ANSWER_POST,Loading,questionurl,NEXT_STEP} from '../constant';
import {getdata} from '../../api/apiservice';
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

function  orderconfig(config){
    let data = [];

    //prepare data from json file
    for(let item in config.data.items)
    {
        if(config.data.items[item].data.length > 0)
        {
            data.push(config.data.items[item]);
        }
    }

    //sorting array with order value that it has
    data.sort(function(a,b){
        let ordera = 0; let orderb = 0;

        for(let itemconfig in a.data)
        {
            if(a.data[itemconfig].dataKey == 'Order'){
                ordera = a.data[itemconfig].dataVal;
            }
        }

        for(let itemconfig in b.data)
        {
            if(b.data[itemconfig].dataKey == 'Order')
            {
                orderb = b.data[itemconfig].dataVal;
            }
        }

        return ordera - orderb;
    })
    
    console.log(data);
    return data;
}

export function* init_questionitems()
{
    try
    {
        let questions = yield call(getdata,questionurl);
        yield put({type:Loading,questions:orderconfig(questions.data)});
    }
    catch(err)
    {

    }
}

export default function* question()
{
    yield all(
        [
            fork(init_question),
            fork(init_questionitems)
        ]
    )
}