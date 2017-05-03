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
    //  if(index){
    //     ReactDOM.findDOMNode(this.refs.prevArea).style.top = '40px';
    //     ReactDOM.findDOMNode(this.refs.prevArea).style.width = '50%';
    //     ReactDOM.findDOMNode(this.refs.prevArea).style.height = '650px';
    //     this.setState({
    //         prevBtnActive:0
    //     })
    //  }
    //  else{
    //     ReactDOM.findDOMNode(this.refs.prevArea).style.top = '-95px';
    //     ReactDOM.findDOMNode(this.refs.prevArea).style.width = '100%';
    //     ReactDOM.findDOMNode(this.refs.prevArea).style.height = '770px';
    //     this.setState({
    //         prevBtnActive:1
    //     })
    //  }
    //   ReactDOM.findDOMNode(this.refs.prevBtn).className = style["prevArea-after"];
    const  prevBtnActive = this.state.prevBtnActive?0:1;
    this.setState({prevBtnActive})
}
    
    render() {
        const {rawText} = this.props;
        const index = this.state.prevBtnActive;
        return (
            <article
                    readOnly
                    // className = {style["prevArea"]}
                    className={this.state.prevBtnActive?style["prevArea-after"]:style["prevArea"]}
                    ref="prevArea"
                    >
                    <div className={style["prevButton"]}
                         onClick={this.handlePrevButtonClick.bind(this,index)}
                        >
                        <i className={`fa fa-arrows-alt`}  aria-label="全屏展示"></i>
                    </div>
                    <div  className={style["markDownArea"]}>
                        <Markdown>
                            {rawText}
                        </Markdown>
                    </div>
                  
            </article>
        );
    }
}

export default PrevArea;