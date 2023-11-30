import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from './album.entity';
import { Repository } from 'typeorm';
import { BusinessLogicException, BusinessError } from 'src/shared/business-errors';
import { FotoEntity } from 'src/foto/foto.entity';

@Injectable()
export class AlbumService {
    
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>
    ){}
    
    async createAlbum(album: AlbumEntity): Promise<AlbumEntity>{
        if(album.titulo === "")
            throw new BusinessLogicException('Title empty', BusinessError.PRECONDITION_FAILED)
        
        return await this.albumRepository.save(album)
    }

    async findAlbumById( id:string ): Promise<AlbumEntity>{
        const album: AlbumEntity = await this.albumRepository.findOne({where:{id}, relations:['foto']})
        if(!album)
            BusinessLogicException('The album with the given id was not found', BusinessError.NOT_FOUND)
        return album
    }

    async deleteAlbum(id: string){
        const album: AlbumEntity = await this.albumRepository.findOne({where:{id}})
        if(!album)
            throw new BusinessLogicException('Album with the given id was not found', BusinessError.NOT_FOUND)
        await this.albumRepository.remove(album)
    }

    //TODO - funcion para validar correspondencia en rango de fechas
    // async addPhotoToAlbum(foto:FotoEntity): Promise<AlbumEntity>{

    // }
}
