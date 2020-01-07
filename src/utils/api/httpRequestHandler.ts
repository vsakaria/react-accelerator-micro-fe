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

const postRequest = (url: string, payload: {}) => {
  return Promise.resolve({
    success: true
  });
}

export const httpRequestHandler = { getRequest, postRequest };
