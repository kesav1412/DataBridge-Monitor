import { Controller, Post, Body, Res, HttpStatus, HttpException } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: FastifyReply) {
    try {
      const result = await this.authService.authenticateUser(loginDto);

      // Handle NEW_PASSWORD_REQUIRED challenge
      if (result.challengeName === 'NEW_PASSWORD_REQUIRED') {
        return res.code(HttpStatus.OK).send({
          success: true,
          message: 'User authenticated successfully',
          data: { challengeName: result.challengeName },
        });
      }

      // Set authentication cookies
      const { tokens, authResponse } = result;
      
      (res as any).setCookie('idToken', tokens.idToken, this.authService.getTokenCookieOptions(2 * 60 * 60 * 1000)); // 2 hours
      (res as any).setCookie('accessToken', tokens.accessToken, this.authService.getTokenCookieOptions(2 * 60 * 60 * 1000)); // 2 hours
      (res as any).setCookie('refreshToken', tokens.refreshToken, this.authService.getTokenCookieOptions(30 * 24 * 60 * 60 * 1000)); // 30 days
      (res as any).setCookie('username', authResponse.username, this.authService.getTokenCookieOptions(30 * 24 * 60 * 60 * 1000)); // 30 days

      return res.code(HttpStatus.OK).send({
        success: true,
        message: 'User authenticated successfully',
        data: authResponse,
      });
    } catch (error) {
      const statusCode = (error as any)?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const message = (error as any)?.message || 'An error occurred during authentication';
      
      return res.code(statusCode).send({
        success: false,
        message,
        error: (error as any)?.name || 'UnknownError',
      });
    }
  }

  @Post('logout')
  async logout(@Res() res: FastifyReply) {
    // Clear all authentication cookies
    (res as any).clearCookie('idToken');
    (res as any).clearCookie('accessToken');
    (res as any).clearCookie('refreshToken');
    (res as any).clearCookie('username');

    return res.code(HttpStatus.OK).send({
      success: true,
      message: 'User logged out successfully',
    });
  }
}
