import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Icon from "../Icon";
import { successIcon, errorIcon, closeIcon } from "../icons";
import { Wrapper, Content, Message } from "./Wrappers";

import { CheckCircleIcon } from '@heroicons/react/solid';

const Alert = () => {
  const { alerts } = useSelector(state => state.notifications);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (alerts.length > 0) {
      setAlert(alerts[alerts.length - 1]);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  }, [alerts]);

  const onClose = () => {
    setShow(false);
  };

  const color = alert.type === "success" ? "green" : "red";
  const iconUrl = alert.type === "success" ? CheckCircleIcon : errorIcon;

  return show ? (
    <Wrapper className={`${alert.type || "error"}`}>
      <Content>
        <Icon icon={iconUrl} color={color} size="20px" />
        <Message>{alert.message || ""}</Message>
      </Content>
      <Icon
        icon={closeIcon}
        color={color}
        size="24px"
        onClick={onClose}
        style={{ cursor: "pointer" }}
      />
    </Wrapper>
  ) : null;
};

export default Alert;

/* import { Fragment } from 'react';
import { connect } from 'react-redux';

import { CheckCircleIcon } from '@heroicons/react/solid';

function Alert({ alert }) {

  const displayAlert = () => {
    if (alert !== null) {
      return (
        <div className={`rounded-md bg-${alert.alertType}-50 p-4`}>
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircleIcon className={`h-5 w-5 text-${alert.alertType}-400`} aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium text-${alert.alertType}-800`}>{alert.msg}</p>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <Fragment></Fragment>
      )
    }
  }

  return (
    <Fragment>
      {displayAlert()}
    </Fragment>
  )
}

const mapStateToProps = state => ({
  alert: state.Alert.alert
});

export default connect(mapStateToProps)(Alert); */