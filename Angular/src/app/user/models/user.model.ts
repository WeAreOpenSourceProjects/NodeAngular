export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username?: string;
  profileImageURL: string;
  email: string;
  roles: Array<string>;
}
