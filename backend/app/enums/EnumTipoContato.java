package enums;

/**
 * Created by Robson on 03/10/2015.
 */
public enum EnumTipoContato {

	DIVERSOS(0, "Diversos"),
	BUGS(1, "Bugs"),
	AJUDA(2, "Ajuda");

	private Integer id;
	private String name;

	private EnumTipoContato(final Integer id, final String name) {
		this.id = id;
		this.name = name;
	}

}
