import React from 'react';

export const Choice = ({selected,onSelected,question=[]}) => {
    return (
        <div className="choice">
            {
                question.map((item,index)=>{
                    return (
                        <div key={index} onClick={()=>onSelected(item.key,item.value)} className={selected == item.value?'button selected':'button'}>{item.field}</div>
                    )
                    
                })
            }
        </div>
    )
}

export const Input = ({value,onChange,question = [],onsubmit}) => {
    return (
        <div className="choice">
            <input className="form-control" value={value} onChange={(e)=>onChange(e.target.value)} onKeyPress={(e)=>onsubmit(question[0].key,e)}></input>
        </div>
    )
}

export const Message = ({question = []}) => {
    return (
        <div className="choice">
            <h4></h4>
        </div>
    )
}