import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './company/company.module';
import { DatabaseModule } from './database/database.module';
import { LineModule } from './line/line.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CompanyModule,
    DatabaseModule,
    LineModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
