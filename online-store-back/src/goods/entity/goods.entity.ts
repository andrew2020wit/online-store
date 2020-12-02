import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class GoodsEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiProperty()
  @Column('varchar', { length: 128, nullable: false })
  name: string;

  @ApiProperty()
  @Column('varchar', { length: 128, nullable: false, default: '' })
  smallPhotoUrl?: string;

  @ApiProperty()
  @Column('varchar', { length: 128, nullable: false, default: '' })
  bigPhotoUrl?: string;

  @ApiProperty()
  @Column({ nullable: true, default: null })
  price: number;

  @ApiProperty()
  @Column('varchar', { length: 128, nullable: true })
  currency?: string;

  @ApiProperty()
  @Column({ nullable: true, default: null })
  maxOrderCount?: number;

  @ApiProperty()
  @Column({ nullable: true, default: 0 })
  stockCount?: number;

  @ApiProperty()
  @Column('varchar', {
    length: 512,
    nullable: false,
    default: '',
  })
  description?: string;

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
