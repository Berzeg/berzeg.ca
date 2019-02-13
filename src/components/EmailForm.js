import {validate as validateEmail} from 'email-validator';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import EmailFormCloseIcon from '../images/email_form_close_icon.svg'

class EmailForm extends Component {
  constructor(props) {
    super(props);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleSendClick = this.handleSendClick.bind(this);
    this.handleSubjectChange = this.handleSubjectChange.bind(this);
    this.sendStateTimer = undefined;
    this.state = this.initialState;
  }

  get initialState() {
    return {
      email: '',
      subject: '',
      message: '',
      emailError: '',
      messageError: '',
    };
  }

  clearErrors() {
    this.setState({
      emailError: '',
      messageError: '',
    });
  }

  componentDidUpdate(prevProps) {
    if (
      (
        (this.props.sendSuccess && !prevProps.sendSuccess) ||
        (this.props.sendFail && !prevProps.sendFail)
      ) &&
      !this.sendStateTimer
    ) {
      this.sendStateTimer = setTimeout(() => {
        this.sendStateTimer = undefined;
        this.props.onSendStateNotified();
      }, 3000);
    }
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handleMessageChange(event) {
    this.setState({message: event.target.value});
  }

  handleSendClick() {
    this.clearErrors();

    let valid = true;
    if (!this.state.email) {
      this.setState({emailError: "Email field can't be empty"});
      valid = false;
    } else if (!validateEmail(this.state.email)) {
      this.setState({emailError: "Invalid email format (expected something like 'abc@efg.com')"});
      valid = false;
    }
    if (!this.state.message) {
      this.setState({messageError: "Message field can't be empty"});
      valid = false;
    }

    if (valid) {
      this.props.onSend(
        this.state.email,
        this.state.subject,
        this.state.message,
      );
    }
  }

  handleSubjectChange(event) {
    this.setState({subject: event.target.value});
  }

  render() {
    const sendText = this.props.sendFail ?
      "Send Failed" :
      this.props.sendSuccess ?
        "Sent 📬" :
        "Send";
    const sendButtonClass = this.props.sendFail ?
      "email-form__button email-form__button--fail" :
      "email-form__button";

    return (
      <div
        ref={this.props.rootRef}
        className="email-form"
      >
        <span
          className="email-form__close"
          onClick={this.props.onCloseEmailFormClick}
        >
          <img
            className="email-form__close__icon"
            src={EmailFormCloseIcon}
            alt="close the email form"
          />
        </span>

        <p className="email-form__text">To: hashem@berzeg.ca</p>

        <input
          className="email-form__field"
          type="text"
          placeholder="Your Email"
          onChange={this.handleEmailChange}
          value={this.state.email}
        />

        <input
          className="email-form__field"
          type="text"
          placeholder="Subject"
          onChange={this.handleSubjectChange}
          value={this.state.subject}
        />

        <textarea
          className="email-form__field"
          placeholder="Message"
          onChange={this.handleMessageChange}
          value={this.state.message}
        />

        {(this.state.emailError || this.state.messageError) &&
          <ul className="email-form__errors">
            {this.state.emailError &&
              <li>{this.state.emailError}</li>
            }

            {this.state.messageError &&
              <li>{this.state.messageError}</li>
            }
          </ul>
        }

        <button
          type="button"
          className={sendButtonClass}
          onClick={this.handleSendClick}
        >
          {sendText}
        </button>
      </div>
    );
  }
}

EmailForm.propTypes = {
  rootRef: PropTypes.object,
  onCloseEmailFormClick: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
  onSendStateNotified: PropTypes.func.isRequired,
  sendFail: PropTypes.bool.isRequired,
  sendSuccess: PropTypes.bool.isRequired,
};

EmailForm.defaultProps = {
  ref: null,
};

export default EmailForm;
