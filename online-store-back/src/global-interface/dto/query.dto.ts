import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class QueryDto {
  @ApiProperty()
  maxItemCount?: number;
  @ApiProperty()
  createdOnLessThan?: Date;
  @ApiProperty()
  pattern?: string;
  @ApiProperty()
  entityType?: string;
}
