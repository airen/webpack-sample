import * as React from 'react';
import './app.css';
// import './app.scss';
// const styles = require('./app.scss');
// import * as Security from '../../../../assets/images/security.svg';
const Security = require('../../../../assets/images/security.svg');

// console.log(Security)

import Button from '../../../../components/Button/Button';

export default class App extends React.Component<any> {
    render() {
        return (
            <div>
                <div>
                    <img src={String(Security)} />
                    {/* 下面这样引用，图片会报404错误 */}
                    {/* <img src="../../../../assets/images/security.svg" alt=""/> */}
                </div>
                <h1  styleName="title"> Hello, Webpack + React + Typescript!(^_^)</h1>
                <div>
                    <span styleName="iconfont icon-fenxiang"></span>
                    <Button />
                    <span styleName="iconfont icon-guangbo"></span>
                </div>
                
            </div>
        )
    }
}