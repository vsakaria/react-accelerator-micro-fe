import React from "react";
import { IClient } from "../IClient";
import { withErrorBoundary } from "../../utils/components/ErrorBoundaryHoC";

const ClientDetails: React.FC<IClient> = ({
  id,
  name,
  status,
  adminType,
  passwordExpiryPeriod,
  activeFrom
}) => {
  return (
    <section className="clientDetailContainer">
      <h4 className="title">Client details</h4>
      <table>
        <tbody>
          <tr>
            <td>Client id</td>
            <td className="bold">{id.toString()}</td>
          </tr>
          <tr>
            <td>Client name</td>
            <td className="bold">{name}</td>
          </tr>
          <tr>
            <td>Client status</td>
            <td className="bold">{status}</td>
          </tr>
          <tr>
            <td>Administration type</td>
            <td className="bold">{adminType}</td>
          </tr>
          <tr>
            <td>Password expiry period</td>
            <td className="bold">{`${passwordExpiryPeriod} ${
              passwordExpiryPeriod > 1 ? "days" : "day"
            }`}</td>
          </tr>
          <tr>
            <td>Active form</td>
            <td className="bold">{activeFrom}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default withErrorBoundary(ClientDetails);
