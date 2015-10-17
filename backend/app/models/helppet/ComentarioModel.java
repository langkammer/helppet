package models.helppet;

import models.portalseg.UsuarioModel;
import play.db.jpa.Model;
import utils.messages.MessageUtil;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

/**
 * Created by Robson on 03/10/2015.
 */
@Entity
public class ComentarioModel extends Model {

	public UsuarioModel usuario;

	public String comentario;

	public Date data;

}
