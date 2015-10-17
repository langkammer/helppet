package enums;

/**
 * Created by Robson on 03/10/2015.
 */
public enum EnumPedidoAjuda {

	AGUARDANDO(0, "Aguardando Aprovação"),
	EM_ABERTO(1, "Em Aberto"),
	RESGATADO(2, "Resgatado");

	private Integer id;
	private String name;

	private EnumPedidoAjuda(final Integer id, final String name) {
		this.id = id;
		this.name = name;
	}

}
