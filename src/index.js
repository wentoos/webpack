var aa =require('./hello.js');
console.log(aa);
import React from 'react';
// import './style.css';
import './index.less';
import img from './001.png';
import ReactDOM from 'react-dom';
let a =<p>我是标签 <span>dui</span> <img src={img}/></p>;
import './index.less';
ReactDOM.render(a,document.getElementById('root'))
