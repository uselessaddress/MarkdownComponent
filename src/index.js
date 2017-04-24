import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Title from './component/Title'
import Content from './component/Content'
import 'font-awesome-webpack';
import './style/app.less'

class App extends Component {
    render() {
        return ( 
            <div>
                <Title/>
                <Content/>
            </div>
        );
    }
}


ReactDOM.render( <App/> , document.getElementById('app'));

