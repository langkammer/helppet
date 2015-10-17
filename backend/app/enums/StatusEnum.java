package enums;

import com.google.gson.annotations.SerializedName;

/**
 * Enum de status para o envelope.
 *
 */

public enum StatusEnum {

	@SerializedName("Sucesso")
	SUCESSO("s"),
	@SerializedName("Erro")
	ERRO("e"),
	@SerializedName("Warning")
	WARNING("w");

	private final String valor;

	StatusEnum(String valor) {

		this.valor = valor;

	}

	public String getValor() {

		return valor;

	}
}
