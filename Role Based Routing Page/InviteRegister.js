import React, { Component } from "react";
import RegisterInviteService from "../../services/RegisterInviteService";
import RegisterFormRI from "./InviteForm";
import RegExValidator from "../../utilities/RegExValidator";
import DateTime from "react-datetime";
import "./Date.css";
import UsersServices from "../../services/UsersService";
import OrganizationService from "../../services/OrganizationService";
import { connect } from "react-redux";
const moment = require("moment");
moment().format();

class RegisterRI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "",
      currentUserRoles: "",
      currentFundSourceId: "",
      currentUserOrgId: "",
      roleId: "",
      orgId: "",
      fundSourceId: "",
      firstName: "",
      middleInitial: "",
      lastName: "",
      email: "",
      expiration: "",
      modifiedBy: "",
      roleTypes: [],
      fundingSource: [],
      organization: [],
      formErrors: {
        roleId: "",
        orgId: "",
        fundSourceId: "",
        firstName: "",
        lastName: "",
        email: ""
      },
      roleIdValid: false,
      orgIdValid: false,
      fundSourceIdValid: false,
      firstNameValid: false,
      lastNameValid: false,
      emailValid: false,
      formValid: false
    };
  }

  componentDidMount = () => {
    UsersServices.getCurrent(this.onGetCurrentSuccess, this.onGetCurrentError);
    OrganizationService.selectAll(
      this.onGetSelectAllSuccess,
      this.onGetSelectAllError
    );
    RegisterInviteService.selectAllFundingSource(
      this.onGetAllFundSuccess,
      this.onGetAllFundError
    );
    let fDay = moment()
      .add(24, "hours")
      .hours(23)
      .minutes(59)
      .seconds(0)
      .format("MM/DD/YYYY h:mm A");
    this.setState({ expiration: fDay, modifiedBy: this.props.user.email });
  };

  onGetSelectAllSuccess = response => this.setState({ organization: this.state.organization.concat(response.data) });

  onGetSelectAllError = Error => console.log("Select Org Error", Error);

  onGetAllFundSuccess = response => this.setState({ fundingSource: response.data.items });

  onGetAllFundError = Error => console.log("Select Org Error", Error);

  onGetCurrentSuccess = response => {
    this.setState({
      currentUserRoles: response.data.roles[0],
      currentUserOrgId: response.data.orgId[0],
      currentFundSourceId: response.data.fundSourceId[0]
    });
    OrganizationService.selectById(
      response.data.orgId[0],
      this.onSelectByIdSuccess,
      this.onSelectByIdError
    );
    RegisterInviteService.selectRoles(
      response.data.roles[0],
      this.getRolesSuccess,
      this.getRolesError
    );
    this.setState({ modifiedBy: response.data.email });
    RegisterInviteService.selectRoles(
      response.data.roles[0],
      this.getRolesSuccess,
      this.getRolesError
    );
  };

  onGetCurrentError = err => console.log("get current error", err);

  onSelectByIdSuccess = response => this.setState({ currentOrgName: response.DisplayName });

  onSelectByIdError = response => console.log(response);

  onGetCurrentError = err => console.log("get current error", err);

  getRolesSuccess = response => this.setState({ roleTypes: response.data.items });

  getRolesError = err => console.log(err);

  onChange = evt => {
    const key = evt.target.name;
    const val = evt.target.value;
    this.setState({ [key]: val }, () => {
      this.validateField(key, val);
    });
  };

  onCurrentError = err => console.log(err);

  onChangeRole = evt => {
    const key = evt.target.name;
    const val = parseInt(evt.target.value);
    this.setState({ [key]: val }, () => {
      this.validateField(key, val);
    });
  };

  onChangeFundSource = evt => {
    const key = evt.target.name;
    const val = parseInt(evt.target.value);
    this.setState({ [key]: val }, () => {
      this.validateField(key, val);
    });
  };

  onChangeOrganization = evt => {
    const key = evt.target.name;
    const val = parseInt(evt.target.value);
    this.setState({ [key]: val }, () => {
      this.validateField(key, val);
    });
  };

  onDateChange = date => {
    let fDate = moment(date).format();
    this.setState({ expiration: fDate });
  };

  validateField = (fieldName, value) => {
    let fieldValidationError = this.state.formErrors;
    let roleIdValid = this.state.roleIdValid;
    let orgIdValid = this.state.orgIdValid;
    let fundSourceIdValid = this.state.fundSourceIdValid;
    let firstNameValid = this.state.firstNameValid;
    let lastNameValid = this.state.lastNameValid;
    let emailValid = this.state.emailValid;

    switch (fieldName) {
      case "firstName":
        firstNameValid = value.length > 1;
        fieldValidationError.firstName = firstNameValid;
        break;
      case "lastName":
        lastNameValid = value.length > 1;
        fieldValidationError.lastName = lastNameValid;
        break;
      case "email":
        emailValid = RegExValidator.validateEmail(value);
        fieldValidationError.email = emailValid;
        break;
      case "roleId":
        roleIdValid = value > 0;
        fieldValidationError.roleId = roleIdValid;
        break;
      case "orgId":
        orgIdValid = value > 0;
        fieldValidationError.orgId = orgIdValid;
        break;
      case "fundSourceId":
        fundSourceIdValid = value > 0;
        fieldValidationError.fundSourceId = fundSourceIdValid;
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationError,
        firstNameValid: firstNameValid,
        lastNameValid: lastNameValid,
        emailValid: emailValid,
        roleIdValid: roleIdValid,
        orgIdValid: orgIdValid,
        fundSourceIdValid: fundSourceIdValid
      },
      this.validateForm
    );
  };

  validateForm() {
    if (this.state.currentUserRoles === "SystemAdmin" ||
      this.state.currentUserRoles === "SystemImplementer" ||
      this.state.currentUserRoles === "FundingSourceAdmin" ||
      this.state.currentUserRoles === "FundingSourceDirector") {
      this.setState({
        formValid:
          this.state.firstNameValid &&
          this.state.lastNameValid &&
          this.state.emailValid &&
          this.state.roleIdValid &&
          this.state.orgIdValid &&
          this.state.fundSourceIdValid
      })
    } else {
      this.setState({
        formValid:
          this.state.firstNameValid &&
          this.state.lastNameValid &&
          this.state.emailValid &&
          this.state.roleIdValid
      })
    }
  }

  getAllRolesSuccess = response => this.setState({ roleTypes: response.data.items });

  getAllRolesError = err => console.log(err);

  onClick = () => {
    if (this.state.currentUserRoles === "SystemAdmin" ||
      this.state.currentUserRoles === "SystemImplementer" ||
      this.state.currentUserRoles === "FundingSourceAdmin" ||
      this.state.currentUserRoles === "FundingSourceDirector") {
      this.state.formValid
        ? RegisterInviteService.riSignUp(this.state, this.onSuccess, this.onError)
        : this.setState({ showErrors: true });
    } else {
      const { firstName, middleInitial, lastName, email, token, expiration, modifiedBy, roleId, currentUserOrgId, currentFundSourceId, formValid } = this.state;
      const riData = { firstName: firstName, middleInitial: middleInitial, lastName: lastName, email: email, token: token, expiration: expiration, modifiedBy: modifiedBy, roleId: roleId, orgId: currentUserOrgId, fundSourceId: currentFundSourceId, formValid: formValid }
      this.state.formValid
        ? RegisterInviteService.riSignUp(riData, this.onSuccess, this.onError)
        : this.setState({ showErrors: true })
    }
  }

  onSuccess = () => this.props.history.push("/keys/list");

  onError = response => console.log(response);

  render() {
    let fDay = moment()
      .add(24, "hours")
      .hours(23)
      .minutes(59)
      .seconds(0)
      .format("MM/DD/YYYY h:mm A");
    let yesterday = moment()
      .add(1, "day")
      .subtract(1, "day")
      .format("MM/DD/YYYY h:mm A");
    let valid = function (current) {
      return current.isAfter(yesterday);
    };
    return (
      <React.Fragment>
        <div className="container-fluid flex-grow-1 container-p-y">
          <div className="card mb-4">
            <h6 className="card-header">Invite Key</h6>
            <div className="card-body">
              <RegisterFormRI
                roleTypes={this.state.roleTypes}
                organization={this.state.organization}
                currentUserRoles={this.state.currentUserRoles}
                currentUserOrgId={this.state.currentUserOrgId}
                currentFundSourceId={this.state.currentFundSourceId}
                fundingSource={this.state.fundingSource}
                roleId={this.state.roleId}
                roleIdValid={this.state.roleIdValid || !this.state.showErrors}
                fundSourceId={this.state.fundSourceId}
                fundSourceIdValid={this.state.fundSourceIdValid || !this.state.showErrors}
                orgId={this.state.orgId}
                orgIdValid={this.state.orgIdValid || !this.state.showErrors}
                firstName={this.state.firstName}
                firstNameValid={this.state.firstNameValid || !this.state.showErrors}
                middleInitial={this.state.middleInitial}
                lastName={this.state.lastName}
                lastNameValid={this.state.lastNameValid || !this.state.showErrors}
                modifiedBy={this.state.modifiedBy}
                email={this.state.email}
                emailValid={this.state.emailValid || !this.state.showErrors}
                onChange={this.onChange}
                onChangeRole={this.onChangeRole}
                onChangeOrganization={this.onChangeOrganization}
                onChangeFundSource={this.onChangeFundSource}
              />
              <label className="form-label">Expiration</label>
              <DateTime
                defaultValue={fDay}
                isValidDate={valid}
                expiration={this.state.expiration}
                onChange={this.onDateChange}
                type="datetime-local"
                name="expiration"
              />
              <br />
              <div className="form-group">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.onClick}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.UserReducer };
};

export default connect(mapStateToProps)(RegisterRI);
