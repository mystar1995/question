import {NEXT_STEP,ANSWER_POST,Loading, LOAD_END} from '../constant';

const initialstate = {
    loading:false,
    questions:[],
    answers:{},
    step:0
};

//answer will be stored in this

export default function question(state = initialstate,action)
{
    switch(action.type)
    {
        // when posting answer
        case Loading:
            return {...state,questions:action.questions};
        case LOAD_END:
            return {...state,loading:false};
        case ANSWER_POST:
            return {...state,loading:true};

        // when next step question has to be displayed
        case NEXT_STEP:
            if(action.answer)
            {
                return {...state,answers:{...state.answers,...action.answer},step:state.step + 1,loading:true};
            }
            else
            {
                return {...state,step:state.step+1,loading:false};
            }
        default:
            return state;
    }
}