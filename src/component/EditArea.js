import React, { Component } from 'react';
import style from '../style/editArea.less'

class EditArea extends Component {
    constructor(props){
        super(props)
    }
   componentDidUpdate (){
        let {curPos} = this.props,
            textarea = document.getElementsByClassName(style['editArea'])[0];
        if(!curPos){
            return;
        }
        textarea.setSelectionRange(curPos,curPos);
        textarea.focus();

   } 

    render() {
        const Text = this.props.rawText;
        return (
            <textarea 
                autoFocus
                className={style["editArea"]}
                onChange={this.props.EditAreaChange}
                onSelect={this.props.EditAreaSelect}
                value={Text}
                >
            </textarea>
        );
    }
}

export default EditArea;