package enums;

/**
 * Created by Robson on 03/10/2015.
 */
public enum TipoAnimal {

	CAES(0, "Cães"),
	GATOS(1, "Gatos"),
	OUTROS(2, "Outros");

	private Integer id;
	private String name;

	private TipoAnimal(final Integer id, final String name) {
		this.id = id;
		this.name = name;
	}

}
