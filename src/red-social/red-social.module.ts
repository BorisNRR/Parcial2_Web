import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { RedSocialEntity } from './red-social.entity';


@Module({
  providers: [UsuarioService],
  imports:[TypeOrmModule.forFeature([RedSocialEntity])]
})
export class RedSocialModule {}
