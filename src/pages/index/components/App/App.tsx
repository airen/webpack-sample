import * as React from 'react';
import './app.css';
const Security = require('@images/security.svg');

import Button from '@components/Button/Button';

export default class App extends React.Component<any> {
  render() {
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <img src={String(Security)} />
          {/* 下面这样引用，图片会报404错误 */}
          {/* <img src="../../../../assets/images/security.svg" alt=""/> */}
        </div>
        <h1 styleName="title"> Hello, Webpack + React + Typescript!(^_^)</h1>
        <p styleName="des">我是方的一只狼!!!!</p>
        <div>
          <span styleName="iconfont icon-fenxiang"></span>
          <Button />
          <span styleName="iconfont icon-guangbo"></span>
        </div>
      </div>
    );
  }
}
