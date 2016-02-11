package models.portalseg;

/**
 * Created by Robson on 03/10/2015.
 */

import enums.EnumUsuario;
import enums.EnumVinculado;
import enums.TipoUsuario;
import models.bean.PedidoPonto;
import notifiers.Mails;
import play.Play;
import play.db.jpa.GenericModel;
import play.libs.Mail;

import javax.persistence.*;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "USUARIO")
public class UsuarioModel extends GenericModel {


	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "usuario_id_seq")
	@SequenceGenerator(name = "usuario_id_seq",
			sequenceName = "usuario_id_seq",
			allocationSize = 1)
	@Column(columnDefinition = "serial")
	public Long id;


	@Column(name="ID_SOCIAL")
	public Long idSocial;

	@Column(name="NOME")
	public String nome;

	@Column(name="EMAIL")
	public String email;

	@Column(name="SENHA")
	public String senha;

	@Column(name="PATH_FOTO")
	public String perfilFoto;

	@Column(name="STATUS")
	@Enumerated
	public EnumUsuario status;

	@Column(name="VINCULO")
	@Enumerated
	public EnumVinculado vinculo;

	//public List<PedidoAjudaModel> listaAjuda;
	@Column(name="LOCALIZACAO_ATUAL")
	public String localizacaoAtual;

	@Column(name="ULTIMA_LOCALIZACAO")
	public String ultimaLocalizacao;

	@Column(name="TIPO")
	@Enumerated
	public TipoUsuario tipo;

	@Column(name="DATA")
	public Date data;

	public UsuarioModel salvarUsuario(){
		this.data = new Date();
		this.perfilFoto = "padraofoto.jpeg";
		this.status = EnumUsuario.ATIVO;
		if(this.email!=null)
			Mails.bemVindo(this);
		return this.save();
	}

	public String getFoto(Long idUsuario){

		UsuarioModel usuario = UsuarioModel.findById(idUsuario);

		return perfilFoto;


	}


	public static List<UsuarioModel> listarUsuariosPaginado(Integer pagina){
		if( pagina == null || pagina<1)
		{
			pagina = 1;
		}

		return UsuarioModel.find("")
				.fetch(pagina, Integer.parseInt(Play.configuration.getProperty("configuration.pagination.size")));
	}


}
