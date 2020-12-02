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
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('varchar', { length: 128, nullable: false })
  title?: string;

  @Column('varchar', { length: 128, nullable: true, default: 'article' })
  articleType?: articleTypes;

  @Column('varchar', {
    length: 512,
    nullable: false,
    default: '',
  })
  description?: string;

  @Column({
    nullable: false,
    type: 'text',
  })
  text?: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  isActive?: boolean;

  @ManyToOne(() => UserEntity, { eager: true, cascade: false, nullable: false })
  author?: UserEntity;

  @CreateDateColumn()
  createdOn?: Date;

  @UpdateDateColumn()
  updatedOn?: Date;
}
