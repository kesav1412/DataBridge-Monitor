import { Injectable } from '@nestjs/common';
// import { DatabaseService } from '../database/database.service'; // Disabled

@Injectable()
export class HealthService {
  constructor(
    // private readonly databaseService: DatabaseService, // Disabled
  ) {}

  async check() {
    // Database status check disabled
    // const dbStatus = await this.databaseService.getStatus();
    
    return {
      status: 'ok', // Always OK since database check is disabled
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      database: {
        connected: false,
        message: 'Database connection disabled'
      },
    };
  }
}
