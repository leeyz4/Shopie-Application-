import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsEmail,
  Matches,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// import { Transform } from 'class-transformer';

export type Role = 'ADMIN' | 'CUSTOMER';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @MinLength(5, { message: 'Name must be atleast 10 characters long' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  // @IsOptional()
  // @IsString({ message: 'Phone must be a string' })
  // @IsPhoneNumber(undefined, { message: 'Please provide a valid phone number' })
  // @Transform(({ value }) => value?.trim())
  // phone?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be atleast 6 characters long' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/, {
    message: 'Password must contain both letters and numbers',
  })
  password: string;

  @ApiProperty()
  @IsEnum(['ADMIN', 'CUSTOMER']) //validate that the provided value matches one in ts
  @IsOptional()
  role?: Role;
}
