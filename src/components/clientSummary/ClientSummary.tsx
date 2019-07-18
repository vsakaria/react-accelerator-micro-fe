import React from "react";
import ClientDetails from "../clientDetails/ClientDetails";
import styles from "./styles/ClientSummary.module.css";

const ClientSummary: React.FC = () => (
  <section className={styles.clientSummaryDetails}>
    <h1 className="title">Client Summary</h1>
    <ClientDetails
      id={49084369}
      name="AutoCBS1"
      status="Active"
      adminType="Single Admin"
      passwordExpiryPeriod={90}
      activeFrom="24/05/2019" //We could use a Date type here.
    />
  </section>
);
export default ClientSummary;
