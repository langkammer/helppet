package models.base;

import play.db.jpa.GenericModel;

import javax.persistence.*;

/**
 * Created by Robson on 03/10/2015.
 */
@Entity
@Table(name = "MUNICIPIO")
public class MunicipioModel extends GenericModel{

	@Id
	@Column(name = "CODIGO_MUNICIPIO")
	public Long codigoMunicipioIbge;

	@Column(name="UF")
	public String  uf;

	@Column(name="NOME")
	public String nome;

}

