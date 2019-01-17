import React, { Component } from "react";
import ListTemplate from "./ConnectionListTemplate";
import UsersService from "../../services/UsersService";
import OrgUsersService from "../../services/OrgUsersServices";
import OrganizationService from "../../services/OrganizationService";
import { connect } from "react-redux";
import { on, off, ack, emit, EventType } from "../../redux/SocketIOActions";

class OrganizationConnections extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userIds: [],
            currentUser: {},
            currentRoleId: "",
            arrayOfUsers: [],
            orgPeopleArray: [],
            organization: [],
            phoneNumbers: [],
            signedInUsers: {},
            active: false
        };
    }

  componentDidMount = () => {
    UsersService.getCurrent(this.getCurrentSuccess, this.onGetCurrentError);
    OrgUsersService.GetAllOrgNumbers(
      this.onGetAllOrgNumbersSuccess,
      this.onGetAllOrgNumbersError
    );
    this.props.on(EventType.loginUser, userId => {
      this.setState({
        signedInUsers: {
          ...this.state.signedInUsers,
          [userId]: true
        }
      });
    });
    this.props.on(EventType.logoutUser, userId => {
      this.setState({
        signedInUsers: {
          ...this.state.signedInUsers,
          [userId]: false
        }
      });
    });
  };

    componentWillUnmount = () => {
        this.props.off(EventType.loginUser);
        this.props.off(EventType.logoutUser);
    };

    getCurrentSuccess = response => {
        this.setState({
            ...this.state,
            currentUser: response.data,
            currentRoleId: response.data.roles[0]
        });
        let currentUserId = this.state.currentUser.orgId;
        OrganizationService.selectById(
            currentUserId,
            this.onSelectByIdSuccess,
            this.onSelectByIdError
        );
        OrgUsersService.GetAllUsers(
            this.onGetAllUsersSuccess,
            this.onGetAllUsersError
        );
    };

    onGetAllUsersSuccess = response => {
        const arrayOfUsers = response.data.items;
        console.log("Test", arrayOfUsers);
        console.log(arrayOfUsers[0].orgId);
        let currentUserOrgId = this.state.currentUser.orgId[0];
        const newOrgPeopleArray = [];
        for (let i = 0; i < arrayOfUsers.length; i++) {
            if (arrayOfUsers[i].orgId === currentUserOrgId) {
                newOrgPeopleArray.push(arrayOfUsers[i]);
            }
        }
        this.setState(
            {
                ...this.state,
                orgPeopleArray: newOrgPeopleArray
            },
            () => {
                const testUserIds = this.state.orgPeopleArray.map(person => {
                    return person.userId;
                });
                console.log("users im interested in", testUserIds);
                this.props.ack(
                    EventType.checkOnlineStatuses,
                    this.getListOfOnlineUsers,
                    testUserIds
                );
            }
        );
        OrgUsersService.GetAllOrgNumbers(
            this.onGetAllOrgNumbersSuccess,
            this.onGetAllOrgNumbersError
        );
    };

    getListOfOnlineUsers = signedInUsers => {
        console.log(signedInUsers);
        this.setState({ signedInUsers });
    };

    onGetAllOrgNumbersSuccess = response => {
        console.log(response);
        this.setState({
            ...this.state,
            phoneNumbers: response.data.items
        });
        this.addNumbersToOrgPeople();
    };

    addNumbersToOrgPeople = () => {
        const orgPeopleArray = this.state.orgPeopleArray;
        const phoneNumbers = this.state.phoneNumbers;
        console.log(phoneNumbers);
        console.log(orgPeopleArray);
        const newArrayOfOrgUsers = [];

        for (let i = 0; i < orgPeopleArray.length; i++) {
            for (let j = 0; j < phoneNumbers.length; j++) {
                if (orgPeopleArray[i].userId === phoneNumbers[j].userId) {
                    const newPersonObject = Object.assign(
                        orgPeopleArray[i],
                        phoneNumbers[j]
                    );
                    newArrayOfOrgUsers.push(newPersonObject);
                }
            }
        }
        this.setState({
            orgPeopleArray: newArrayOfOrgUsers
        });
    };

    onSelectByIdSuccess = response => this.setState({ organization: response });

    onGetAllOrgNumbersError = response => console.log(response);

    onSelectByIdError = response => console.log(response);

    onGetCurrentError = response => console.log(response);

    onGetAllUsersError = response => console.log(response);

    render() {
        const orgInfo = this.state.organization;
        console.log(this.props);

        return (
            <React.Fragment>
                <div className="container container-p-y">
                    <div className="card px-3 pt-3 mb-4">
                        <div className="row">
                            <div className="col-md">
                                <img
                                    src={orgInfo.LogoUrl}
                                    className="border border-dark thumbnail mb-3 mr-5"
                                    style={{
                                        maxHeight: "200px",
                                        maxWidth: "200px"
                                    }}
                                    alt=""
                                />
                            </div>
                            <div className="col-md">
                                <h3>{orgInfo.DisplayName}</h3>
                                <label>
                                    <span className="row badge badge-outline-success">
                                        {this.state.currentRoleId}
                                    </span>
                                </label>
                            </div>
                            <div className="col-md">
                                <input
                                    type="text"
                                    name="searchedParam"
                                    className="form-control mb-3"
                                    placeholder="Search..."
                                />
                                <select className="form-control mb-3 custom-select">
                                    <option value="">Eleveight</option>
                                    <option value="">SABIO</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <ListTemplate
                        {...this.state}
                        onChatBubbleClick={this.onChatBubbleClick}
                    />
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
        emit: (event, payload) => {
            dispatch(emit(event, payload));
        },
        on: (event, callback) => {
            dispatch(on(event, callback));
        },
        off: (event, callback) => {
            dispatch(off(event, callback));
        },
        ack: (event, callback, payload) => {
            dispatch(ack(event, callback, payload));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrganizationConnections);
