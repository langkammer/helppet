package models.portalseg;

/**
 * Created by Robson on 03/10/2015.
 */

import enums.EnumTipoContato;
import enums.EnumUsuario;
import enums.EnumVinculado;
import enums.TipoUsuario;
import notifiers.Mails;
import play.Play;
import play.db.jpa.GenericModel;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "FORMULARIO_CONTATO")
public class FormularioContatoModel extends GenericModel {


	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "contato_id_seq")
	@SequenceGenerator(name = "contato_id_seq",
			sequenceName = "contato_id_seq",
			allocationSize = 1)
	@Column(columnDefinition = "serial")
	public Long id;

	@Column(name="NOME")
	public String nome;

	@Column(name="EMAIL")
	public String email;

	@Column(name="TIP_CONTATO")
	@Enumerated
	public EnumTipoContato tipoContato;

	@Column(name="MSG")
	public String msg;

	@Column(name="DATA")
	public Date data;


	public void enviarContato(){

		this.data = new Date();
		Mails.contatoUser(this);
		Mails.contatoToAdminsitracao(this);
		this.save();



	}

	public static List<FormularioContatoModel> listarMsgPaginado(Integer pagina){
		if( pagina == null || pagina<1)
		{
			pagina = 1;
		}

		return FormularioContatoModel.find("")
				.fetch(pagina, Integer.parseInt(Play.configuration.getProperty("configuration.pagination.size")));
	}

}
