import {NEXT_STEP,ANSWER_POST} from '../constant';

const initialstate = {
    loading:false,
    answers:{},
    step:0
};

export default function question(state = initialstate,action)
{
    switch(action.type)
    {
        case ANSWER_POST:
            return {...state,loading:true};
        case NEXT_STEP:
            if(action.answer)
            {
                return {...state,answers:{...state.answers,...action.answer},step:state.step + 1,loading:false};
            }
            else
            {
                return {...state,step:state.step+1,loading:false};
            }
        default:
            return state;
    }
}