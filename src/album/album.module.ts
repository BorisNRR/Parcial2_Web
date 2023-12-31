import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { AlbumEntity } from './album.entity';

@Module({
  providers: [AlbumService],
  imports:[TypeOrmModule.forFeature([AlbumEntity])]
})
export class AlbumModule {}
