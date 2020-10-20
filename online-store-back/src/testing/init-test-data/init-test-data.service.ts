import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ArticleEntity } from 'src/articles/article.entity';
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
    this.usersGenerator(50);
    return { message: 'done', source: 'initData', ok: true };
  }
  async usersGenerator(quantity: number): Promise<void> {
    const password2 = await bcrypt.hash('12', 10);
    for (let n = 1; n <= quantity; n++) {
      const author = await this.userRepository.save({
        login: 'manager' + n,
        fullName: 'Manager N' + n,
        password: password2,
        role: 'manager',
      });

      const connection = getConnection();
      for (let m = 1; m <= 4; m++) {
        const newArt = new ArticleEntity();
        newArt.author = author;
        newArt.title = 'News N' + m + ' from: ' + author.fullName;
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
    // admin section
    await this.userRepository.save({
      login: 'admin1',
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
