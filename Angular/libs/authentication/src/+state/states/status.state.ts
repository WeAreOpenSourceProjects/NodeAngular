import { User } from '../../models/user.model';

export interface StatusState {
  user: User | null;
  loading: boolean;
}
