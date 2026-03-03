import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UsersModule } from './users/users.module'; // Disabled - requires database
import { HealthModule } from './health/health.module';
// import { DatabaseModule } from './database/database.module'; // Disabled
import { AuthModule } from './auth/auth.module';
// import databaseConfig from './config/database.config'; // Disabled

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // load: [databaseConfig], // Disabled
      envFilePath: ['.env.local', '.env'],
    }),
    // DatabaseModule, // Disabled
    // UsersModule, // Disabled - requires database
    HealthModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
