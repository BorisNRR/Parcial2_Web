import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessLogicException, BusinessError } from 'src/shared/business-errors';
import { RedSocialEntity } from './red-social.entity';


@Injectable()
export class RedSocialService {

    constructor(
        @InjectRepository(RedSocialEntity)
        private readonly redSocialRepository: Repository<RedSocialEntity>
    ){}

    async createLibreria(libreria: RedSocialEntity): Promise<RedSocialEntity>{
        if(libreria.slogan.length !>= 20)
            throw new BusinessLogicException('Slogan must be 20 char or greater', BusinessError.PRECONDITION_FAILED)
        return await this.redSocialRepository.save(libreria)
    }

    

}
