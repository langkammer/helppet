package enums;

/**
 * Created by Robson on 03/10/2015.
 */
public enum TipoAnimal {

	CAES(0, "Cães"),
	GATOS(1, "Gatos"),
	CAVALOS(2, "Cavalos"),
	ASNOS(2, "Asnos, Burros, Jumento, Jegue");

	private Integer id;
	private String name;

	private TipoAnimal(final Integer id, final String name) {
		this.id = id;
		this.name = name;
	}

}
