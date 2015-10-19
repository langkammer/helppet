package models.helppet;

import play.db.jpa.GenericModel;

import javax.persistence.*;

/**
 * Created by Robson on 03/10/2015.
 */
@Entity
@Table(name = "FOTOS_PEDIDO_AJUDA")
public class FotosModel extends GenericModel implements Cloneable{

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "foto_id_seq")
    @SequenceGenerator(name = "foto_id_seq",
            sequenceName = "foto_id_seq",
            allocationSize = 1)
    @Column(columnDefinition = "serial")
    public Long id;

    @Column(name = "NOME_FOTO")
    public String nomefoto;

    @Column(name = "FILE_PATH")
    public String filePath;

    @Column(name = "FILE")
    public Boolean capa;
}
