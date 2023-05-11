import React, { Component } from 'react';
import { Provider } from 'react-redux';
import dva from './utils/dva';
import models from './models';
import './app.scss';
import './assets/styles/custom_theme.scss';

const dvaApp = dva.createApp({
  initialState: {},
  models,
});

const store = dvaApp.getStore();

class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default App;
