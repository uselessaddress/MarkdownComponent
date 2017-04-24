import React, { Component } from 'react';
import style from '../style/title.less'

class Title extends Component {
    render() {
        return (
            <div>
                <div className = {style["topBar"]}></div>
                <div className = {style["inputArea"]}>
                    <input type="text" placeholder="文章标题"/>
                    <a className={style["submit"]}>发表文章</a>
                </div>
            </div>
        );
    }
}

export default Title;