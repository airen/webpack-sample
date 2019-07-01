import * as React from 'react';
import './button.css';

// const styles = require('./button.css');

// console.log(styles);

export default class Button extends React.Component<any> {
    render() {
        return (
            <button styleName="button primary">我就是一个按钮</button>
        )
    }
}