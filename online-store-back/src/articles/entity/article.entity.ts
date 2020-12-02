import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/auth/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type articleTypes = 'article' | 'news' | 'review';

@Entity()
export class ArticleEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiProperty()
  @Column('varchar', { length: 128, nullable: false })
  title?: string;

  @ApiProperty()
  @Column('varchar', { length: 128, nullable: true, default: 'article' })
  articleType?: articleTypes;

  @ApiProperty()
  @Column('varchar', {
    length: 512,
    nullable: false,
    default: '',
  })
  description?: string;

  @ApiProperty()
  @Column({
    nullable: false,
    type: 'text',
  })
  text?: string;

  @ApiProperty()
  @Column({ type: 'boolean', nullable: false, default: true })
  isActive?: boolean;

  @ApiProperty()
  @ManyToOne(() => UserEntity, { eager: true, cascade: false, nullable: false })
  author?: UserEntity;

  @ApiProperty()
  @CreateDateColumn()
  createdOn?: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedOn?: Date;
}
