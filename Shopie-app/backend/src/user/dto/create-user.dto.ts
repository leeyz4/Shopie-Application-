import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsEmail,
  Matches,
  IsOptional,
  IsEnum,
} from 'class-validator';
// import { Transform } from 'class-transformer';

export type Role = 'ADMIN' | 'CUSTOMER';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @MinLength(10, { message: 'Name must be atleast 10 characters long' })
  name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  // @IsOptional()
  // @IsString({ message: 'Phone must be a string' })
  // @IsPhoneNumber(undefined, { message: 'Please provide a valid phone number' })
  // @Transform(({ value }) => value?.trim())
  // phone?: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be atleast 6 characters long' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/, {
    message: 'Password must contain both letters and numbers',
  })
  password: string;

  @IsEnum(['ADMIN', 'CUSTOMER']) //validate that the provided value matches one in ts
  @IsOptional()
  role?: Role;
}
