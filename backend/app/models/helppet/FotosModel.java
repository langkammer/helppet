package models.helppet;

import play.db.jpa.Model;
import utils.messages.MessageUtil;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Created by Robson on 03/10/2015.
 */
@Entity
public class FotosModel extends Model{

	public String nomefoto;

	public String filePath;

	public Boolean capa;
}
