import React, { Dispatch, useEffect } from "react";
import ClientDetails from "../clientDetails/ClientDetails";
import styles from "./styles/ClientSummary.module.css";
import { connect } from "react-redux";
import { IAppState } from "../../store/reducers";
import { getClientSummaryAction } from "../../store/action/clientSummaryAction";

export const ClientSummary = (props: any) => {
  const { getClientSummaryAction } = props;

  useEffect(
    () => {
      getClientSummaryAction();
    },
    [getClientSummaryAction]
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

interface mapStateToProps {
  clientSummary: {};
}

const mapStateToProps = (store: IAppState): mapStateToProps => ({
  clientSummary: store.clientSummary
});

interface mapDispatchToProps {
  getClientSummaryAction: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch<any>): mapDispatchToProps => {
  return {
    getClientSummaryAction: () => {
      dispatch(getClientSummaryAction());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientSummary);
