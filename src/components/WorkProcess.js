import React, {Component} from 'react';
import PropTypes from 'prop-types';
import strings from '../locale/workProcess';
import {WORK_PROCESSES} from '../constants/workProcess';
import mockupsIllustration from '../images/illustration_mockups_small_2x.png';
import researchIllustration from '../images/illustration_research_small_2x.png';
import documentationIllustration from '../images/illustration_documentation_small_2x.png';
import codingIllustration from '../images/illustration_coding_small_2x.png';
import testingIllustration from '../images/illustration_testing_small_2x.png';

class WorkProcess extends Component {
  getTitle() {
    switch(this.props.type) {
      case WORK_PROCESSES.MOCKUPS:
        return strings.mockups;
      case WORK_PROCESSES.RESEARCH:
        return strings.research;
      case WORK_PROCESSES.DOCUMENTATION:
        return strings.documentation;
      case WORK_PROCESSES.CODING:
        return strings.coding;
      case WORK_PROCESSES.TESTING:
        return strings.testing;
      default:
        throw new Error(`Unexpected work process type: ${this.props.type}`);
    }
  }

  getDescription() {
    switch(this.props.type) {
      case WORK_PROCESSES.MOCKUPS:
        return strings.mockupsDescription;
      case WORK_PROCESSES.RESEARCH:
        return strings.researchDescription;
      case WORK_PROCESSES.DOCUMENTATION:
        return strings.documentationDescription;
      case WORK_PROCESSES.CODING:
        return strings.codingDescription;
      case WORK_PROCESSES.TESTING:
        return strings.testingDescription;
      default:
        throw new Error(`Unexpected work process type: ${this.props.type}`);
    }
  }

  getIllustration() {
    switch(this.props.type) {
      case WORK_PROCESSES.MOCKUPS:
        return mockupsIllustration;
      case WORK_PROCESSES.RESEARCH:
        return researchIllustration;
      case WORK_PROCESSES.DOCUMENTATION:
        return documentationIllustration;
      case WORK_PROCESSES.CODING:
        return codingIllustration;
      case WORK_PROCESSES.TESTING:
        return testingIllustration;
      default:
        throw new Error(`Unexpected work process type: ${this.props.type}`);
    }
  }

  render() {
    const title = this.getTitle();
    const description = this.getDescription();
    const illustration = this.getIllustration();

    let titleClass = 'work-process-title subsection-title';
    let descriptionClass = 'work-process-description subsection-body';
    if (this.props.selected) {
      titleClass = `${titleClass} is-selected`;
      descriptionClass = `${descriptionClass} is-selected`;
    }

    return (
      <li
        className='work-process'
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        >

        <h3 className={titleClass}>{title}</h3>
        <p className={descriptionClass}>{description}</p>
        <img className="work-process-illustration-small" src={illustration} alt="work process illustration (small)."/>
      </li>
    );
  }
}

WorkProcess.propTypes = {
  type: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
}

export default WorkProcess;
