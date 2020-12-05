import { UserEntity } from '../../user/user.entity';
export type UserAdminView = Omit<UserEntity, 'password'>;
