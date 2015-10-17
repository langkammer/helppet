package enums;

/**
 * Created by Robson on 03/10/2015.
 */
public enum EnumFrequencia {

	BLOQUEADO(0, "1 vez"),
	ATIVO(1, "2 vezes"),
	INATIVO(2, "3 vezes ou mais");

	private Integer id;
	private String name;

	private EnumFrequencia(final Integer id, final String name) {
		this.id = id;
		this.name = name;
	}

}
