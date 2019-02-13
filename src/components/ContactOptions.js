import React, {Component} from 'react';
import PropTypes from 'prop-types';
import emailIcon from '../images/email_icon.svg';
import emailIconLight from '../images/email_icon_light.svg';
import githubIcon from '../images/github_icon.svg';
import githubIconLight from '../images/github_icon_light.svg';
import observableHQIcon from '../images/observable_hq_icon.svg';
import observableHQIconLight from '../images/observable_hq_icon_light.svg';

class ContactOptions extends Component {
  render() {
    const email = "hashem@berzeg.ca";

    return (
      <span className="contact-options">
        {this.props.isShowingEmailForm &&
          <p className="contact-option__email-form-hint">👇</p>
        }

        <span
          className="contact-option"
          onClick={this.props.onShowEmailFormClick}
        >
          <img
            className="email-icon"
            src={emailIcon}
            alt="contact me via email"
            />

          <img
            className="email-icon--mobile"
            src={emailIconLight}
            alt="contact me via email"
            />

          {this.props.isShowingEmailForm &&
            <p className="contact-option__email-form-hint--mobile">Scroll Down</p>
          }
        </span>

        <p className="contact-option-separator">|</p>

        <a
          className="contact-option"
          href="https://beta.observablehq.com/@berzeg"
        >
          <img
            className="observable-hq-icon"
            src={observableHQIcon}
            alt="go to observable hq profile page"
            />

          <img
            className="observable-hq-icon--mobile"
            src={observableHQIconLight}
            alt="go to observable hq profile page"
            />
        </a>

        <p className="contact-option-separator">|</p>

        <a
          className="contact-option"
          href="https://github.com/berzeg"
        >
          <img
            className="github-icon"
            src={githubIcon}
            alt="go to github profile page"
            />

          <img
            className="github-icon--mobile"
            src={githubIconLight}
            alt="go to github profile page"
            />
        </a>
      </span>
    );
  }
}

ContactOptions.propTypes = {
  isShowingEmailForm: PropTypes.bool.isRequired,
  onShowEmailFormClick: PropTypes.func.isRequired,
};

export default ContactOptions;
