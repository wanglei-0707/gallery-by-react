## React实现图片画廊效果
初学React， 用这个小项目练练手

## 技术栈
React + scss + yeoman + generator-react-webpack

```
npm install -g yo
npm install -g generator-react-webpack
mkdir my-new-project && cd my-new-project
yo react-webpack
npm run serve
```

## scss
1. @at-root: 可以使选择器不嵌套，而是将内部的选择器放在全局上。

```
.img-sec{
    @at-root{
        .img-figure{}
        .img-back{}
    }
}

//编译后

.img-sec{}
.img-figure{}
.img-back{}
```

## css3实现卡片翻转
perspective + transform-origin + transform-style + transform: rotateY + backface-visibility: hidden;
1. perspective: 这个属性规定观察者与z=0平面的距离，使具有三维位置变化的元素产生透视效果。这个属性设置在包裹元素上。当为元素设置该属性后，其子元素会获得透视效果，而不是元素本身。
2. transform-style: flat(子元素不保留3D位置) | preserve-3d(子元素保留3d位置)
3. backface-visibility: visible | hidden 定义当元素不面向屏幕时元素是否可见

## react
1. this.refs VS ReactDOM.fingDOMNode()

2. ES6写法的组件事件处理函数，状态设置
```
class ControllerUnit extends React.Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {};
    }
    handleClick (e) {
        //
        e.stopPropagation();
        e.preventDefault();
    }
    render () {
        return (
            <span className={className} onClick={this.handleClick}></span>
        );
    }
}
```

## 遇到的问题
1. Error: listen EACCES 127.0.0.1:8000    

    换个端口就好了
2. 使用iconfont矢量图标时，添加iconfont.css里的文件后报错
![](src/images/error.png).原本每种字体文件都处理不了，但是把eot和svg url中“？”后面的删掉了之后可以了，但是ttf和eot文件还是不行！！！

    醉了！！！查了一个小时，调了一个小时，还是没解决，突然间想到难道是需要重启一下服务器？然后就重启了一下，然后就真的没问题了！！！！！
