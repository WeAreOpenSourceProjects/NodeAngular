export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username?: string;
  email: string;
  profileImageURL: string;
  roles: Array<string>;
}
