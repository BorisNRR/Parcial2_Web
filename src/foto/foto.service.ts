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
        let fIso = Number(foto.iso)
        let fObt = Number(foto.velObturacion)
        let fApt = Number(foto.apertura)

        if(fIso < 100 && fIso > 6400)
            throw new BusinessLogicException('Invalid value for ISO', BusinessError.PRECONDITION_FAILED)

        else if(fObt < 2 && fObt > 250)
            throw new BusinessLogicException('Invalid value for Vel. Obturacion', BusinessError.PRECONDITION_FAILED)

        else if(fApt < 1 && fApt > 32)
            throw new BusinessLogicException('Invalid value for Vel. Obturacion', BusinessError.PRECONDITION_FAILED)
        
        else if( !( (fIso <= 3150) || (fObt <= 124) || (fApt <= 31/2) )) 
            throw new BusinessLogicException('At least one atribute must be under the average value', BusinessError.PRECONDITION_FAILED)

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
