import { get, post } from "./ajax";
import { User } from "interfaces/User";
import { Auth } from "auth";

export const signInRequest = (
  email: string,
  password: string
): Promise<void> => {
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
