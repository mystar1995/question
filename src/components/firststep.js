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
         //when the component has to be moved to next automatically
        if(!questions.loading && this.state.questions[questions.step].data[0].dataVal[Object.keys(this.state.questions[questions.step].data[0].dataVal)[0]].action_type == 'automatic')
        {
            dispatch({type:ANSWER_POST,answer:false});
        }
    }

    componentDidUpdate()
    {
        const {dispatch,questions} = this.props;

        //when the component has to be moved to next automatically
        if(!questions.loading && this.state.questions[questions.step].data[0].dataVal[Object.keys(this.state.questions[questions.step].data[0].dataVal)[0]].action_type == 'automatic')
        {
            dispatch({type:ANSWER_POST,answer:false});
            this.update = false;
        }
    }

    //function to ordering json input with order value
    orderconfig = () => {
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

    //get audio file from provided step info
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

    //getting component type from step info
    gettype = () => {
        let {questions} = this.props;
        if(this.state.questions[questions.step].data.length > 0)
        {
            let keys = Object.keys(this.state.questions[questions.step].data[0].dataVal);
            return keys[0];
        }
    }

    //getting component answer data and component type
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

    //on choice component, when clicking component button
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

    //on input component, the value of input is changed
    onchange = (value) => {
        this.setState({
            answer:value
        })
    }   

    //on input component, when enter clicked, then it will submit the result
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
        console.log(questions.step);
        return (
            <div className="firststep">
                <video id="background" muted loop src="/background.mp4" autoPlay></video>
                <audio src={this.getaudio()} autoPlay></audio>
                {/* component type is choice */}
                
                {
                    (!questions.loading && this.gettype() == 'Type_Choice') && (
                        <Fade in style={{margin:'auto',marginTop:'70vh'}} delay={1000}>
                            <Choice selected={this.state.answer} question={this.getanswer()} onSelected={this.onselect}></Choice>
                        </Fade>
                    )
                }        

                {/* component type is input */}
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
