package utils;

import play.Play;

/**
 * Classe util para recuperar constantes definidas no arquivo de configuração.
 *
 * @author Gabriel Borges
 */
public class ConfigUtil {

	public static final Integer TAMANHO_PAGINA = Integer.valueOf(Play.configuration.getProperty("configuration.pagination.size"));

	public static final Long TAMANHO_ARQUIVO_5MB = Long.valueOf(Play.configuration.getProperty("configuration.upload5Mb"));

	public static final String CACHE_DURATION = Play.configuration.getProperty("configuration.cache_duration");

	public static final String DATE_FORMAT = Play.configuration.getProperty("date.format");

	public static final String INDEX_APP_DEV = Play.configuration.getProperty("configuration.url_inicio");

	public static final String LOGOUT_URL = Play.configuration.getProperty("configuration.url_logout");


	public static final String EMAIL_FROM = "naoresponda@sistema.com.br";

	public static final String EMAIL_ASSUNTO= "Para ativação ou redefinição de senha click na url e cole o codigo de ativação enviado no email  : %s";

}
