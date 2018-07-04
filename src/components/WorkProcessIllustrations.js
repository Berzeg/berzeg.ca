import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {WORK_PROCESSES} from '../constants/workProcess';
import mockupsIllustration from '../images/illustration_mockups_2x.png';
import researchIllustration from '../images/illustration_research_2x.png';
import documentationIllustration from '../images/illustration_documentation_2x.png';
import codingIllustration from '../images/illustration_coding_2x.png';
import testingIllustration from '../images/illustration_testing_2x.png';

class WorkProcessIllustrations extends Component {
  getClassNameFor(process) {
    let className = 'process-illustration-large';
    if (this.props.selected === process) {
      className = `${className} is-active`;
    }
    return className;
  }

  render() {
    const mockupsClass = this.getClassNameFor(WORK_PROCESSES.MOCKUPS);
    const researchClass = this.getClassNameFor(WORK_PROCESSES.RESEARCH);
    const documentationClass = this.getClassNameFor(WORK_PROCESSES.DOCUMENTATION);
    const codingClass = this.getClassNameFor(WORK_PROCESSES.CODING);
    const testingClass  = this.getClassNameFor(WORK_PROCESSES.TESTING);

    return (
      <ul className='process-illustrations-large'>
        <img className={mockupsClass} src={mockupsIllustration} alt="mockups illustration"/>
        <img className={researchClass} src={researchIllustration} alt="research illustration"/>
        <img className={documentationClass} src={documentationIllustration} alt="documentation illustration"/>
        <img className={codingClass} src={codingIllustration} alt="coding illustration"/>
        <img className={testingClass} src={testingIllustration} alt="testing illustration"/>
      </ul>
    );
  }
}

WorkProcessIllustrations.propTypes = {
  selected: PropTypes.string.isRequired,
};

export default WorkProcessIllustrations;
