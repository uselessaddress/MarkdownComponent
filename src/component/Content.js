import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import ToolBar from './ToolBar'
import EditArea from './EditArea'
import PrevArea from './PrevArea'

import '../style/Content.less'



let defaultCode = "```"+
   `<EditArea
                EditAreaChange={this.handleEditAreaChange}
                curPos={curPos}
                rawText={rawText}
                EditAreaSelect={this.handleEditAreaSelection}
                handleTabPress={this.handleTabPress}
           />`+"```"

let defaultWord = `
## MarkDown编辑器 ##  
---  

## 一级标题
### 二级标题
#### 三级标题
##### 四级标题
###### 五级标题
  
---  

### 无序列表

* 1
* 2 
* 3  
  
---  

### 有序列表

1. 1
2. 2
3. 3  
  
---  

### 引用文字
> 这是一段引用文字    
  

### 图片
  
![hello](https://constantin.cc/img/hello.jpg)
  
---  

### 链接  
  
[这是一个链接](https://constantin.cc)

---  

### 粗体和斜体


* **这是粗体文字**  
  

* _这是斜体文字_
  
---  
  
### 代码框

    ${defaultCode}

---  

### 分隔符
  
---  

这上面是一条分隔符  
  
---  

Powed By : [Constantin](https://constantin.cc)`

;

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rawText: defaultWord,
            history: [''],
            selection: {
                start: 0,
                end: 0
            },
            curPos: undefined
            // prevBtnActive:0
        }
    }

    // handlePrevButtonClick=(index)=>{
    //     this.setState({
    //         prevBtnActive:index
    //     })
    // }

    componentDidMount() {
        let rawText = window.localStorage.getItem('Text');
        // if(rawText===null){
        //     rawText='';
        // }
        const WindowHeight = window.innerHeight;
        const ContentHeight = `${WindowHeight - 80}px`;
        ReactDOM.findDOMNode(this.refs.Container).style.height = ContentHeight;
        this.setState({ rawText })
        
    }


    handleTabPress = (e) => {
        let { rawText, selection, history } = this.state;
        let { curPos } = this.state;
        let { start, end } = selection,
            insert = start === end;
       
        if (e.keyCode === 9) {
            let textLeft = rawText.slice(0, start),
                textRight = rawText.slice(end),
                range = rawText.slice(start, end).trim().replace(/\n/g, '');
            e.preventDefault();
            range = '    ';
            curPos = start + 4;
            if (!curPos) {
                curPos = start + range.length;
            }
            this.setState({
                rawText: textLeft + range + textRight,
                curPos
            })
        }else if (e.ctrlKey && e.keyCode === 90) {
            e.preventDefault();
            rawText = history.pop();
            if(rawText===null||rawText===undefined){rawText=''}
            this.setState({ rawText })
            return;
        }else if(e.keyCode<8 || e.keyCode>33){
            if (history.length > 100) {
           
                history.shift();
                history.push(rawText);
                this.setState({ history })
            } else {
            
                history.push(rawText);
                this.setState({ history })
               
            }
        }
    }




    handleToolClick = (fun) => {
        let { rawText, selection } = this.state;

        let history = this.state.history;

        let { curPos } = this.state;
        const { start, end } = selection,
            insert = start === end;

            if(rawText===null){rawText=''}
           
        let textLeft = rawText.slice(0, start),
            textRight = rawText.slice(end),
            range = rawText.slice(start, end).trim().replace(/\n/g, '');
        switch (fun) {
            case 'photo':
                range = '![](url)';
                curPos = start + 2;
                break;
            case 'link':
                range = '[](url)';
                curPos = start + 1;
                break;
            case 'quote':
                range = '> ';
                break;
            case 'code':
                range = '\n```\n\n```';
                curPos = start + 5;
                break;
            case 'ul':
                range = '\n* ';
                break;
            case 'ol':
                range = '\n1. ';
                break;
            case 'header':
                range = `## ${range} ##`;
                if (insert) {
                    curPos = start + 3;
                }
                break;
            case 'bold':
                range = `**${range}**`;
                if (insert) {
                    curPos = start + 2;
                }
                break;
            case 'italic':
                range = `_${range}_`;
                if (insert) {
                    curPos = start + 1;
                }
                break;
            case 'divideLine':
                range = `  \n---  \n`
                break;
            case 'newline':
                range = '  \n'
                break;
        }
        if (!curPos) {
            curPos = start + range.length;
        }
        this.setState({
            rawText: textLeft + range + textRight,
            curPos
        })
        if (history.length > 100) {
            history.shift();
            history.push(rawText);
            this.setState({ history })
        } else {
            history.push(rawText);
            this.setState({ history })
        }
    }

    handleEditAreaChange = (e) => {
        const rawText = e.target.value;
        this.setState({ rawText, curPos: undefined })
        var Storage = window.localStorage
        Storage.setItem('Text', this.state.rawText)
    }
    handleEditAreaSelection = (e) => {
        const start = e.target.selectionStart,
            end = e.target.selectionEnd;
        this.setState({
            selection: {
                start: start,
                end: end
            },
            curPos: undefined
        })
    }
    handleClearArea = () => {
        const rawText = '';
        this.setState({ rawText })
        window.localStorage.clear();
    }


    render() {
        let btns = [
            {
                fun: "header",
                ico: "header",
                label: "添加标题"
            }, {
                fun: "bold",
                ico: "bold",
                label: "添加粗体"
            }, {
                fun: "italic",
                ico: "italic",
                label: "添加斜体"
            }, {
                fun: "photo",
                ico: "photo",
                label: "添加图片"
            }, {
                fun: "quote",
                ico: "quote-left",
                label: "添加引用"
            }, {
                fun: "code",
                ico: "code",
                label: "添加代码片"
            }, {
                fun: "link",
                ico: "link",
                label: "添加链接"
            }, {
                fun: "ul",
                ico: "list-ul",
                label: "添加无序列表"
            }, {
                fun: "ol",
                ico: "list-ol",
                label: '添加有序列表'
            }, {
                fun: "newline",
                ico: "arrow-down",
                label: '换行'
            }, {
                fun: "divideLine",
                ico: "arrows-h",
                label: '横线'
            }
        ];
        const { rawText, curPos } = this.state;
        return (
            <div className="content" ref="Container">
                <ToolBar btns={btns}
                    title={this.props.title}
                    handleClick={this.handleToolClick}
                    ClearArea={this.handleClearArea}
                    rawText={rawText} />

                <EditArea
                    EditAreaChange={this.handleEditAreaChange}
                    curPos={curPos}
                    rawText={rawText}
                    EditAreaSelect={this.handleEditAreaSelection}
                    handleTabPress={this.handleTabPress}
                />
                <PrevArea rawText={rawText}

                />
            </div>
        );
    }
}

export default Content;









