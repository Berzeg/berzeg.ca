import React, { Component } from 'react';
import './App.css';
import strings from './locale/common.js';
import ToastNotifications from './components/ToastNotifications';
import WorkProcesses from './components/WorkProcesses';
import ContactOptions from './components/ContactOptions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;

    this.emailCopiedTimer = null;

    this.handleEmailCopied = this.handleEmailCopied.bind(this);
  }

  get initialState() {
    return {
      isEmailCopied: false,
    }
  }

  handleEmailCopied() {
    if (this.emailCopiedTimer) {
      clearTimeout(this.emailCopiedTimer);
      this.emailCopiedTimer = null;
    }

    setTimeout(() => {
      this.emailCopiedTimer = null;
      this.setState({isEmailCopied: false})
    }, 3000);

    this.setState({isEmailCopied: true});
  }

  render() {
    return (
      <div className="page">
        <ToastNotifications
          isEmailCopied={this.state.isEmailCopied}
          />

        <header className="page-header">
          <h1 className="page-title">Hashem Shawqi (Berzeg)</h1>
        </header>
        <WorkProcesses/>
        <footer className="page-footer">
          <h3 className="footer-title subsection-title">{strings.contactTitle}</h3>
          <ContactOptions onEmailCopied={this.handleEmailCopied}/>
        </footer>
      </div>
    );
  }
}

export default App;
