import React from "react";
import RespicioService from "../../services/LogsService";
import { connect } from "react-redux";
import { loginStatus } from "../../redux/UserActions";
import { withRouter } from "react-router-dom";
import DateTime from "react-datetime";
import "./Date.css";
const moment = require("moment");
moment().format();

class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    Service.searchedLogs(
      this.state,
      this.searchedLogsSuccess,
      this.searchedLogsError
    );
    *Service.getAllLogs(this.onGetAllLogsSuccess, this.onGetAllLogsError);
  }

  handleNextButton = () => {
    const arrayLength = this.state.arrayOfLogs.length;
    const nextPage = this.state.page;
    const rowOfLogs = this.state.rowOfLogs;
    if (arrayLength < rowOfLogs) {
      return false;
    } else {
      this.setState(
        {
          ...this.state,
          page: nextPage + 1
        },
        () => {
          *Service.searchedLogs(
            this.state,
            this.searchedLogsSuccess,
            this.searchedLogsError
          );
          *Service.getAllLogs(
            this.onGetAllLogsSuccess,
            this.onGetAllLogsError
          );
        }
      );
    }
  };

  handlePrevButton = () => {
    const prevPage = this.state.page;
    if (prevPage === 1) {
      return false;
    } else {
      this.setState(
        {
          ...this.state,
          page: prevPage - 1
        },
        () => {
         *Service.searchedLogs(
            this.state,
            this.searchedLogsSuccess,
            this.searchedLogsError
          );
        }
      );
    }
  };

  onGetAllLogsSuccess = response =>
    this.setState({ totalRows: response.data.items.length });

  onGetAllLogsError = response => console.log(response);

  searchedLogsSuccess = response =>
    this.setState({
      ...this.state,
      arrayOfLogs: response.data.items
    });

  searchedLogsError = response => console.log(response);

  handleDeleteAll = () => {
   *Service.deleteAllLogs(this.onDeleteAllSuccess, this.onDeleteAllError);
  };

  onDeleteAllSuccess = response => {
    *Service.searchedLogs(
      this.state,
      this.searchedLogsSuccess,
      this.searchedLogsError
    );
    *Service.getAllLogs(this.onGetAllLogsSuccess, this.onGetAllLogsError);
  };

  onDeleteAllError = response => console.log(response);

  holdPanelId = id =>
    this.setState({
      ...this.state,
      id: id
    });

  handlePanelDelete = () =>
   *Service.deleteLog(
      this.state.id,
      this.onDeleteLogSuccess,
      this.onDeleteLogError
    );

  onDeleteLogSuccess = response => {
    this.setState({
      ...this.state
    });
    *Service.searchedLogs(
      this.state,
      this.searchedLogsSuccess,
      this.searchedLogsError
    );
   *Service.getAllLogs(this.onGetAllLogsSuccess, this.onGetAllLogsError);
  };

  onDeleteLogError = response => console.log(response);

  onStartDateChange = date => {
    let sDate = moment(date).format("YYYY-MM-DD");
    this.setState(
      {
        dateStart: sDate
      },
      () => {
        if ("dateStart" && !date) {
          this.setState(
            {
              ...this.state,
              dateStart: "2000-12-12"
            },
            () => {
              *Service.searchedLogs(
                this.state,
                this.searchedLogsSuccess,
                this.searchedLogsError
              );
            }
          );
        } else {
         *Service.searchedLogs(
            this.state,
            this.searchedLogsSuccess,
            this.searchedLogsError
          );
        }
      }
    );
  };

  onEndDateChange = date => {
    let eDate = moment(date).format("YYYY-MM-DD");
    this.setState(
      {
        dateEnd: eDate
      },
      () => {
        if ("dateEnd" && !date) {
          this.setState(
            {
              ...this.state,
              dateEnd: "2199-12-12"
            },
            () => {
             *Service.searchedLogs(
                this.state,
                this.searchedLogsSuccess,
                this.searchedLogsError
              );
            }
          );
        }
      *Service.searchedLogs(
          this.state,
          this.searchedLogsSuccess,
          this.searchedLogsError
        );
      }
    );
  };

  onChange = evt => {
    let name = evt.target.name;
    let value =
      typeof evt.target.value === "number"
        ? parseInt(evt.target.value)
        : evt.target.value;
    this.setState(
      {
        ...this.state,
        [name]: value
      },
      () => {
        if (
          name === "" ||
          name === "" ||
          name === "" ||
          value <= 0
        ) {
          this.setState(
            {
              ...this.state,
              page: 1
            },
            () => {
             *Service.searchedLogs(
                this.state,
                this.searchedLogsSuccess,
                this.searchedLogsError
              );
              *Service.getAllLogs(
                this.onGetAllLogsSuccess,
                this.onGetAllLogsError
              );
            }
          );
        } else {
         *Service.searchedLogs(
            this.state,
            this.searchedLogsSuccess,
            this.searchedLogsError
          );
          *Service.getAllLogs(
            this.onGetAllLogsSuccess,
            this.onGetAllLogsError
          );
        }
      }
    );
  };

  handleSort = evt => {
    let eventName = evt.target.className;
    let sortOrder = this.state.sortOrder;
    if (sortOrder === "ASC") {
      this.setState(
        {
          ...this.state,
          sortBy: eventName,
          sortOrder: "DESC",
          page: 1,
          hide: true,
          isHidden: false
        },
        () =>
          *Service.searchedLogs(
            this.state,
            this.searchedLogsSuccess,
            this.searchedLogsError
          )
      );
    } else {
      this.setState(
        {
          ...this.state,
          sortBy: eventName,
          sortOrder: "ASC",
          page: 1,
          hide: false,
          isHidden: true
        },
        () =>
         *Service.searchedLogs(
            this.state,
            this.searchedLogsSuccess,
            this.searchedLogsError
          )
      );
    }
  };

  render() {
    const arrayOfPagedLogs = this.state.arrayOfLogs.map((log, idx) => {
      return (
        <tbody
          key={idx}
          style={{
            display: "auto"
          }}
        >
          <tr>
            <td>
              {log.level === "DEBUG" && (
                <span className="badge badge-outline-primary">
                  {log.level}{" "}
                </span>
              )}
              {log.level === "INFO" && (
                <span className="badge badge-outline-info">{log.level} </span>
              )}
              {log.level === "WARN" && (
                <span className="badge badge-outline-warning">
                  {log.level}{" "}
                </span>
              )}
              {log.level === "ERROR" && (
                <span className="badge badge-outline-warning">
                  {log.level}{" "}
                </span>
              )}
              {log.level === "FATAL" && (
                <span className="badge badge-outline-danger">{log.level} </span>
              )}{" "}
              <span className="float-right">
                {log.exception && (
                  <i
                    data-toggle="tooltip"
                    data-placement="right"
                    title={log.exception}
                    className="ion ion-ios-warning"
                    style={{
                      color: "orangered",
                      fontSize: "1.4em",
                      cursor: "pointer"
                    }}
                  />
                )}
              </span>
            </td>
            <td>{log.id}</td>
            <td>
              {log.date.split("T", 1)} {log.date.slice(11).split(".", 1)}
            </td>
            <td>{log.logger}</td>
            <td style={{ width: "650px" }}>
              <div
                style={{
                  maxHeight: "150px",
                  width: "650px",
                  margin: "0",
                  padding: "0",
                  overflow: "auto"
                }}
              >
                {log.message}
              </div>
            </td>
            <td>
              <button type="button" className="btn btn-default btn-xs icon-btn">
                <i
                  className="ion ion-md-close"
                  onClick={() => {
                    this.holdPanelId(log.id);
                    this.handleSingleDeleteSweetAlert();
                  }}
                />
              </button>
            </td>
          </tr>
        </tbody>
      );
    });
    return (
      <React.Fragment>
        <div className="container-fluid flex-grow-1 container-p-y">
          <h4 className="d-flex justify-content-between align-items-center w-100 font-weight-bold py-3 mb-4">
            <div>Logs</div>
            <button
              type="button"
              className="btn btn-secondary btn-round d-block"
              onClick={this.onReset}
            >
              <span className="ion ion-md-refresh" /> Reset Search
            </button>
          </h4>
          <div className="card px-4 pt-4 mb-4 col-sm-12">
            <div className="row">
              <div className="col-md mb-1">
                <label className="form-label">Filter Types</label>
                <select
                  className="loggingLevel custom-select"
                  name="levelType"
                  value={this.state.value}
                  onChange={this.onChange}
                >
                  <option value="">All Types</option>
                  <option value="DEBUG">DEBUG</option>
                  <option value="INFO">INFO</option>
                  <option value="WARN">WARN</option>
                  <option value="ERROR">ERROR</option>
                  <option value="FATAL">FATAL</option>
                </select>
              </div>
              <div className="col-md mb-1">
                <label className="form-label">Start Date</label>
                <DateTime
                  type="date"
                  name="dateStart"
                  dateStart={this.state.dateStart}
                  onChange={this.onStartDateChange}
                />
              </div>
              <div className="col-md mb-1">
                <label className="form-label">End Date</label>
                <DateTime
                  type="date"
                  name="dateEnd"
                  dateEnd={this.state.dateEnd}
                  onChange={this.onEndDateChange}
                />
              </div>
              <div className="col-md mb-1">
                <label className="form-label">Search</label>
                <input
                  type="search"
                  className="form-control"
                  name="searchBox"
                  onChange={this.onChange}
                  placeholder="Logger & Messages"
                />
              </div>
            </div>
            <hr />
            <div className="card-datatable">
              <div className="row">
                <div className="col-md mb-3 text-left">
                  <label>Show</label>{" "}
                  <select
                    className="form-control-sm "
                    name="rowOfLogs"
                    onChange={this.onChange}
                    value={this.state.value}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                  </select>{" "}
                  <label>
                    of{" "}
                    <span className="form-label">{this.state.totalRows}</span>{" "}
                    Entries
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr rowSpan="1">
                        <th
                          className="Level"
                          style={{ cursor: "pointer" }}
                          onClick={this.handleSort}
                        >
                          <i
                            className="ion ion-ios-arrow-round-up align-middle "
                            hidden={this.state.hide}
                          />
                          <i
                            className="ion ion-ios-arrow-round-down align-middle "
                            hidden={this.state.isHidden}
                          />{" "}
                          Type
                        </th>
                        <th
                          className="Id"
                          style={{
                            cursor: "pointer"
                          }}
                          onClick={this.handleSort}
                        >
                          <i
                            className="ion ion-ios-arrow-round-up align-middle "
                            hidden={this.state.hide}
                          />
                          <i
                            className="ion ion-ios-arrow-round-down align-middle "
                            hidden={this.state.isHidden}
                          />{" "}
                          Id
                        </th>
                        <th
                          className="Date"
                          style={{ cursor: "pointer" }}
                          onClick={this.handleSort}
                        >
                          <i
                            className="ion ion-ios-arrow-round-up align-middle "
                            hidden={this.state.hide}
                          />
                          <i
                            className="ion ion-ios-arrow-round-down align-middle "
                            hidden={this.state.isHidden}
                          />{" "}
                          Date & Time
                        </th>
                        <th
                          className="Logger"
                          style={{
                            cursor: "pointer"
                          }}
                          onClick={this.handleSort}
                        >
                          <i
                            className="ion ion-ios-arrow-round-up align-middle "
                            hidden={this.state.hide}
                          />
                          <i
                            className="ion ion-ios-arrow-round-down align-middle "
                            hidden={this.state.isHidden}
                          />{" "}
                          Logger
                        </th>

                        <th className="Message">
                          <i
                            className="ion ion-ios-arrow-round-up align-middle "
                            hidden={this.state.hide}
                          />
                          <i
                            className="ion ion-ios-arrow-round-down align-middle "
                            hidden={this.state.isHidden}
                          />{" "}
                          Message
                        </th>
                        <th>
                          <button
                            type="button"
                            className="btn btn-xs btn-outline-light borderless"
                            onClick={() => this.handleSweetAlert()}
                          >
                            <i
                              className="ion ion-md-trash navbar-icon align-middle"
                              style={{
                                color: "crimson",
                                fontSize: "1.5em"
                              }}
                            />
                          </button>
                          {this.state.alert}
                          {this.state.confirmAlert}
                          {this.state.exceptionAlert}
                        </th>
                      </tr>
                    </thead>
                    {arrayOfPagedLogs}
                  </table>
                </div>
              </div>
              <div className=" row">
                <label
                  className="dataTables_info"
                  style={{ margin: "10px", color: "#a3a4a6" }}
                >
                  Page {this.state.page}{" "}
                </label>
                <div className="col-md mb-4" style={{ textAlign: "right" }}>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary text-muted "
                    name="page"
                    value={this.state.value}
                    onClick={this.handlePrevButton}
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary text-muted"
                    name="page"
                    value={this.state.value}
                    onClick={this.handleNextButton}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
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
  )(AdminPanel)
);
