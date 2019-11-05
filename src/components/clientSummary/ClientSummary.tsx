import React, { Dispatch, useEffect } from "react";
import { connect } from "react-redux";
import { getClientSummaryAction } from "../../store/action/clientSummaryAction";
import { IAppState } from "../../store/reducers";
import ClientDetails from "../clientDetails/ClientDetails";
import styles from "./styles/ClientSummary.module.css";

export const ClientSummary = (props: any) => {
  const { getClientSummaryAction } = props;

  useEffect(() => {
    getClientSummaryAction();
  }, []);

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

interface IMapStateToProps {
  clientSummary: {};
}

const mapStateToProps = (store: IAppState): IMapStateToProps => ({
  clientSummary: store.clientSummary
});

interface IMapDispatchToProps {
  getClientSummaryAction: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch<any>): IMapDispatchToProps => {
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
