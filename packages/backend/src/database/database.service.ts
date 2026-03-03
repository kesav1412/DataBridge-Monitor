import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

/**
 * Database Service using Singleton Pattern
 * Provides centralized database connection management
 */
@Injectable()
export class DatabaseService {
  private static instance: DatabaseService;
  private readonly logger = new Logger(DatabaseService.name);

  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {
    if (DatabaseService.instance) {
      return DatabaseService.instance;
    }
    DatabaseService.instance = this;
    this.logger.log('DatabaseService singleton instance created');
  }

  /**
   * Get the singleton instance
   */
  static getInstance(): DatabaseService {
    return DatabaseService.instance;
  }

  /**
   * Get the DataSource connection
   */
  getConnection(): DataSource {
    return this.dataSource;
  }

  /**
   * Check if database is connected
   */
  isConnected(): boolean {
    return this.dataSource && this.dataSource.isInitialized;
  }

  /**
   * Get connection status
   */
  async getStatus() {
    try {
      const isConnected = this.isConnected();
      
      if (!isConnected) {
        return {
          connected: false,
          message: 'Database not connected',
        };
      }

      // Test query to verify connection
      await this.dataSource.query('SELECT 1');

      return {
        connected: true,
        database: this.dataSource.options.database,
        host: this.dataSource.options['host'],
        type: this.dataSource.options.type,
        message: 'Database connected successfully',
      };
    } catch (error) {
      this.logger.error('Database connection error:', error);
      return {
        connected: false,
        message: 'Database connection failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Execute raw query
   */
  async query(sql: string, parameters?: any[]): Promise<any> {
    return this.dataSource.query(sql, parameters);
  }

  /**
   * Start a transaction
   */
  async transaction<T>(
    runInTransaction: (entityManager) => Promise<T>,
  ): Promise<T> {
    return this.dataSource.transaction(runInTransaction);
  }
}
