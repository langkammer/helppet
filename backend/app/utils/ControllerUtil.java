package utils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import enums.StatusEnum;
import play.mvc.Controller;

/**
 * Classe util pai para controllers.
 *
 *
 */
public class ControllerUtil extends Controller {

	private static Gson gson;

	static {

		GsonBuilder builder = new GsonBuilder();
		gson = builder.create();

	}

	/**
	 * Recupera o usuário logado na sessão.
	 *
	 * @return usuário logado.
	 */
//	protected static Authorization getUsuarioLogado() {
//
//		Authorization usuarioLogado = Cache.get(session.getId(), Authorization.class);
//
//		if(usuarioLogado == null) {
//
//			Logger.error(MessageUtil.USUARIO_CACHE_ERRO);
//
//			renderJSONError(MessageUtil.SESSAO_EXPIROU);
//
//		}
//
//		return usuarioLogado;
//
//	}

	/**
	 * Método overloaded para renderizar um objeto como json usando o envelope definido.
	 *
	 * @param data - objeto a ser renderizado.
	 * @param message - mensagem a ser anexada no envelope.
	 * @param length - tamanho total da consulta quando for usar paginação.
	 */
	protected static void renderJSONSucesso(Object data, String message, Long length) {

		renderJSON(gson.toJson(new EnvelopUtil(StatusEnum.SUCESSO, message, data, length)));

	}

	/**
	 * Método overloaded para renderizar um erro como json usando o envelope definido.
	 *
	 * @param message - mensagem a ser anexada no envelope.
	 */
	protected static void renderJSONSucesso(String message) {

		renderJSON(gson.toJson(new EnvelopUtil(StatusEnum.SUCESSO, message)));

	}

	/**
	 * Método overloaded para renderizar um erro como json usando o envelope definido.
	 *
	 * @param message - mensagem a ser anexada no envelope.
	 */
	protected static void renderJSONError(String message) {

		renderJSON(gson.toJson(new EnvelopUtil(StatusEnum.ERRO, message)));

	}

	/**
	 * Método overloaded para renderizar um warning como json usando o envelope definido.
	 *
	 * @param message - mensagem a ser anexada no envelope.
	 */
	protected static void renderJSONWarning(String message) {

		renderJSON(gson.toJson(new EnvelopUtil(StatusEnum.WARNING, message)));

	}

	/**
	 * Render application/json response with a message error containing exception message
	 * @param throwable
	 */
//	@Catch(value = Exception.class, priority = 2)
//	protected static void returnIfExceptionRaised(Throwable throwable) {
//
//		JPA.setRollbackOnly();
//
//		if(throwable instanceof Exception) {
//
//			Logger.error(throwable.getMessage());
//
//			renderJSONError(MessageUtil.INCONFORMIDADE_GENERICA);
//
//		}
//
//	}

}
