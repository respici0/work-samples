import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import RegisterRI from './InviteRegister';
import AllInviteKeys from './AllInviteKeys';
import InviteUpdate from './InviteUpdate';

class NavigationRI extends Component {
  render() {
    return (
      <React.Fragment>
        <Route exact path="/keys/invite" component={RegisterRI} />
        <Route exact path="/keys/list" component={AllInviteKeys} />
        <Route path="/keys/edit/:id" component={InviteUpdate} />
      </React.Fragment>
    )
  }
}

export default NavigationRI