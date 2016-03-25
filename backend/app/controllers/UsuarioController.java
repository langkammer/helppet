package controllers;

import models.portalseg.UsuarioModel;
import notifiers.Mails;
import utils.ControllerUtil;
import utils.SenhaGenerate;
import utils.messages.MessageUtil;

import java.util.List;


/**
 * Created by Robson on 20/10/2015.
 */
public class UsuarioController extends ControllerUtil {


    public static void cadastrarUsuario(UsuarioModel usuario){

        try{

            if(usuario == null)
                renderJSONError(String.format(MessageUtil.BAD_REQUEST_PARAM,"usuario"));
            if(usuario.email!=null){
                UsuarioModel verificaUserCadastrado = UsuarioModel.find("email = :email")
                        .setParameter("email",usuario.email)
                        .first();
                if(verificaUserCadastrado!=null)
                    renderJSONError("Email Já Cadastrado");
            }
            UsuarioModel user = usuario.salvarUsuario();

            session.put("usuario",user.id);

            if(usuario != null)
                renderJSONSucesso(user, String.format(MessageUtil.CADASTRO_REALIZADO_SUCESSO_P, "Usuario"), 0);
        }
        catch (Exception e){
            renderJSONError(String.format(MessageUtil.ERRO_PADRAO,"cadastro de usuario " + e.getMessage()));

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
                renderJSONError("Usuario ou senha digitados nao existem");
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

    public static void listarUsuarios(Integer pagina){
        try{

            List<UsuarioModel> usuarios = new UsuarioModel().listarUsuariosPaginado(pagina);

            renderJSONSucesso(usuarios, String.format(MessageUtil.MSG_GENERICA_CADASTRO, "Pedido"), (int) UsuarioModel.count(""));
        }
        catch (Exception e){
            renderJSONError("Erro ao Buscar Pedidos");
        }
    }
    public static void esqueceuSenha(String email){

        try{

            if(email==null)
                renderJSONError("Email em Branco");


            UsuarioModel usuario = UsuarioModel.find("email = :email")
                    .setParameter("email", email)
                    .first();

            String novaSenha = SenhaGenerate.gerarSenha();

            usuario.senha = SenhaGenerate.sha1(novaSenha);
            if(usuario!=null){
                session.put("usuario",usuario.id);
                if(usuario.email!=usuario.email)
                    Mails.reenviaSenha(usuario,novaSenha);
                renderJSONSucesso(usuario.save(), "Senha Reenviada com Sucesso!",0);
            }

            if(usuario==null)
                renderJSONError("Usuario não existe");
        }
        catch (Exception e){

        }
    }

    public static void deletarUsuario(Long idUsuario){

    }

    public static void verificarRedeSocial(Long idRedeSocial){

        try{

            if(idRedeSocial == null)
                renderJSONError(String.format(MessageUtil.BAD_REQUEST_PARAM,"idRedeSocial"));
            if(idRedeSocial != null) {
                UsuarioModel user = UsuarioModel.find("idSocial = :idSocial").setParameter("idSocial", idRedeSocial).first();
                if(user!=null) {
                    session.put("usuario",user.id);
                    renderJSONSucesso(user, String.format(MessageUtil.CONSULTA_REALIZADA_SUCESSO, "Usuario"), 0);
                }
                else{
                    renderJSONSucesso("Nenhum Usuario Cadastrado");

                }
            }

        }

        catch (Exception e){
            renderJSONError(MessageUtil.ERRO_PADRAO);

        }

    }



}
