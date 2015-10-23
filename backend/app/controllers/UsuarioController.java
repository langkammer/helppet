package controllers;

import models.portalseg.UsuarioModel;
import utils.ControllerUtil;
import utils.messages.MessageUtil;

/**
 * Created by Robson on 20/10/2015.
 */
public class UsuarioController extends ControllerUtil {


    public static void cadastrarUsuario(UsuarioModel usuario){

        try{

            if(usuario == null)
                renderJSONError(String.format(MessageUtil.BAD_REQUEST_PARAM,"usuario"));
            if(usuario != null)
                renderJSONSucesso(usuario.save(),String.format(MessageUtil.CADASTRO_REALIZADO_SUCESSO_P,"Usuario"),0 );
        }
        catch (Exception e){
            renderJSONError(MessageUtil.ERRO_PADRAO);

        }

    }

    public static void listarUsuarios(){

    }

    public static void esqueceuSenha(String email){

    }
    public static void deletarUsuario(Long idUsuario){

    }

}
