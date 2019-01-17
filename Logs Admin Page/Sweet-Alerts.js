/** sweet alert dependency to pop up before truncating logs because you can't retrieve them after they have been deleted **//

    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        cancelBtnBsStyle="default"
        title="Are you sure?"
        onConfirm={() => {
          this.handleDeleteAll();
          this.confirmAlertPopUp();
        }}
        onCancel={() => {
          this.hideAlert();
          this.onCancelOfSwtAlert();
        }}
      >
        You will not be able to recover these logs!
      </SweetAlert>
    );

    this.setState({
      alert: getAlert()
    });
  }

  handleSingleDeleteSweetAlert() {
    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        cancelBtnBsStyle="default"
        title="Are you sure?"
        onConfirm={() => {
          this.handlePanelDelete();
          this.confirmAlertPopUp();
        }}
        onCancel={() => {
          this.hideAlert();
          this.onCancelOfSwtAlert();
        }}
      >
        You will not be able to recover this log
      </SweetAlert>
    );
    this.setState({
      alert: getAlert()
    });
  }

  confirmAlertPopUp = () => {
    const confirmAlert = () => (
      <SweetAlert success title="Success!" onConfirm={() => this.hideAlert()}>
        Deleted
      </SweetAlert>
    );
    this.setState({
      confirmAlert: confirmAlert()
    });
  };

  onCancelOfSwtAlert = () => {
    const confirmAlert = () => (
      <SweetAlert danger title="Cancelled" onConfirm={() => this.hideAlert()}>
        Logs are safe
      </SweetAlert>
    );
    this.setState({
      confirmAlert: confirmAlert()
    });
  };

  hideAlert = () => {
    this.setState({
      alert: null,
      confirmAlert: null,
      exceptionAlert: null
    });
