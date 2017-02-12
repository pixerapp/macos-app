'use strict';

/* External dependencies */
import React, { Component, PropTypes } from 'react';
import { translate } from 'react-i18next';
import { hashHistory } from 'react-router';

import Spinner from '../Spinner';
import StreamsList from '../StreamsList';

import './i18n';
import './files.styl';
import { settingsStream } from './streams';

class Files extends Component {
  static transformer(settings) {
    return {
      settings,
    };
  }
  
  constructor(props) {
    super(props);

    this.state = {};

    this.setState = this.setState.bind(this);
  }

  componentWillMount() {
    const streams = this.streams = new StreamsList(this.setState);

    streams.watch(settingsStream, Files.transformer);
  }

  componentWillUnmount() {
    this.streams.unsubscribe();
  }

  render() {
    const { t } = this.props;
    const { settings } = this.state;

    if (!settings) {
      return <div className="flex-center"><Spinner /></div>;
    }

    if (!settings.watchDir) {
      hashHistory.push('/settings');
      return null;
    }

    return <div className="pure-g settings">
      <h1 className="pure-u-24-24">{t('title')}</h1>
    </div>;
  }
}

Files.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate(['files'])(Files);
