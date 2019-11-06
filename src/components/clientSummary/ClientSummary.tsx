import React, { Dispatch, useEffect, ReactElement } from "react";
import { connect } from "react-redux";
import { getClientSummaryAction } from "../../store/action/clientSummaryAction";
import { IAppState } from "../../store/reducers";
import styles from "./styles/ClientSummary.module.css";
import ClientDetails from "../clientDetails/ClientDetails";

export const ClientSummary = (props: any): ReactElement => {
  const { getClientSummaryAction } = props;

  useEffect(() => {
    getClientSummaryAction();
  }, [getClientSummaryAction]);

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

interface MapStateToProps {
  clientSummary: {};
}

const mapStateToProps = (store: IAppState): MapStateToProps => ({
  clientSummary: store.clientSummary
});

interface MapDispatchToProps {
  getClientSummaryAction: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch<any>): MapDispatchToProps => {
  return {
    getClientSummaryAction: (): void => {
      dispatch(getClientSummaryAction());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientSummary);
