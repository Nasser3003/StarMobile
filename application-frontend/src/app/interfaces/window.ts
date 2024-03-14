import { User } from "../models/user";

declare global {
    interface Window {
      constructUserFromResponse: (responseBody: any) => User;
    }
  }

export function constructUserFromResponse(responseBody: any): User {
  // Extract the properties you need from responseBody
  const { id, firstName, lastName, email, username, password, plans } = responseBody;

  // Construct a User object
  const user = new User(id, firstName, lastName, email, username, password, plans);

  return user;
}

window.constructUserFromResponse = function(responseBody: any): User {
  // Extract the properties you need from responseBody
  const { id, firstName, lastName, email, username, password, plans } = responseBody;

  // Construct a User object
  const user = new User(id, firstName, lastName, email, username, password, plans);

  return user;
};
  
  export {};