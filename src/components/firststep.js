import React from 'react';
import {connect} from 'react-redux';
import config from '../json-config.json';
import {Fade} from 'react-animation-components';
import {Choice,Input} from './choice';
import {ANSWER_POST} from '../redux/constant';

class FirstStep  extends React.Component{
    update = false;
    constructor(props)
    {
        super(props);
        this.state = {
            questions:this.orderconfig(),
            answer:""
        }
    }

    componentDidMount()
    {
        const {dispatch,questions} = this.props;
        console.log(questions.loading);
        if(!questions.loading && this.state.questions[questions.step].data[0].dataVal[Object.keys(this.state.questions[questions.step].data[0].dataVal)[0]].action_type == 'automatic')
        {
            dispatch({type:ANSWER_POST,answer:false});
        }
    }

    componentDidUpdate()
    {
        const {dispatch,questions} = this.props;

        if(!questions.loading && this.state.questions[questions.step].data[0].dataVal[Object.keys(this.state.questions[questions.step].data[0].dataVal)[0]].action_type == 'automatic')
        {
            dispatch({type:ANSWER_POST,answer:false});
            this.update = false;
        }
    }

    orderconfig = () => {
        let data = [];
        for(let item in config.data.items)
        {
            if(config.data.items[item].data.length > 0)
            {
                data.push(config.data.items[item]);
            }
        }

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

    getaudio = () => {
        let {questions} = this.props;
        for(let item in this.state.questions[questions.step].data)
        {
            if(this.state.questions[questions.step].data[item].dataKey == 'Voice')
            {
                return this.state.questions[questions.step].data[item].dataVal;
            }
        }
    }

    gettype = () => {
        let {questions} = this.props;
        if(this.state.questions[questions.step].data.length > 0)
        {
            let keys = Object.keys(this.state.questions[questions.step].data[0].dataVal);
            return keys[0];
        }
        else
        {
            this.setState(state=>({
                ...state,
                index:state.index + 1
            }))
        }
    }

    getanswer = () => {
        let {questions} = this.props;
        if(this.state.questions[questions.step].data[0].dataVal[Object.keys(this.state.questions[questions.step].data[0].dataVal)[0]].answer)
        {
            return this.state.questions[questions.step].data[0].dataVal[Object.keys(this.state.questions[questions.step].data[0].dataVal)[0]].answer;
        }
        else
        {
            return false;
        } 
    }

    onselect = (key,answer) => {
        let data = {};
        data[key] = answer;
        const {dispatch} = this.props;
        this.setState({
            answer
        })

        window.setTimeout(()=>{
            dispatch({type:ANSWER_POST,answer:data});
            this.setState({
                answer:""
            })
        },1000);
        
    }

    onchange = (value) => {
        this.setState({
            answer:value
        })
    }   

    onsubmit = (key,e) => {
        var code = (e.keyCode ? e.keyCode : e.which);
        let data = {};
        const {dispatch} = this.props;
        data[key] = this.state.answer;

        if(code == 13)
        {
            dispatch({type:ANSWER_POST,answer:data});
            this.setState({
                answer:""
            })
        }
    }

    render()
    {
        let {questions} = this.props;
        console.log(this.state.questions[questions.step].data[0].dataVal[Object.keys(this.state.questions[questions.step].data[0].dataVal)[0]]);
        console.log(questions.step);
        return (
            <div className="firststep">
                <video id="background" muted loop src="/background.mp4" autoPlay></video>
                <audio ref="audio" src={this.getaudio()} autoPlay></audio>
                
                {
                    (!questions.loading && this.gettype() == 'Type_Choice') && (
                        <Fade in style={{margin:'auto',marginTop:'70vh'}} delay={1000}>
                            <Choice selected={this.state.answer} question={this.getanswer()} onSelected={this.onselect}></Choice>
                        </Fade>
                    )
                }        
                {
                    (!questions.loading && this.gettype() == 'Type_Input') && (
                        <Fade in style={{margin:'auto',marginTop:'70vh'}} delay={1000}>
                            <Input value={this.state.answer} question={this.getanswer()} onChange={this.onchange} onsubmit={this.onsubmit}></Input>
                        </Fade>
                    )
                }
             </div>
        )
        
    }
}

const mapstatetoprops = (state) => ({
    questions:state.question
})

export default connect(mapstatetoprops)(FirstStep);
