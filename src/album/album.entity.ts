import { FotoEntity } from 'src/foto/foto.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AlbumEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string
    
    @Column()
    fechaInicio:string

    @Column()
    fechaFin:string

    @OneToMany( () => FotoEntity, foto => foto.album)
    fotos: FotoEntity[]
}

