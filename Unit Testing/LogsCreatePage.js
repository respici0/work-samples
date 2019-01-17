import React from "react";
import LogsForm from "../logs/LogsForm";
import LogsService from "../../services/LogsService";
import FormErrors from "../logs/FormErrors";
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { loginStatus } from "../../redux/UserActions";

class LogsCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      date: "",
      thread: "",
      level: "",
      logger: "",
      message: "",
      exception: "",
      formErrors: {
        date: "",
        thread: "",
        level: "",
        logger: "",
        message: ""
      },
      dateValid: false,
      threadValid: false,
      levelValid: false,
      loggerValid: false,
      messageValid: false,
      formValid: false
    };
  }

  onChange = evt => {
    const key = evt.target.name;
    const val = evt.target.value;
    console.log("Key/Pair", key, val);
    this.setState({ [key]: val }, () => {
      this.validateField(key, val);
    });
  };

  validateField = (fieldName, value) => {
    let fieldValidationErrors = this.state.formErrors;
    let dateValid = this.state.dateValid;
    let threadValid = this.state.threadValid;
    let levelValid = this.state.levelValid;
    let loggerValid = this.state.loggerValid;
    let messageValid = this.state.messageValid;

    switch (fieldName) {
      case "date":
        dateValid = value.length > 1;
        fieldValidationErrors.date = dateValid ? "" : "is required";
        break;

      case "thread":
        threadValid = value.length > 1;
        fieldValidationErrors.thread = threadValid ? "" : "is required";
        break;

      case "level":
        levelValid = value.length > 1;
        fieldValidationErrors.level = levelValid ? "" : "is required";
        break;

      case "logger":
        loggerValid = value.length > 1;
        fieldValidationErrors.logger = loggerValid ? "" : "is required";
        break;

      case "message":
        messageValid = value.length > 1;
        fieldValidationErrors.message = messageValid ? "" : "is required";
        break;
      default:
        break;
    }

    this.setState(
      {
        formErrors: fieldValidationErrors,
        dateValid: dateValid,
        threadValid: threadValid,
        levelValid: levelValid,
        loggerValid: loggerValid,
        messageValid: messageValid
      },
      this.validateForm
    );
  };

  validateForm() {
    this.setState({
      formValid:
        this.state.dateValid &&
        this.state.threadValid &&
        this.state.levelValid &&
        this.state.loggerValid &&
        this.state.messageValid
    });
  }

  //#region post PostLog Functions
  handleClick = () => {
    console.log("New Logs Created", this.state);
    LogsService.postLog(this.state, this.onPostLogSuccess, this.onPostLogError);
  };

  onPostLogSuccess = response => {
    console.log(response);
    // this.props.history.push("/Logs/LogsListPage");
  };

  onPostLogError = response => {
    console.log(response);
  };
  //#endregion

  render() {

    return (
      <React.Fragment>
        <div>
          <h1>ELEVEIGHT NEW LOG</h1>
          <hr />
        </div>
        <div>
          <LogsForm
            id={this.state.id}
            date={this.state.date}
            thread={this.state.thread}
            level={this.state.level}
            logger={this.state.logger}
            message={this.state.message}
            exception={this.state.exception}
            onChange={this.onChange}
            handleClick={this.handleClick}
            disabled={this.state.formValid}
          />
        </div>
        <div>
          <FormErrors formErrors={this.state.formErrors} />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.UserReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLoginStatus: () => {
      dispatch(loginStatus());
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LogsCreate)
);


