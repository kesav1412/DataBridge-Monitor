import { Injectable, UnauthorizedException, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CognitoIdentityProviderClient, AdminInitiateAuthCommand, AuthFlowType } from '@aws-sdk/client-cognito-identity-provider';
import * as jwt from 'jsonwebtoken';
import { LoginDto, AuthResponseDto, TokensDto } from './dto/login.dto';
// import { UsersService } from '../users/users.service'; // Disabled - requires database

@Injectable()
export class AuthService {
  private cognitoClient: CognitoIdentityProviderClient;
  private userPoolId: string;
  private clientId: string;
  private appName: string;

  constructor(
    private readonly configService: ConfigService,
    // private readonly usersService: UsersService, // Disabled - requires database
  ) {
    const region = this.configService.get<string>('AWS_REGION') || 'eu-west-2';
    this.cognitoClient = new CognitoIdentityProviderClient({ region });
    this.userPoolId = this.configService.get<string>('USER_POOL_ID') || 'eu-west-2_btfIMPOLw';
    this.clientId = this.configService.get<string>('COGNITO_CLIENT_ID') || '78m7hu93mlilguj53mo504tsrl';
    this.appName = this.configService.get<string>('APP_NAME') || 'SouthernWaterNovus';
  }

  async authenticateUser(loginDto: LoginDto): Promise<{ tokens: TokensDto; authResponse: AuthResponseDto; challengeName?: string }> {
    const { username, password } = loginDto;

    const params = {
      AuthFlow: AuthFlowType.ADMIN_NO_SRP_AUTH,
      UserPoolId: this.userPoolId,
      ClientId: this.clientId,
      AuthParameters: {
        USERNAME: username?.toLowerCase(),
        PASSWORD: password,
      },
    };

    try {
      const command = new AdminInitiateAuthCommand(params);
      const { $metadata, ...data } = await this.cognitoClient.send(command);

      return await this.handleAuthenticationResponse(data, username);
    } catch (err) {
      console.error('Failed to authenticate', err);
      throw new UnauthorizedException('Failed to authenticate user.');
    }
  }

  private async handleAuthenticationResponse(data: any, username: string) {
    // Check if password change is required
    if (data.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
      return {
        tokens: null,
        authResponse: null,
        challengeName: data.ChallengeName,
      };
    }

    // Extract tokens
    const tokens: TokensDto = {
      idToken: data.AuthenticationResult.IdToken,
      accessToken: data.AuthenticationResult.AccessToken,
      refreshToken: data.AuthenticationResult.RefreshToken,
    };

    // Decode token to get user information
    const decodedToken = jwt.decode(tokens.idToken, { complete: true }) as any;
    const cognitoUsername = decodedToken.payload['cognito:username'];
    const email = decodedToken.payload['email'];
    const phoneNumber = decodedToken.payload['phone_number'];

    // Check if user exists in database - DISABLED (no database connection)
    // const userExists = await this.usersService.findByCognitoUsername(cognitoUsername, email);
    // 
    // if (!userExists) {
    //   throw new ForbiddenException('User does not exist in the database.');
    // }

    const authResponse: AuthResponseDto = {
      username: cognitoUsername,
      role: 'user', // Default role since database is disabled
      email: email,
      phone_number: phoneNumber,
    };

    return {
      tokens,
      authResponse,
    };
  }

  getTokenCookieOptions(maxAge: number) {
    return {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      maxAge,
      sameSite: 'lax' as const,
    };
  }
}
