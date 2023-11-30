import { AlbumEntity } from "src/album/album.entity";
import { UsuarioEntity } from "src/usuario/usuario.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";



@Entity()
export class FotoEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    iso:Number

    @Column()
    velObturacion:Number

    @Column()
    apertura:Number

    @Column()
    fecha:string
    
    @ManyToOne( () => UsuarioEntity, usurio => usurio.fotos)
    usuario: UsuarioEntity

    @ManyToOne( () => AlbumEntity, album => album.fotos)
    album: AlbumEntity

}
