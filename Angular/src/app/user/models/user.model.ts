export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username?: string;
  email: string;
  roles: Array<string>;
}
