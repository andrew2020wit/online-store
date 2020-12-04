import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ArticleEntity, ArticleTypes } from 'src/article/entity/article.entity';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { UserEntity } from 'src/auth/users/user.entity';
import { StatusMessageDto } from 'src/global-interface/dto/status-message.dto';
import { getConnection, Repository } from 'typeorm';

@Injectable()
export class InitTestDataService {
  users: CreateUserDto[] = [];
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  initData(): StatusMessageDto {
    this.clearTables();
    this.usersGenerator();
    return { message: 'done', source: 'initData', ok: true };
  }

  async usersGenerator(): Promise<void> {
    const password2 = await bcrypt.hash('12', 10);
    // managers + articles
    for (let n = 1; n <= 3; n++) {
      const author = await this.userRepository.save({
        login: 'manager' + n,
        fullName: 'Manager N' + n,
        password: password2,
        role: 'manager',
      });

      // create articles
      const connection = getConnection();
      for (let m = 1; m <= 40; m++) {
        const newArt = new ArticleEntity();
        newArt.author = author;
        newArt.title = 'News N' + m + ' from: ' + author.fullName;
        newArt.articleType = ArticleTypes.news;
        newArt.description =
          'description N' +
          m +
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, vel!';
        newArt.text =
          'text N' +
          m +
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis fuga ducimus voluptate incidunt ad vel alias? Expedita voluptatem iste rerum numquam voluptas repudiandae neque repellendus, veniam natus quia error quod eaque deserunt officia. Unde fuga repellendus doloribus quasi, doloremque iusto.';

        await connection.manager.save(newArt);
      }
      for (let m = 1; m <= 40; m++) {
        const newArt = new ArticleEntity();
        newArt.author = author;
        newArt.title = 'Review N' + m + ' from: ' + author.fullName;
        newArt.articleType = ArticleTypes.review;
        newArt.description =
          'description N' +
          m +
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, vel!';
        newArt.text =
          'text N' +
          m +
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis fuga ducimus voluptate incidunt ad vel alias? Expedita voluptatem iste rerum numquam voluptas repudiandae neque repellendus, veniam natus quia error quod eaque deserunt officia. Unde fuga repellendus doloribus quasi, doloremque iusto.';

        await connection.manager.save(newArt);
      }
    }
    // create admins
    await this.userRepository.save({
      login: 'admin',
      fullName: 'Admin N1',
      password: password2,
      role: 'admin',
    });
    await this.userRepository.save({
      login: 'admin2',
      fullName: 'Admin N2',
      password: password2,
      role: 'admin',
    });
    // create clients
    await this.userRepository.save({
      login: 'user',
      fullName: 'Hugo Boss',
      password: password2,
      role: 'client',
    });
    await this.userRepository.save({
      login: 'user2',
      fullName: 'Secret bayer',
      password: password2,
      role: 'client',
    });
  }

  async clearTables(): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from('article_entity')
      .execute();
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from('user_entity')
      .execute();
  }
}
