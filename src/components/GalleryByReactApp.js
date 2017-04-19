require('normalize.css/normalize.css');
require('styles/App.scss');
// var imgsData = require('../datas/ImageData.json');

import React from 'react';

// let imagsURL = (function(imgsDataArr){
//     for(var i=0,len=imgsDataArr.length;i<len;i++){
//         imgsDataArr[i].imageURL = require('../images/' + imgsDataArr[i].filename);
//     }
//     return imgsDataArr;
// })(imgsData);

class GalleryByReactApp extends React.Component {
  render() {
    return (
      <section className="stage">
        <section className="img-sec"></section>
        <nav className="controller-nav"></nav>
      </section>
    );
  }
}

GalleryByReactApp.defaultProps = {
};

export default GalleryByReactApp;
