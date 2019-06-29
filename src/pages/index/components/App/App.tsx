import * as React from 'react';
// import './app.css';

import Button from '../../../../components/Button/Button';

export default class App extends React.Component<any> {
    render() {
        return (
            <div>
                <h1> Hello, Webpack + React + Typescript!(^_^)</h1>
                <Button />
            </div>
        )
    }
}