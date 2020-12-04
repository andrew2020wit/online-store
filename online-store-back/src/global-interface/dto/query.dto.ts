import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class QueryDto {
  @ApiProperty({ default: 1 })
  maxItemCount?: number;
  @ApiProperty({ description: 'default: now' })
  createdOnLessThan?: Date;
  @ApiProperty()
  pattern?: string;
  @ApiProperty({ description: 'for article: "news", "review" ' })
  entityType?: string;
}
