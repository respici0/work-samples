import React from "react";
import TextInput from "../common/TextInputValidation";
import { connect } from "react-redux";

const RegisterFormRI = props => {
  const currentRole = props.currentUserRoles;
  const orgId = props.currentUserOrgId;
  const currentUserFundSourceId = props.currentFundSourceId;

  if (
    currentRole === "SystemAdmin" ||
    currentRole === "SystemImplementer" ||
    currentRole === "FundingSourceAdmin" ||
    currentRole === "FundingSourceDirector"
  ) {
    return (
      <React.Fragment>
        <div className="form-group">
          <label className="form-label">Role:</label>
          <select
            className={`form-control ${props.roleIdValid ? "" : "is-invalid"}`}
            name="roleId"
            onChange={props.onChangeRole}
          >
            <option value="null">Assign Role...</option>
            {props.roleTypes.map(item => {
              return (
                <option key={item.roleId} value={item.roleId}>
                  {item.role}
                </option>
              );
            })}
          </select>
          <div className="invalid-feedback">Please Select a Role</div>
        </div>
        <div className="form-group">
          <label className="form-label">Organization:</label>
          <select
            className={`form-control ${props.orgIdValid ? "" : "is-invalid"}`}
            name="orgId"
            onChange={props.onChangeOrganization}
          >
            <option value="null">Assign Organization</option>
            {props.organization.map(org => {
              return (
                <option key={org.Id} value={org.Id}>
                  {org.DisplayName}
                </option>
              );
            })}
          </select>
          <div className="invalid-feedback">Please Select an Organization</div>
        </div>
        <div className="form-group">
          <label className="form-label">Funding Source:</label>
          <select
            className={`form-control ${
              props.fundSourceIdValid ? "" : "is-invalid"
              }`}
            name="fundSourceId"
            onChange={props.onChangeFundSource}
          >
            <option value="null">Assign Funding Source...</option>
            {props.fundingSource.map(item => {
              return (
                <option key={item.id} value={item.id}>
                  {item.displayName}
                </option>
              );
            })}
          </select>
          <div className="invalid-feedback">Please Select a Funding Source</div>
        </div>
        <TextInput
          name="firstName"
          label="First Name: "
          type="text"
          value={props.firstName}
          placeholder="Enter First Name Here"
          onChange={props.onChange}
          isValid={props.firstNameValid}
          hintText="Please enter a first name"
        />
        <TextInput
          name="middleInitial"
          label="Middle Inital:"
          type="text"
          value={props.middleInitial}
          placeholder="Middle Initial(optional)"
          onChange={props.onChange}
          isValid={true}
        />
        <TextInput
          name="lastName"
          label="Last Name:"
          type="text"
          value={props.lastName}
          placeholder="Last Name goes here"
          onChange={props.onChange}
          isValid={props.lastNameValid}
          hintText="Please enter a last name"
        />
        <TextInput
          name="email"
          label="Email:"
          type="email"
          value={props.email}
          placeholder="Email goes here"
          onChange={props.onChange}
          isValid={props.emailValid}
          hintText="Please enter a valid email"
        />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div className="form-group">
          <label className="form-label">Role:</label>
          <select
            className={`form-control ${props.roleIdValid ? "" : "is-invalid"}`}
            name="roleId"
            onChange={props.onChangeRole}
          >
            <option value="null">Assign Role...</option>
            {props.roleTypes.map(item => {
              return (
                <option key={item.roleId} value={item.roleId}>
                  {item.role}
                </option>
              );
            })}
          </select>
          <div className="invalid-feedback">Please Select a Role</div>
        </div>
        <div className="form-group d-none">
          <label className="form-label">Organization:</label>
          <select
            className={`form-control ${props.orgIdValid ? "" : "is-invalid"}`}
            name="orgId"
            onChange={props.onChangeOrganization}
          >
            <option value={orgId}>{orgId}</option>
          </select>
        </div>
        <div className="form-group d-none">
          <label className="form-label">Funding Source:</label>
          <select
            className={`form-control ${
              props.fundSourceIdValid ? "" : "is-invalid"
              }`}
            name="fundSourceId"
            onChange={props.onChangeonChangeFundSource}
          >
            <option value={currentUserFundSourceId} />
          </select>
        </div>
        <TextInput
          name="firstName"
          label="First Name: "
          type="text"
          value={props.firstName}
          placeholder="Enter First Name Here"
          onChange={props.onChange}
          isValid={props.firstNameValid}
          hintText="Please enter a first name"
        />
        <TextInput
          name="middleInitial"
          label="Middle Inital:"
          type="text"
          value={props.middleInitial}
          placeholder="Middle Initial(optional)"
          onChange={props.onChange}
          isValid={true}
        />
        <TextInput
          name="lastName"
          label="Last Name:"
          type="text"
          value={props.lastName}
          placeholder="Last Name goes here"
          onChange={props.onChange}
          isValid={props.lastNameValid}
          hintText="Please enter a last name"
        />
        <TextInput
          name="email"
          label="Email:"
          type="email"
          value={props.email}
          placeholder="Email goes here"
          onChange={props.onChange}
          isValid={props.emailValid}
          hintText="Please enter a valid email"
        />
      </React.Fragment>
    );
  }
};

const mapStateToProps = state => {
  return { user: state.UserReducer };
};

export default connect(mapStateToProps)(RegisterFormRI);
