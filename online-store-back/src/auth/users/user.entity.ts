import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiProperty()
  @Column({
    nullable: false,
    unique: true,
  })
  @Length(3, 32)
  login?: string;

  @ApiProperty()
  @Column({
    nullable: false,
    unique: true,
  })
  @Length(3, 64)
  fullName?: string;

  @ApiProperty()
  @Column({
    nullable: false,
    select: false,
  })
  @Length(2, 32)
  password?: string;

  @ApiProperty()
  @Column({ nullable: false, default: 'user' })
  role?: string;

  @ApiProperty()
  @Column({ nullable: true, default: '' })
  defaultDeliverAddress?: string;

  @ApiProperty()
  @Column({ type: 'boolean', nullable: false, default: true })
  isActive?: boolean;

  @ApiProperty()
  @CreateDateColumn()
  createdOn?: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedOn?: Date;
}

export const selectAllUserEntity = [
  'id',
  'login',
  'fullName',
  'password',
  'role',
  'isActive',
  'createdOn',
  'updatedOn',
];
