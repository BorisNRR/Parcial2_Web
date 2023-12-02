import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/album/album.entity';
import { AlbumModule } from 'src/album/album.module';
import { FotoEntity } from 'src/foto/foto.entity';
import { FotoModule } from 'src/foto/foto.module';
import { RedSocialEntity } from 'src/red-social/red-social.entity';
import { RedSocialModule } from 'src/red-social/red-social.module';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';


export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [AlbumEntity, FotoEntity, RedSocialEntity, UsuarioEntity],
   synchronize: true,
   keepConnectionAlive: true
 }),
 TypeOrmModule.forFeature([AlbumModule, FotoModule, RedSocialModule, UsuarioModule]),
];