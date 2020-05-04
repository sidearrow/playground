import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LineService } from './line.service';
import { LineController } from './line.controller';
import { Line } from 'src/entities/line.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Line])],
  providers: [LineService],
  controllers: [LineController],
})
export class LineModule { }
