import React from "react";
import { withErrorBoundary } from "../../utils/components/ErrorBoundaryHoC";
import { IClient } from "../IClient";
import styles from "./styles/ClientDetails.module.css";

export const ClientDetails: React.FC<IClient> = ({
  id,
  name,
  status,
  adminType,
  passwordExpiryPeriod,
  activeFrom
}) => {
  return (
    <section className={styles.clientDetailContainer}>
      <h4 className="primary-color">Client details</h4>
      <table className={styles.clientDetailTable}>
        <tbody>
          <tr>
            <td>Client id</td>
            <td>{id}</td>
          </tr>
          <tr>
            <td>Client name</td>
            <td>{name}</td>
          </tr>
          <tr>
            <td>Client status</td>
            <td>{status}</td>
          </tr>
          <tr>
            <td>Administration type</td>
            <td>{adminType}</td>
          </tr>
          <tr>
            <td>Password expiry period</td>
            <td>{`${passwordExpiryPeriod} ${
              passwordExpiryPeriod > 1 ? "days" : "day"
            }`}</td>
          </tr>
          <tr>
            <td>Active form</td>
            <td>{activeFrom}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default withErrorBoundary(ClientDetails);
