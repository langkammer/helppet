package notifiers;

import enums.EnumPublicacao;
import models.portalseg.FormularioContatoModel;
import models.portalseg.UsuarioModel;
import play.mvc.Mailer;

import java.io.UnsupportedEncodingException;


/**
 * Created by Robson on 08/02/2016.
 */
public class Mails extends Mailer  {

	public static void notificaPublicacaoAprovada(EnumPublicacao statusPublicacao,UsuarioModel user) throws UnsupportedEncodingException {
		setFrom("Help - Pet <naoresponda@helppet.com.br>");
		setSubject("O Pedido esta : " + statusPublicacao.name());
		addRecipient(user.email);
		send(user,statusPublicacao);
	}

	public static void notificaPublicacaoPendente(EnumPublicacao statusPublicacao,UsuarioModel user) throws UnsupportedEncodingException {
		setFrom("Help - Pet <naoresponda@helppet.com.br>");
		setSubject("O Pedido esta : " + statusPublicacao.name());
		addRecipient(user.email);
		send(user,statusPublicacao);
	}
	public static void notificaPublicacaoReprovada(EnumPublicacao statusPublicacao,UsuarioModel user) throws UnsupportedEncodingException {
		setFrom("Help - Pet <naoresponda@helppet.com.br>");
		setSubject("O Pedido esta : " + statusPublicacao.name());
		addRecipient(user.email);
		send(user,statusPublicacao);
	}
	public static void bemVindo(UsuarioModel user){
		setFrom("Help - Pet <naoresponda@helppet.com.br>");
		setSubject("Seja Bem vindo ao Help - Pet");
		addRecipient(user.email);
		send(user);
	}

	public static void reenviaSenha(UsuarioModel user,String novaSenha){
		setFrom("Help - Pet <naoresponda@helppet.com.br>");
		setSubject("Sua Senha para acesso ao HelpPet");
		addRecipient(user.email);
		send(user,novaSenha);
	}

	public static void contatoUser(FormularioContatoModel form){
		setFrom("Help - Pet <naoresponda@helppet.com.br>");
		setSubject("Formulario de Contato Enviado");
		addRecipient(form.email);
		send(form);
	}

	public static void contatoToAdminsitracao(FormularioContatoModel form){
		setFrom("Help - Pet <naoresponda@helppet.com.br>");
		setSubject("Formulario Contato Recebido pelo Portal");
		addRecipient("robsonlangkammer@hotmail.com");
		send(form);
	}

	public static void animaisAdicionadosRecentemente(){

	}
}
