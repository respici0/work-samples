import React from "react";
import TextInput from "../common/TextInput";
import TextArea from "../common/TextArea";

const LogsForm = props => (
  <div className="container mb-4 card">
    <TextInput
      name="date"
      label="Date"
      type="date"
      value={props.date}
      placeholder="Date"
      onChange={props.onChange}
    />

    <TextInput
      name="thread"
      label="Thread"
      type="thread"
      value={props.thread}
      placeholder="Thread"
      onChange={props.onChange}
    />

    <TextInput
      name="level"
      label="Level"
      type="level"
      value={props.level}
      placeholder="Level"
      onChange={props.onChange}
    />

    <TextInput
      name="logger"
      label="Logger"
      type="logger"
      value={props.logger}
      placeholder="Logger"
      onChange={props.onChange}
    />

    <TextArea
      name="message"
      label="Message"
      type="message"
      value={props.message}
      placeholder="Message"
      onChange={props.onChange}
    />

    <TextArea
      name="exception"
      label="Exception"
      type="exception"
      value={props.exception}
      placeholder="Exception"
      onChange={props.onChange}
    />

    <button
      type="button"
      className="btn btn-success col-md-2 mb-4"
      onClick={props.handleClick}
      disabled={!props.disabled}
    >
      Submit
    </button>
  </div>
);

export default LogsForm;
