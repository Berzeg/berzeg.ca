import React, {Component} from 'react';
import {WORK_PROCESSES} from '../constants/workProcess';
import WorkProcessIllustrations from './WorkProcessIllustrations';
import WorkProcess from './WorkProcess';

class MyWorkflow extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;

    this.selectedWorkProcessTimer = null;

    this.handleMockupsMouseEnter = this.handleMockupsMouseEnter.bind(this);
    this.handleResearchMouseEnter = this.handleResearchMouseEnter.bind(this);
    this.handleDocumentationMouseEnter = this.handleDocumentationMouseEnter.bind(this);
    this.handleCodingMouseEnter = this.handleCodingMouseEnter.bind(this);
    this.handleTestingMouseEnter = this.handleTestingMouseEnter.bind(this);
    this.handleWorkProcessMouseLeave = this.handleWorkProcessMouseLeave.bind(this);
  }

  get initialState() {
    return {
      selected: WORK_PROCESSES.MOCKUPS,
    }
  }

  get nextWorkProcess() {
    const processes = [
      WORK_PROCESSES.MOCKUPS,
      WORK_PROCESSES.RESEARCH,
      WORK_PROCESSES.DOCUMENTATION,
      WORK_PROCESSES.CODING,
      WORK_PROCESSES.TESTING,
    ];

    const currentIndex = processes.indexOf(this.state.selected);
    if (currentIndex+1 < processes.length) {
      return processes[currentIndex+1];
    } else {
      return processes[0];
    }
  }

  componentDidMount() {
    this.startSelectedWorkProcessTimer();
  }

  componentWillUnmount() {
    clearInterval(this.selectedWorkProcessTimer);
  }

  startSelectedWorkProcessTimer() {
    this.selectedWorkProcessTimer = setInterval(() => {
      this.setState({selected: this.nextWorkProcess});
    }, 5000);
  }

  handleWorkProcessMouseEnter(process) {
    clearInterval(this.selectedWorkProcessTimer);
    this.selectedWorkProcessTimer = null;
    this.setState({selected: process});
  }

  handleWorkProcessMouseLeave() {
    this.startSelectedWorkProcessTimer();
  }

  handleMockupsMouseEnter() {
    this.handleWorkProcessMouseEnter(WORK_PROCESSES.MOCKUPS);
  }

  handleResearchMouseEnter() {
    this.handleWorkProcessMouseEnter(WORK_PROCESSES.RESEARCH);
  }

  handleDocumentationMouseEnter() {
    this.handleWorkProcessMouseEnter(WORK_PROCESSES.DOCUMENTATION);
  }

  handleCodingMouseEnter() {
    this.handleWorkProcessMouseEnter(WORK_PROCESSES.CODING);
  }

  handleTestingMouseEnter() {
    this.handleWorkProcessMouseEnter(WORK_PROCESSES.TESTING);
  }

  render() {
    return (
      <div className='page-content work-processes'>
        <WorkProcessIllustrations selected={this.state.selected}/>
        <ol className='work-process-list'>
          <WorkProcess
            type={WORK_PROCESSES.MOCKUPS}
            selected={this.state.selected === WORK_PROCESSES.MOCKUPS}
            onMouseEnter={this.handleMockupsMouseEnter}
            onMouseLeave={this.handleWorkProcessMouseLeave}
            />

          <WorkProcess
            type={WORK_PROCESSES.RESEARCH}
            selected={this.state.selected === WORK_PROCESSES.RESEARCH}
            onMouseEnter={this.handleResearchMouseEnter}
            onMouseLeave={this.handleWorkProcessMouseLeave}
            />

          <WorkProcess
            type={WORK_PROCESSES.DOCUMENTATION}
            selected={this.state.selected === WORK_PROCESSES.DOCUMENTATION}
            onMouseEnter={this.handleDocumentationMouseEnter}
            onMouseLeave={this.handleWorkProcessMouseLeave}
            />

          <WorkProcess
            type={WORK_PROCESSES.CODING}
            selected={this.state.selected === WORK_PROCESSES.CODING}
            onMouseEnter={this.handleCodingMouseEnter}
            onMouseLeave={this.handleWorkProcessMouseLeave}
            />

          <WorkProcess
            type={WORK_PROCESSES.TESTING}
            selected={this.state.selected === WORK_PROCESSES.TESTING}
            onMouseEnter={this.handleTestingMouseEnter}
            onMouseLeave={this.handleWorkProcessMouseLeave}
            />
        </ol>
      </div>
    );
  }
}

export default MyWorkflow;
