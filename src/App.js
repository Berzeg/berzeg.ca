import 'whatwg-fetch';
import React, {createRef, Component} from 'react';
import './App.css';
import strings from './locale/common.js';
import ContactOptions from './components/ContactOptions';
import EmailForm from './components/EmailForm';
import MyWorkflow from './components/MyWorkflow';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleCloseEmailFormClick = this.handleCloseEmailFormClick.bind(this);
    this.handleEmailSend = this.handleEmailSend.bind(this);
    this.handleEmailSendStateNotified = this.handleEmailSendStateNotified.bind(this);
    this.handleShowEmailFormClick = this.handleShowEmailFormClick.bind(this);
    this.state = this.initialState;
    this.emailFormRef = createRef();
  }

  get initialState() {
    return {
      emailSendFail: false,
      emailSendSuccess: false,
      showEmailForm: false,
    };
  }

  handleCloseEmailFormClick() {
    this.setState({showEmailForm: false});
  }

  handleEmailSend(from, subject, message) {
    fetch('/email_send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from,
        subject,
        message,
      }),
    })
    .then(response => {
      if (response.status === 200) {
        this.setState({emailSendSuccess: true});
      } else {
        this.setState({emailSendFail: true});
      }
    })
    .catch(() => this.setState({emailSendFail: true}));
  }

  handleEmailSendStateNotified() {
    this.setState({
      emailSendFail: false,
      emailSendSuccess: false,
    });
  }

  handleShowEmailFormClick() {
    this.setState({showEmailForm: true});

    setImmediate(() => {
      if (this.emailFormRef && this.emailFormRef.current) {
        this.emailFormRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  }

  render() {
    return (
      <div className="page">
        <header className="page__header">
          <h1 className="page-title">Hashem Shawqi (Berzeg)</h1>
        </header>

        <div className="page__body">
          <MyWorkflow/>
        </div>

        <footer className="page__footer">
          <h3 className="footer-title subsection-title">{strings.contactTitle}</h3>
          <ContactOptions
            isShowingEmailForm={this.state.showEmailForm}
            onShowEmailFormClick={this.handleShowEmailFormClick}
          />
        </footer>

        {this.state.showEmailForm &&
          <EmailForm
            rootRef={this.emailFormRef}
            onCloseEmailFormClick={this.handleCloseEmailFormClick}
            onSend={this.handleEmailSend}
            onSendStateNotified={this.handleEmailSendStateNotified}
            sendFail={this.state.emailSendFail}
            sendSuccess={this.state.emailSendSuccess}
          />
        }
      </div>
    );
  }
}

export default App;
