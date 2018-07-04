import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CopyToClipboard from 'react-copy-to-clipboard';
import githubLogo from '../images/github_icon.svg';
import githubLogoLight from '../images/github_icon_light.svg';

class ContactOptions extends Component {
  render() {
    const email = "hashem@berzeg.ca";

    return (
      <span className="contact-options">
        <CopyToClipboard
          text={email}
          onCopy={this.props.onEmailCopied}
          >

          <p className="contact-option email-contact-option">
            {email}
          </p>
        </CopyToClipboard>

        <p className="contact-option-buffer">|</p>
        <a className="contact-option" href="https://github.com/berzeg">
          <img
            className="github-logo"
            src={githubLogo}
            alt="go to github profile page"
            />

          <img
            className="github-logo-light"
            src={githubLogoLight}
            alt="go to github profile page"
            />
        </a>
      </span>
    );
  }
}

ContactOptions.propTypes = {
  onEmailCopied: PropTypes.func.isRequired,
}

export default ContactOptions;
