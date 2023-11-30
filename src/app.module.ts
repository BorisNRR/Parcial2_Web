import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './album/album.module';
import { RedSocialModule } from './red-social/red-social.module';
import { UsuarioModule } from './usuario/usuario.module';
import { FotoModule } from './foto/foto.module';

@Module({
  imports: [AlbumModule, RedSocialModule, UsuarioModule, FotoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
