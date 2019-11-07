import { get, post } from "./ajax";
import { User } from "interfaces/User";
import { Auth } from "auth";

export type ISignInRequest = {
  email: string;
  password: string;
};

export const signInRequest = ({
  email,
  password
}: ISignInRequest): Promise<void> => {
  return post(
    "/signIn",
    {
      email,
      password
    },
    { auth: false }
  ).then((token: { token: string }) => {
    Auth.authenticateUser(token.token);
  });
};

export function getUsers(): Promise<User[]> {
  return get("/user");
}

export interface ISignUpRequest {
  email: string;
  name: string;
  password: string;
}

// export function createUser(
//   email: string,
//   name: string,
//   password: string
// ): Promise<> {
//   return post("/user");
// }
