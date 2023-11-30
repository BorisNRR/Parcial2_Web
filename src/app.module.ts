import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './album/album.module';
import { RedSocialModule } from './red-social/red-social.module';
import { UsuarioModule } from './usuario/usuario.module';
import { FotoModule } from './foto/foto.module';
import { AlbumEntity } from './album/album.entity';
import { RedSocialEntity } from './red-social/red-social.entity';
import { UsuarioEntity } from './usuario/usuario.entity';
import { FotoEntity } from './foto/foto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AlbumModule, RedSocialModule, UsuarioModule, FotoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'museum',
      entities: [AlbumEntity, RedSocialEntity,UsuarioEntity, FotoEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
