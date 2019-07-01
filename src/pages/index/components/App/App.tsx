import * as React from 'react';
import * as styles from './app.scss';

import Button from '../../../../components/Button/Button';

export default class App extends React.Component<any> {
    render() {
        return (
            <div>
                <h1 className={styles.title}> Hello, Webpack + React + Typescript!(^_^)</h1>
                <Button />
            </div>
        )
    }
}