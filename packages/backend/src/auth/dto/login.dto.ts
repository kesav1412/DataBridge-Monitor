import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class AuthResponseDto {
  username: string;
  role: string;
  email: string;
  phone_number?: string;
}

export class TokensDto {
  idToken: string;
  accessToken: string;
  refreshToken: string;
}
