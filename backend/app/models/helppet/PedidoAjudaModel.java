package models.helppet;

import enums.EnumFrequencia;
import enums.EnumPedidoAjuda;
import enums.TipoAnimal;
import models.portalseg.UsuarioModel;
import play.db.jpa.Blob;
import play.db.jpa.Model;

import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.OneToOne;
import java.util.Date;

/**
 * Created by Robson on 03/10/2015.
 */
@Entity
public class PedidoAjudaModel extends Model{


	@OneToOne
	public UsuarioModel usuario;

	public Blob foto;

	@Enumerated
	public TipoAnimal tipoAnimal;

	public String localizacao;

	public String observacao;

	public String condicoes;

	@Enumerated
	public EnumFrequencia frequencia;

	@Enumerated
	public EnumPedidoAjuda status;

	public Date data;
}
