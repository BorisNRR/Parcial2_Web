import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessLogicException, BusinessError } from 'src/shared/business-errors';
import { FotoEntity } from './foto.entity';

@Injectable()
export class FotoService {

    constructor(
        @InjectRepository(FotoEntity)
        private readonly fotoRepository: Repository<FotoEntity>
    ){}

    async createFoto(foto: FotoEntity): Promise<FotoEntity>{
        if(Number(foto.iso) < 100 && Number(foto.iso) > 100)
            throw new BusinessLogicException('Invalid value for ISO', BusinessError.PRECONDITION_FAILED)
        else if(Number(foto.velObturacion) < 2 && Number(foto.velObturacion) > 250)
            throw new BusinessLogicException('Invalid value for Vel. Obturacion', BusinessError.PRECONDITION_FAILED)
        else if(Number(foto.apertura) < 1 && Number(foto.apertura) > 32)
            throw new BusinessLogicException('Invalid value for Vel. Obturacion', BusinessError.PRECONDITION_FAILED)
        //TODO - Implementar restriccion de las costas
        
        return await this.fotoRepository.save(foto)
    }

    async findFotoByID( id:string ): Promise<FotoEntity>{
        const foto: FotoEntity = await this.fotoRepository.findOne({where:{id}, relations:['usuario', 'album']})
        if(!foto)
            BusinessLogicException('The foto with the given id was not found', BusinessError.NOT_FOUND)
        return foto
    }

    async findAllFotos(): Promise<FotoEntity[]>{
        return await this.fotoRepository.find({ relations:['usuario', 'album']})
    }

    async deleteFoto(id: string){
        const album: FotoEntity = await this.fotoRepository.findOne({where:{id}})
        if(!album)
            throw new BusinessLogicException('Foto with the given id was not found', BusinessError.NOT_FOUND)
        await this.fotoRepository.remove(album)
    }


}
