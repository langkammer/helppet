package utils;

import enums.StatusEnum;

/**
 * Class modelo para envelope de saída de dados do backend.
 *
 * @author Gabriel Borges
 */
public class EnvelopUtil {

	private String status;

	private String message;

	private Object data;

	private Long length;

	public EnvelopUtil(StatusEnum status, String message) {

		this.status = status.getValor();
		this.message = message;

	}

	public EnvelopUtil(StatusEnum status, String message, Object data, Long length) {

		this.status = status.getValor();
		this.message = message;
		this.data = data;
		this.length = length;

	}

}
