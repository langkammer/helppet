package models.helppet;

import models.bean.ComentarioBean;
import models.portalseg.UsuarioModel;
import play.db.jpa.GenericModel;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by Robson on 03/10/2015.
 */
@Entity
@Table(name = "COMENTARIO")
public class ComentarioModel extends GenericModel implements Cloneable{


	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "comentario_id_seq")
	@SequenceGenerator(name = "comentario_id_seq",
			sequenceName = "comentario_id_seq",
			allocationSize = 1)
	@Column(columnDefinition = "serial")
	public Long id;

	@OneToOne
	@JoinColumn(name = "ID_USUARIO")
	public UsuarioModel usuario;

	@OneToOne
	@JoinColumn(name = "ID_PEDIDO")
	public PedidoAjudaModel pedido;


	@Column(name="COMENTARIO")
	public String comentario;

	@Column(name="DATA")
	public Date data;

	public static ComentarioModel comentar(String idUsuario,String comentario,Long idPedido){

		ComentarioModel comment = new ComentarioModel();

		comment.pedido = PedidoAjudaModel.findById(idPedido);

		comment.usuario = UsuarioModel.findById(Long.parseLong(idUsuario));

		comment.comentario = comentario;

		comment.data = new Date();

		return comment.save();
	}

	public static List<ComentarioBean> listarComentarios(Long idPedido){

		List<ComentarioModel> comentarios = ComentarioModel.find("pedido.id = :idPedido")
														   .setParameter("idPedido", idPedido)
														   .fetch();


		List<ComentarioBean> listaComentarios = new ArrayList<ComentarioBean>();

		ComentarioBean comentarioBean = new ComentarioBean();

		SimpleDateFormat dt = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss");

		for(ComentarioModel coment : comentarios){

			comentarioBean = new ComentarioBean();

			comentarioBean.usuario = coment.usuario;

			comentarioBean.comentario = coment.comentario;

			comentarioBean.data = dt.format(coment.data);

			listaComentarios.add(comentarioBean);
		}

		return listaComentarios;
	}
}
