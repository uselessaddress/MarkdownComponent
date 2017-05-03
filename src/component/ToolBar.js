import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import style from '../style/toolBar.less'

class ToolBtn extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {ico, label} = this.props;

        return (
            <li className={style["item"]}
                onClick={this.props.handleClick}>
                <a  aria-label={label}
                    >
                    <i className={`fa fa-${ico}`} aria-hidden="true" ></i>
                </a>
            </li>
        );
    }
}


class ToolBar extends Component {
    constructor(props){
        super(props)
    }
    handleDownLoad=()=>{
        const rawText = this.props.rawText;
        var blob = new Blob([`${rawText}`]);
        ReactDOM.findDOMNode(this.refs.down).href = window.URL.createObjectURL(blob);
    }
    render() {
        const {btns} =  this.props;
        return (
            <div className={style["toolBar"]}>
                <ul>
                    {btns.map((btn,index) => {
                        const {fun, ico, label} = btn;
                        return (<ToolBtn
                                    key={index}
                                    fun={fun}
                                    ico={ico}
                                    label={label}
                                    handleClick={this.props.handleClick.bind(this,fun)}
                                    />)
                        }
                    )}
                </ul>
            <div className={style["clear-btn"]}
                     onClick={this.props.ClearArea}>全部清除</div>
             <a className={style["download-btn"]}
                    ref = "down"
                    download={`${this.props.title}.md`}
                    onClick={this.handleDownLoad}    
                     >下载文件</a>
            </div>
           
            

        );
    }
}

export default ToolBar;
