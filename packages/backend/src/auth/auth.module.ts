import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
// import { UsersModule } from '../users/users.module'; // Disabled - requires database

@Module({
  imports: [ConfigModule], // UsersModule removed - requires database
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
