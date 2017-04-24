import React, { Component } from 'react';
import ToolBar from './ToolBar'
import EditArea from './EditArea'
import PrevArea from './PrevArea'

import '../style/Content.less'

class Content extends Component {
    constructor(props){
        super(props);
        this.state = {
            rawText:'',
            selection:{
                start:0,
                end:0
            },
            curPos:undefined
            // prevBtnActive:0
        }
    }

    // handlePrevButtonClick=(index)=>{
    //     this.setState({
    //         prevBtnActive:index
    //     })
    // }
    handleToolClick=(fun)=>{
        const {rawText,selection} = this.state;
        let {curPos} = this.state;
        const {start,end} = selection,
            insert = start === end;
        let textLeft = rawText.slice(0,start),
            textRight = rawText.slice(end),
            range=rawText.slice(start,end).trim().replace(/\n/g,'');
        switch(fun){
            case 'photo':
                range='![](url)';
                curPos= start + 2;
                break;
            case 'link':
                range='[](url)';
            case 'quote':
                range='> ';
                break;
            case 'code':
                range='``';
                curPos=start+1;
                break;
            case 'ul':
                range='* ';
                break;
            case 'ol':
                range='1. ';
                break;
            case 'header':
                range=`## ${range} ##`;
                if(insert){
                    curPos=start+3;
                }
                break;
            case 'bold':
                range=`**${range}**`;
                if(insert){
                    curPos = start+2;
                }
                break;
            case 'italic':
                range=`_${range}_`;
                if(insert){
                    curPos=start+1;
                }
                break;
            case 'newline':
                range='  \n'
                break;
        }
        if(!curPos){
            curPos=start+range.length;
        }
        this.setState({
            rawText:textLeft + range + textRight,
            curPos
        })
    }

    handleEditAreaChange=(e) => {
        const rawText = e.target.value;
        this.setState({rawText,curPos:undefined})
    }
    handleEditAreaSelection=(e) => {
        const start = e.target.selectionStart,
            end=e.target.selectionEnd;
        this.setState({
            selection:{
                start:start,
                end:end
            },
            curPos:undefined
        })
    }
    
    
    render() {
        let btns=[
            {
                fun:"header",
                ico:"header",
                label:"添加标题"
            },{
                fun:"bold",
                ico:"bold",
                label:"添加粗体"
            },{
                fun:"italic",
                ico:"italic",
                label:"添加斜体"
            },{
                fun:"photo",
                ico:"photo",
                label:"添加图片"
            },{
                fun:"quote",
                ico:"quote-left",
                label:"添加引用"
            },{
                fun:"code",
                ico:"code",
                label:"添加代码片"
            },{
                fun:"link",
                ico:"link",
                label:"添加链接"
            },{
                fun:"ul",
                ico:"list-ul",
                label:"添加无序列表"
            },{
                fun:"ol",
                ico:"list-ol",
                label:'添加有序列表'
            },{
                fun:"newline",
                ico:"arrow-down",
                label:'换行'
            }
        ];
        const {rawText,curPos} = this.state;
        return (
            <div className="content">
                <ToolBar btns={btns}
                         handleClick={this.handleToolClick}/>
                <EditArea 
                    EditAreaChange={this.handleEditAreaChange}
                    curPos={curPos}
                    rawText={rawText}
                    EditAreaSelect={this.handleEditAreaSelection}
                   
                    />
                <PrevArea rawText={rawText}
                       
                            />
            </div>
        );
    }
}

export default Content;