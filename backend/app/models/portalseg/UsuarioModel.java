package models.portalseg;

/**
 * Created by Robson on 03/10/2015.
 */

import enums.EnumUsuario;
import enums.EnumVinculado;
import enums.TipoUsuario;
import models.helppet.PedidoAjudaModel;
import play.db.jpa.Model;
import utils.messages.MessageUtil;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;
import java.util.List;

@Entity
public class UsuarioModel extends Model {


	public String nome;

	public String email;

	public String senha;

	public String perfilFoto;

	public EnumUsuario status;

	public EnumVinculado vinculo;

	//public List<PedidoAjudaModel> listaAjuda;

	public String localizacaoAtual;

	public String ultimaLocalizacao;

	public TipoUsuario tipo;

	public Date data;
}
