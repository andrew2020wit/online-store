import { UseGuards } from '@nestjs/common';
import {
  Args,
  ArgsType,
  Field,
  Int,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayloadExtDto } from 'src/auth/dto/jwt-payload-ext.dto';
import { CurrentUser } from 'src/auth/guards/gql-auth.guard';
import { GqlManagerAuthGuard } from 'src/auth/guards/gql-manager-auth.guard';
import { LessThan, Like, Repository } from 'typeorm';
import { GoodsEntity } from './../goods.entity';

@ArgsType()
export class GetGoodsArgs {
  @Field(() => Int, { defaultValue: 3 })
  take: number;

  @Field({ defaultValue: '' })
  sample: string;

  @Field({ defaultValue: new Date() })
  createOnCursor: Date;
}

@ArgsType()
export class UpdateGoodsArgs {
  @Field(() => Int, { defaultValue: null })
  price: number;

  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  bigPhotoUrl: string;

  @Field()
  smallPhotoUrl: string;
}

@ArgsType()
export class CreateGoodsArgs {
  @Field(() => Int, { defaultValue: null })
  price: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  bigPhotoUrl: string;

  @Field()
  smallPhotoUrl: string;
}

@Resolver(() => [GoodsEntity])
export class GoodsResolver {
  constructor(
    @InjectRepository(GoodsEntity)
    private goodsRepository: Repository<GoodsEntity>,
  ) {}

  @Query(() => [GoodsEntity])
  async getGoods(@Args() args: GetGoodsArgs): Promise<GoodsEntity[]> {
    return await this.goodsRepository.find({
      take: args.take,
      order: { createdOn: 'DESC' },
      where: {
        createdOn: LessThan(args.createOnCursor),
        name: Like(`%${args.sample}%`),
        isActive: true,
      },
    });
  }

  @Query(() => GoodsEntity)
  async getOneGoods(
    @Args('id', { type: () => String }) id: string,
  ): Promise<GoodsEntity> {
    return await this.goodsRepository.findOne(id);
  }

  @Mutation(returns => String)
  @UseGuards(GqlManagerAuthGuard)
  async createGoods(
    @Args() args: CreateGoodsArgs,
    @CurrentUser() user: JwtPayloadExtDto,
  ): Promise<string> {
    await this.goodsRepository.save({
      name: args.name,
      description: args.description,
      bigPhotoUrl: args.bigPhotoUrl,
      smallPhotoUrl: args.smallPhotoUrl,
      price: args.price,
    });
    return 'Ok';
  }

  @Mutation(returns => String)
  @UseGuards(GqlManagerAuthGuard)
  async editGoods(
    @Args() args: UpdateGoodsArgs,
    @CurrentUser() user: JwtPayloadExtDto,
  ): Promise<string> {
    await this.goodsRepository.update(args.id, {
      name: args.name,
      description: args.description,
      bigPhotoUrl: args.bigPhotoUrl,
      smallPhotoUrl: args.smallPhotoUrl,
      price: args.price,
    });
    return 'Ok';
  }

  @Mutation(returns => String)
  @UseGuards(GqlManagerAuthGuard)
  async disActiveGoods(
    @Args({ name: 'goodsId', type: () => String }) goodsId: string,
  ): Promise<string> {
    this.goodsRepository.update(goodsId, { isActive: false });
    return `disActiveGoods ${goodsId}`;
  }
}
