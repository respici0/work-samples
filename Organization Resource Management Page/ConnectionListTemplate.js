import React from "react";
import IsOnlineListener from "./IsOnlineListener";
import SideChat from "../chat/SideChat";

const ListTemplate = props => {
  let currentUserId = props.currentUser.id;
  console.log("Before template", props.orgPeopleArray);
  const organizationMember = props.orgPeopleArray
    .filter(person => person.userId != currentUserId)
    .map((person, idx) => {
      return (
        <div id="accordian" key={idx}>
          <div className="card mb-4">
            <div className="card-header" id="headingOne">
              <div className="row">
                <div className="col-md">
                  <div className="row">
                    <img
                      src={person.fqUrl}
                      className="border border-dark rounded-circle float-left mr-5 mb-1"
                      style={{
                        height: "200px",
                        maxWidth: "200px",
                        textAlign: "center"
                      }}
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-md">
                  <div className="row">
                    <IsOnlineListener
                      isOnline={props.signedInUsers[person.userId]}
                    />
                  </div>
                  <div className="row">
                    <h3 className="text-dark">
                      {person.firstName} {person.middleInitial}{" "}
                      {person.lastName}
                    </h3>
                  </div>
                  <div className="row">
                    <h6>
                      <span className="align-self-start text-muted small mb-2">
                        @{person.userName}
                      </span>
                    </h6>
                  </div>
                  <div className="row">
                    <span className="badge badge-outline-info small">
                      {person.title}
                    </span>
                  </div>
                </div>
                <div className="col-md">
                  <div
                    className="row"
                    style={{ verticalAlign: "middle", display: "table-cell" }}
                  >
                    <div>
                      <label className="form-label"> Email:</label>{" "}
                      <span>{person.email}</span>
                    </div>
                    <div>
                      <label className="form-label"> Phone:</label>{" "}
                      <span>{person.phoneNumber}</span>
                    </div>
                    <div>
                      <label className="form-label"> Gender:</label>{" "}
                      <span>{person.gender}</span>
                    </div>
                  </div>
                </div>
                <div className="col-md">
                  <a
                    href="javascript:void(0)"
                    className="text-secondary float-right"
                    data-toggle="collapse"
                    data-target={`#${person.userId}`}
                    aria-expanded="false"
                  >
                    <span className="ion ion-ios-chatbubbles" />
                  </a>{" "}
                  &nbsp;&nbsp;
                </div>
              </div>
              <hr style={{ height: "2px" }} />
              <div
                id={`${person.userId}`}
                className="collapse"
                aria-labelledby="headingOne"
                data-parent={"#accordion"}
              >
                <SideChat recipientId={person.userId} showHeader={false} />
              </div>
            </div>
          </div>
        </div>
      );
    });
  return <React.Fragment>{organizationMember}</React.Fragment>;
};

export default ListTemplate;
