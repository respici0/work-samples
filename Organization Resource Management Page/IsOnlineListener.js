import React from "react";

const isOnlineListener = props => {
  return (
    <React.Fragment>
      {(props.isOnline && (
        <div>
          <span class="badge badge-dot badge-success" />
          &nbsp; <span style={{ color: "Green" }}>Online</span>
        </div>
      )) ||
        (!props.isOnline && (
          <div>
            <span class="badge badge-dot badge-danger" />
            &nbsp; <span style={{ color: "Red" }}>Offline</span>
          </div>
        ))}
    </React.Fragment>
  );
};

export default isOnlineListener;
