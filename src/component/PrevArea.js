import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Markdown from 'markdown-to-jsx'
import style from '../style/prevArea.less'


class PrevArea extends Component {
    constructor(props){
        super(props)
        this.state={
            prevBtnActive:0
        }
    }

 handlePrevButtonClick=(index)=>{
     if(index){
        ReactDOM.findDOMNode(this.refs.prevBtn).style.top = '40px';
        ReactDOM.findDOMNode(this.refs.prevBtn).style.width = '50%';
        ReactDOM.findDOMNode(this.refs.prevBtn).style.height = '650px';
        this.setState({
            prevBtnActive:0
        })
     }
     else{
        ReactDOM.findDOMNode(this.refs.prevBtn).style.top = '-84px';
        ReactDOM.findDOMNode(this.refs.prevBtn).style.width = '98.5%';
        ReactDOM.findDOMNode(this.refs.prevBtn).style.height = '770px';
        this.setState({
            prevBtnActive:1
        })
     }
    //   ReactDOM.findDOMNode(this.refs.prevBtn).className = style["prevArea-after"];
    
}
    
    render() {
        const {rawText} = this.props;
        const index = this.state.prevBtnActive;
        return (
            <article
                    readOnly
                    className={style["prevArea"]}
                    ref="prevBtn"
                    >
                    <div className={style["prevButton"]}
                         onClick={this.handlePrevButtonClick.bind(this,index)}
                        >
                        <i className={`fa fa-arrows-alt`}  aria-label="全屏展示"></i>
                    </div>
                    <Markdown>
                        {rawText}
                    </Markdown>
            </article>
        );
    }
}

export default PrevArea;