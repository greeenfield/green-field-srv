import { OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { Connection, createConnection } from 'typeorm'

export class AppService implements OnModuleInit, OnModuleDestroy {
  databaseConnection: Connection

  async onModuleInit(): Promise<void> {
    if (this.databaseConnection?.isConnected === false) {
      this.databaseConnection = await createConnection()
    }
  }

  async onModuleDestroy(): Promise<void> {
    if (this.databaseConnection) this.databaseConnection.close()
  }
}
