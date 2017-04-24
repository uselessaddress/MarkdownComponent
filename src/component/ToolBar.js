import React, { Component } from 'react';
import style from '../style/toolBar.less'

class ToolBtn extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {ico, label} = this.props;

        return (
            <li >
                <a  aria-label={label}
                    onClick={this.props.handleClick}
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
            </div>

        );
    }
}

export default ToolBar;
