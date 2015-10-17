package enums;

/**
 * Created by Robson on 03/10/2015.
 */
public enum  EnumUsuario  {

	BLOQUEADO(0, "Bloqueado"),
	ATIVO(1, "Ativo"),
	INATIVO(2, "Inativo"),
	CANCELADO(3, "Cancelado");

	private Integer id;
	private String name;

	private EnumUsuario(final Integer id, final String name) {
		this.id = id;
		this.name = name;
	}

}
