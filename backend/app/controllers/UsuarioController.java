package controllers;

import models.portalseg.UsuarioModel;
import utils.ControllerUtil;
import utils.messages.MessageUtil;
import play.libs.Crypto;

/**
 * Created by Robson on 20/10/2015.
 */
public class UsuarioController extends ControllerUtil {


    public static void cadastrarUsuario(UsuarioModel usuario){

        try{

            if(usuario == null)
                renderJSONError(String.format(MessageUtil.BAD_REQUEST_PARAM,"usuario"));
            if(usuario != null)
                renderJSONSucesso(usuario.salvarUsuario(),String.format(MessageUtil.CADASTRO_REALIZADO_SUCESSO_P,"Usuario"),0 );
        }
        catch (Exception e){
            renderJSONError(MessageUtil.ERRO_PADRAO);

        }

    }

    public static void logar(String login, String senha){

        try{

            if(login==null)
                renderJSONError("Usuario em Branco");
            if(senha==null)
                renderJSONError("Senha em Branco");

            UsuarioModel usuario = UsuarioModel.find("senha = :senha and email = :email")
                                            .setParameter("email", login)
                                            .setParameter("senha", senha)
                                            .first();

            if(usuario!=null){
                session.put("usuario",usuario.id);
                usuario.senha = null;
                renderJSONSucesso(usuario,"Logado com Sucesso",0);
            }

            if(usuario==null)
                renderJSONError("Usuario ou senha digitados não existem");
        }
        catch (Exception e){

        }
    }

    public static void deslogar(){

        try{

                session.clear();
                renderJSONSucesso("Usuario Deslogado");
        }
        catch (Exception e){

        }
    }

    public static void listarUsuarios(){

    }

    public static void esqueceuSenha(String email){

    }
    public static void deletarUsuario(Long idUsuario){

    }

    public static void verificarRedeSocial(Long idRedeSocial){

        try{

            if(idRedeSocial == null)
                renderJSONError(String.format(MessageUtil.BAD_REQUEST_PARAM,"idRedeSocial"));
            if(idRedeSocial != null) {
                UsuarioModel user = UsuarioModel.find("idSocial = :idSocial").setParameter("idSocial", idRedeSocial).first();
                if(user!=null)
                    renderJSONSucesso(user,String.format(MessageUtil.CONSULTA_REALIZADA_SUCESSO,"Usuario"),0 );
                else
                    renderJSONSucesso("Nenhum Usuario Cadastrado");
            }

        }

        catch (Exception e){
            renderJSONError(MessageUtil.ERRO_PADRAO);

        }

    }

}
