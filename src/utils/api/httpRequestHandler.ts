const getRequest = (): Promise<any> => {
  return Promise.resolve({
    id: 46892093,
    name: "AutoCBS1",
    status: "Active",
    adminType: "Single Admin",
    passwordExpiryPeriod: 90,
    activeFrom: "25/07/2019"
  });
};

export const httpRequestHandler = { getRequest };
