import * as React from 'react';
// import './button.css';

import * as styles from './button.css';

// console.log(styles);

export default class Button extends React.Component<any> {
    render() {
        return (
            <button styleName="primary btn-info" className={styles.buttonSuccess}>我就是一个按钮</button>
        )
    }
}