import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Title from './component/Title'
import Content from './component/Content'
import 'font-awesome-webpack';
import './style/app.less'

class App extends Component {
    constructor(props){
        super(props);
        this.state={
            title:'默认标题'
        }
    }
    handleTitleChange=(e)=>{
        const title=e.target.value;
        this.setState({title})   
    }
    render() {
        return ( 
            <div>
                <Title title={this.state.title}
                        TitleChange={this.handleTitleChange}/>
                <Content title={this.state.title}/>
            </div>
        );
    }
}


ReactDOM.render( <App/> , document.getElementById('app'));

