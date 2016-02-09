package enums;

/**
 * Created by Robson on 03/10/2015.
 */
public enum EnumPedidoAjuda {

	AGUARDANDO(0, "Aguardando Aprovação"),
	APROVADO(1, "Em Aberto"),
	RESGATADO(2, "Resgatado"),
	REPROVADO(3, "Pedido Reprovado");


	private Integer id;
	private String name;

	private EnumPedidoAjuda(final Integer id, final String name) {
		this.id = id;
		this.name = name;
	}

}
