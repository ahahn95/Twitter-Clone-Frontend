interface Ienv {
  API_DOMAIN: string;
  API_PORT: string;
}

export const enviornment: Ienv = {
  API_DOMAIN: process.env.REACT_APP_API_DOMAIN || "",
  API_PORT: process.env.REACT_APP_API_PORT || ""
};
