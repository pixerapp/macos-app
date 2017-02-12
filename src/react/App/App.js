'use strict';

/* global FB */

/* External dependencies */
import React, { Component, PropTypes } from 'react';
import { hashHistory } from 'react-router';

/* Outer dependencies */
import Spinner from '../Spinner';
import StreamsList from '../StreamsList';

/* Local dependencies */
import './app.styl';
import './i18n';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.setState = this.setState.bind(this);
  }

  componentWillMount() {
    // const list = this.streams = new StreamsList(this.setState);

    // list.createStream()

  }

  render() {
    return <div className="app">
      {this.props.children}
    </div>;
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default App;
