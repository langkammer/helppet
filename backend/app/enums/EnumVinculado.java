package enums;

/**
 * Created by Robson on 03/10/2015.
 */
public enum EnumVinculado {

	CADASTRO(0, "Cadastro Comun"),
	FACEBOOK(1, "Facebook"),
	GOOGLE(2, "Google Plus"),
	TWITER(3, "Twiter");

	private Integer id;
	private String name;

	private EnumVinculado(final Integer id, final String name) {
		this.id = id;
		this.name = name;
	}
	
}
