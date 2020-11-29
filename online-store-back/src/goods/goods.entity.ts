import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class GoodsEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Field({ description: `Goods name` })
  @Column('varchar', { length: 128, nullable: false })
  name: string;

  @Field({ description: `photoUrl` })
  @Column('varchar', { length: 128, nullable: false, default: '' })
  smallPhotoUrl?: string;

  @Field({ description: `photoUrl` })
  @Column('varchar', { length: 128, nullable: false, default: '' })
  bigPhotoUrl?: string;

  @Field({ description: `price` })
  @Column({ nullable: true, default: null })
  price: number;

  @Field({ description: `Goods description` })
  @Column('varchar', {
    length: 512,
    nullable: false,
    default: '',
  })
  description?: string;

  @Field()
  @Column({ type: 'boolean', nullable: false, default: true })
  isActive?: boolean;

  @Field()
  @CreateDateColumn()
  createdOn?: Date;

  @Field()
  @UpdateDateColumn()
  updatedOn?: Date;
}
