import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class GoodsEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('varchar', { length: 128, nullable: false })
  name: string;

  @Column('varchar', { length: 128, nullable: false, default: '' })
  smallPhotoUrl?: string;

  @Column('varchar', { length: 128, nullable: false, default: '' })
  bigPhotoUrl?: string;

  @Column({ nullable: true, default: null })
  price: number;

  @Column('varchar', {
    length: 512,
    nullable: false,
    default: '',
  })
  description?: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  isActive?: boolean;

  @CreateDateColumn()
  createdOn?: Date;

  @UpdateDateColumn()
  updatedOn?: Date;
}
