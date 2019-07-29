import React, { Dispatch, useEffect } from "react";
import ClientDetails from "../clientDetails/ClientDetails";
import styles from "./styles/ClientSummary.module.css";
import { connect } from "react-redux";
import { IAppState } from "../../store/reducers";
import { getClientSummaryAction } from "../../store/action/clientSummaryAction";

const ClientSummary = (props: any) => {
  useEffect(
    () => {
      props.clientSummaryRequest();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const {
    id,
    name,
    status,
    adminType,
    passwordExpiryPeriod,
    activeFrom
  } = props.clientSummary;

  return (
    <section className={styles.clientSummaryDetails}>
      <h1 className="primary-color">Client Summary</h1>
      <ClientDetails
        id={id}
        name={name}
        status={status}
        adminType={adminType}
        passwordExpiryPeriod={passwordExpiryPeriod}
        activeFrom={activeFrom}
      />
    </section>
  );
};

const mapStateToProps = (store: IAppState): any => ({
  clientSummary: store.clientSummary
});

const mapDispatchToProps = (dispatch: Dispatch<any>): any => {
  return {
    clientSummaryRequest: () => {
      dispatch(getClientSummaryAction());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientSummary);
