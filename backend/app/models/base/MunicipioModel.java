package models.base;

import play.db.jpa.GenericModel;
import utils.GoogleMapsUtil;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.List;

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

	@Column(name = "lat")
	public String lat;

	@Column(name = "lng")
	public String lng;

	public static void listarCidades(){

		List<MunicipioModel> lista = MunicipioModel.findAll();
		for(MunicipioModel municipio : lista){
			if(municipio.lat == null && municipio.lng == null)
				GoogleMapsUtil.consultaCidade(municipio);
		}
	}
}

