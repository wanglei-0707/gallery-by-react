require('normalize.css/normalize.css');
require('../fonts/icons/iconfont.css');
require('styles/App.scss');
var imgsData = require('datas/ImageData.json');

import React from 'react';
import ReactDOM from 'react-dom';

var imgsDataArr = (function(imgsDataArr) {
    for (var i=0, len=imgsDataArr.length; i<len; i++) {
        let curImg = imgsDataArr[i];
        curImg.id = i;
        curImg.imageURL = require('../images/' + curImg.filename);
    }
    return imgsDataArr;
})(imgsData);

class ImgFigure extends React.Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick (e) {
        if(this.props.arrange.isCenter){
            this.props.reverse();
        }else{
            this.props.center();
        }
        e.stopPropagation();
        e.preventDefault();
    }
    render() {
        var styleObj = {};
        if(this.props.arrange.pos){
            styleObj = this.props.arrange.pos;
        }
        if(this.props.arrange.rotate){
            ['MozTransform', 'WebkitTransform', 'msTransform', 'transform'].forEach(value => {
                styleObj[value] = 'rotate(' + this.props.arrange.rotate + 'deg)';
            });
        }
        if(this.props.arrange.isCenter){
            styleObj['zIndex'] = '11';
        }
        var figureClassName = 'img-figure';
        figureClassName += this.props.arrange.isReverse ? ' img-reverse' : '';
        return (
            <figure className={figureClassName} style={styleObj} onClick={this.handleClick}>
                <img src={this.props.data.imageURL} alt={this.props.data.title} />
                <figcaption >
                    <h2 className='img-title'>{this.props.data.title}</h2>
                    <div className='img-back' onClick={this.handleClick}>
                        <p>
                            {this.props.data.description}
                        </p>
                    </div>
                </figcaption>
            </figure>
        );
    }
}

class ControllerUnit extends React.Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick (e) {
        if(this.props.arrange.isCenter){
            this.props.reverse();
        }else{
            this.props.center();
        }
        e.stopPropagation();
        e.preventDefault();
    }
    render () {
        var className = 'controller-unit';
        if(this.props.arrange.isCenter){
            className += ' is-center';
        }
        if(this.props.arrange.isReverse){
            className += ' is-reverse';
        }
        return (
            <span className={className} onClick={this.handleClick}></span>
        );
    }
}

class GalleryByReactApp extends React.Component {
    constructor(){
        super();
        this.constant = {
            centerPos: {
                left: 0,
                top: 0
            },
            leftSec: {
                posX: [0, 0],
                posY: [0, 0]
            },
            rightSec: {
                posX: [0, 0],
                posY: [0, 0]
            },
            topSec: {
                posX: [0, 0],
                posY: [0, 0]
            }
        };
        this.state = {
            imgsArrangeArr : []
        }
    }
    get30DegRandom () {
        return (Math.random > 0.5 ? '' : '-') + Math.floor(Math.random() * 30);
    }
    randomPos (x, y) {
        return Math.floor(Math.random() * (y - x) + x);
    }
    figureReverse (index) {
        return function(){
            var imgsArrangeArr = this.state.imgsArrangeArr;
            imgsArrangeArr[index].isReverse = !imgsArrangeArr[index].isReverse;
            this.setState({
                imgsArrangeArr: imgsArrangeArr
            });
        }.bind(this);
    }
    center (index) {
        return function(){
            this.rearrangeFigure(index);
        }.bind(this);
    }
    // 设置各个部分图片的坐标，旋转角度等状态
    rearrangeFigure (centerIndex) {
        var imgsArrangeArr = this.state.imgsArrangeArr;
        var centerFig = imgsArrangeArr.splice(centerIndex, 1)[0];
        var constant = this.constant;
        centerFig = {
            pos: constant.centerPos,
            rotate: 0,
            isCenter: true
        }
        // 上分区只放置0或1张图片
        var topImgNum = Math.floor(Math.random() * 2);
        var topImgSpliceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImgNum));
        var topImgs = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);
        topImgs.forEach((img, index) => {
            topImgs[index] = {
                pos: {
                    left: this.randomPos(constant.topSec.posX[0], constant.topSec.posX[1]),
                    top: this.randomPos(constant.topSec.posY[0], constant.topSec.posY[1])
                },
                rotate: this.get30DegRandom()
            }
        });
        // 设置左分区和右分区图片的坐标和旋转角度
        for(var i=0,len=imgsArrangeArr.length, mid=len/2;i<len;i++){
            var sec;
            if(i < mid){
                sec = constant.leftSec;
            }else{
                sec = constant.rightSec;
            }
            imgsArrangeArr[i] = {
                pos: {
                    left: this.randomPos(sec.posX[0], sec.posX[1]),
                    top: this.randomPos(sec.posY[0], sec.posY[1])
                },
                rotate: this.get30DegRandom()
            }
        }
        if(topImgNum){
            imgsArrangeArr.splice(topImgSpliceIndex, 0, topImgs[0]);
        }
        imgsArrangeArr.splice(centerIndex, 0, centerFig);
        // 重新设置状态后自动更新渲染
        this.setState({
            imgsArrangeArr: imgsArrangeArr
        });
    }
    // 计算各个分区放置图片的坐标范围
    componentDidMount () {
        var constant = this.constant,
            stageDOM = this.section,
            figureDOM = ReactDOM.findDOMNode(this.figure0),
            stageW = stageDOM.scrollWidth,
            stageH = stageDOM.scrollHeight,
            halfStageW = Math.floor(stageW / 2),
            halfStageH = Math.floor(stageH / 2),
            figureW = figureDOM.scrollWidth,
            figureH = figureDOM.scrollHeight,
            halfFigureW = Math.floor(figureW / 2),
            halfFigureH = Math.floor(figureH / 2);
        constant.centerPos = {
            left: halfStageW - halfFigureW,
            top: halfStageH - halfFigureH
        };
        constant.leftSec.posX = [-halfFigureW, halfStageW - halfFigureW * 3];
        constant.rightSec.posX = [halfStageW + halfFigureW, stageW - halfFigureW];
        constant.leftSec.posY = constant.rightSec.posY = [-halfFigureH, stageH - halfFigureH];
        constant.topSec.posX = [halfStageW - halfFigureW / 2, halfStageW];
        constant.topSec.posY = [-halfFigureH, halfStageH - halfFigureH * 3];
        this.rearrangeFigure(0);
    }
    render() {
        var controllerUnits = [];
        var imgFigures = [];
        imgsDataArr.forEach((img, index) => {
            if(!this.state.imgsArrangeArr[index]){
                this.state.imgsArrangeArr[index] = {
                    pos: { // figure的定位坐标
                        left: 0,
                        top: 0
                    },
                    rotate: 0, //figure的旋转角度
                    isReverse: false, //是否被翻转
                    isCenter: false //是否是中心图片
                }
            }
            imgFigures.push(<ImgFigure
                                data={img}
                                key={'imgFigure'+index}
                                ref={(figure)=>{this['figure'+index] = figure;}}
                                arrange={this.state.imgsArrangeArr[index]}
                                reverse={this.figureReverse(index)}
                                center={this.center(index)}
                            />);
            controllerUnits.push(<ControllerUnit
                                key={'controller'+index}
                                arrange={this.state.imgsArrangeArr[index]}
                                reverse={this.figureReverse(index)}
                                center={this.center(index)}
                            />)
        });
        return (
            <section className="stage">
                <section className="img-sec" ref={(section)=>{this.section = section}}>
                    {imgFigures}
                </section>
                <nav className = "controller-nav">
                    {controllerUnits}
                </nav>
            </section>
        );
    }
}

GalleryByReactApp.defaultProps = {};

export default GalleryByReactApp;
