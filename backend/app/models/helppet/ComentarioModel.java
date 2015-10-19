package models.helppet;

import models.portalseg.UsuarioModel;
import play.db.jpa.GenericModel;

import javax.persistence.*;
import java.util.Date;

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

	@Column(name="COMENTARIO")
	public String comentario;

	@Column(name="DATA")
	public Date data;

}
