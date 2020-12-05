import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity, ArticleTypes } from 'src/article/entity/article.entity';
import { getPassWordHash } from 'src/auth/utils/getPassWordHash';
import { StatusMessageDto } from 'src/global-interface/status-message.dto';
import { UserEntity, UserRole } from 'src/user/user.entity';
import { getConnection, Repository } from 'typeorm';
import { UserService } from './../../user/user.service';

@Injectable()
export class InitTestDataService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private userService: UserService,
  ) {}
  initData(): StatusMessageDto {
    this.clearTables();
    this.usersGenerator();
    return { message: 'done', source: 'initData', ok: true };
  }

  async usersGenerator(): Promise<void> {
    // managers + articles
    for (let n = 1; n <= 3; n++) {
      const { resultId } = await this.userService.createOrEdit({
        login: 'manager' + n,
        fullName: 'Manager N' + n,
        password: '12',
      });

      await this.userService.adminChangeUser({
        userId: resultId,
        role: UserRole.manager,
      });

      const author = await this.userService.getById(resultId);

      // create articles
      const connection = getConnection();
      for (let m = 1; m <= 200; m++) {
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
      for (let m = 1; m <= 200; m++) {
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
    const password2 = await getPassWordHash('12');
    // create admins

    await this.userRepository.save({
      login: 'admin',
      fullName: 'Admin N1',
      password: password2,
      role: UserRole.admin,
    });

    await this.userRepository.save({
      login: 'admin2',
      fullName: 'Admin N2',
      password: password2,
      role: UserRole.admin,
    });
    // create clients
    await this.userRepository.save({
      login: 'user',
      fullName: 'Hugo Boss',
      password: password2,
      role: UserRole.user,
    });
    await this.userRepository.save({
      login: 'user2',
      fullName: 'Secret bayer',
      password: password2,
      role: UserRole.user,
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
