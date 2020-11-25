import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from 'src/auth/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class OrdersEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(type => UserEntity)
  @ManyToOne(() => UserEntity, { eager: true, cascade: false, nullable: false })
  userId: UserEntity;

  @Field()
  @Column({ type: 'boolean', nullable: false, default: false })
  isCanceled: boolean;

  @Field()
  @Column({ type: 'boolean', nullable: false, default: false })
  isPaid: boolean;

  @Field()
  @Column({ type: 'boolean', nullable: false, default: false })
  isDispatched: boolean;

  @Field()
  @Column({ type: 'boolean', nullable: false, default: false })
  isDelivered: boolean;

  @Field({ description: `status` })
  @Column('varchar', {
    length: 128,
    nullable: false,
    default: '',
  })
  status: string;

  @Field({ description: `deliverAddress` })
  @Column('varchar', {
    length: 512,
    nullable: false,
    default: '',
  })
  deliverAddress: string;

  @Field({ description: `userNote` })
  @Column('varchar', {
    length: 512,
    nullable: false,
    default: '',
  })
  userNote: string;

  @Field()
  @CreateDateColumn()
  createdOn: Date;

  @Field()
  @UpdateDateColumn()
  updatedOn: Date;
}
