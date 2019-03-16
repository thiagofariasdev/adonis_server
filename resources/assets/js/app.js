import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Routes from './comp';
import { Provider } from 'react-redux';
import { Redux } from './comp/lib/str';

class App extends Component {
    render() {
        return (
            <Provider store={Redux.store}>
                <Routes />
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))