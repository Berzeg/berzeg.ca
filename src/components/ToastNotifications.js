import React, {Component} from 'react';
import PropTypes from 'prop-types';
import strings from '../locale/notifications';

class ToastNotifications extends Component {
  render() {
    let emailCopiedClass = "toast-notification";
    emailCopiedClass = this.props.isEmailCopied ?
      `${emailCopiedClass} is-active` :
      emailCopiedClass;

    return (
      <ul className="toast-notifications">
        <li className={emailCopiedClass}>
          <p>{strings.emailIsCopied}</p>
        </li>
      </ul>
    );
  }
}

ToastNotifications.propTypes = {
  isEmailCopied: PropTypes.bool.isRequired,
};

export default ToastNotifications;
