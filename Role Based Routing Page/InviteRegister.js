import React, { Component } from "react";
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
      },
    };
  }

  c
    OrganizationService.selectById(
      response.data.orgId[0],
      this.onSelectByIdSuccess,
      this.onSelectByIdError
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

  onSuccess = () => this.props.history.push("/keys/list");

  onError = response => console.log(response);

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid flex-grow-1 container-p-y">
          <div className="card mb-4">
            <h6 className="card-header">Invite Key</h6>
            <div className="card-body">
              <RegisterFormRI
               
                organization={this.state.organization}
               
                currentUserOrgId={this.state.currentUserOrgId}
                
                orgId={this.state.orgId}
                orgIdValid={this.state.orgIdValid || !this.state.showErrors}
                
      
      
      
      
                onChange={this.onChange}
              
                onChangeOrganization={this.onChangeOrganization}
               
              />
             
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
