'use strict';

/* External dependencies */
const { ipcRenderer } = require('electron');
import React, { Component, PropTypes } from 'react';
import { translate } from 'react-i18next';
import { hashHistory } from 'react-router';

import StreamsList from '../StreamsList';

import './i18n';
import './settings.styl';
import { settingsStream } from './streams';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.onSave = this.onSave.bind(this);
    this.setState = this.setState.bind(this);
  }

  componentWillMount() {
    const streams = this.streams = new StreamsList(this.setState);

    streams.watch(settingsStream);
  }

  componentWillUnmount() {
    this.streams.unsubscribe();
  }

  onSave(e) {
    e.preventDefault();

    const watchDir = this.refs.watchDir.value;

    if (watchDir) {
      ipcRenderer.send('watchDir', watchDir);
      hashHistory.push('/');
    }
  }

  render() {
    const { t } = this.props;
    const { watchDir } = this.state;

    return <div className="pure-g settings">
      <h1 className="pure-u-24-24">{t('title')}</h1>
      <form className="pure-u-24-24 pure-form pure-form-stacked" onSubmit={this.onSave}>
        <label forHtml="watchDir" className="settings__watch-label">{t('watch-dir')}</label>
        <input type="text"
               id="watchDir"
               name="watchDir"
               placeholder={t('watch-path')}
               className="pure-input-1"
               ref="watchDir"
               default={watchDir}
        />
        <span className="pure-form-message">{t('watch-hint')}</span>
        <button type="submit" className="pure-button pure-button-primary settings__save">{t('Save')}</button>
      </form>
    </div>;
  }
}

Settings.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate(['settings', 'app'])(Settings);
