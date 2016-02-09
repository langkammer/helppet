package enums;

/**
 * Created by Robson on 03/10/2015.
 */
public enum EnumPublicacao {

	PENDENTE(0, "Pendente de avaliacao"),
	PUBLICADO(1, "Publicacao concluida"),
	REPROVADO(2, "Publicacao reprovada");


	private Integer id;
	private String name;

	private EnumPublicacao(final Integer id, final String name) {
		this.id = id;
		this.name = name;
	}

}
