export interface IClient {
  id: number;
  name: string;
  status: string;
  adminType: string;
  passwordExpiryPeriod: number;
  activeFrom: string;
}
