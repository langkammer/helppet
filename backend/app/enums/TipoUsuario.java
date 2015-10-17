package enums;

/**
 * Created by Robson on 03/10/2015.
 */
public enum TipoUsuario {

	COMUN(0, "Comun"),
	GRUPO_APAIO(1, "Grupo de Apoio");

	private Integer id;
	private String name;

	private TipoUsuario(final Integer id, final String name) {
		this.id = id;
		this.name = name;
	}

}
