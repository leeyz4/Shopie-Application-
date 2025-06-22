import { IsNotEmpty, IsUUID, IsInt, Min } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  quantity: number;
}
