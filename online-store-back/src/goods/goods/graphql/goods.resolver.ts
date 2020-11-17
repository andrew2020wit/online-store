import { Args, ArgsType, Field, Int, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
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
}
