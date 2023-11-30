import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessLogicException, BusinessError } from 'src/shared/business-errors';
import { UsuarioEntity } from './usuario.entity';

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>
    ){}

    
    async createUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity>{
        if(usuario.telefono.length !== 10)
            throw new BusinessLogicException('Invalid number, 10 lenght required', BusinessError.PRECONDITION_FAILED)
        
        return await this.usuarioRepository.save(usuario)
    }

    async findUsuarioById( id:string ): Promise<UsuarioEntity>{
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where:{id}, relations:['foto', 'red-social']})
        if(!usuario)
            BusinessLogicException('The user with the given id was not found', BusinessError.NOT_FOUND)
        return usuario
    }

    async findAllUsuarios(): Promise<UsuarioEntity[]>{
        return await this.usuarioRepository.find({ relations:['foto', 'red-social'] })
    }

}
