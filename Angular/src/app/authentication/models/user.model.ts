export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username?: string;
  email: string;
  profileImageURL: string;
  provider: string;
  roles: Array<string>;
}
