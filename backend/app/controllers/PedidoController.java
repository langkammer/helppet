package controllers;

import models.CoordenadaGps;
import models.helppet.PedidoAjudaModel;
import models.portalseg.UsuarioModel;
import utils.ControllerUtil;
import utils.messages.MessageUtil;

import java.util.List;

/**
 * Created by Robson on 20/10/2015.
 */
public class PedidoController extends ControllerUtil {


    public static void buscarPedidoPorGps(CoordenadaGps coordenada){

        try{

            if(coordenada == null)
                renderJSONError(String.format(MessageUtil.BAD_REQUEST_PARAM,"coordenada"));

            List<PedidoAjudaModel> listaPedido = new PedidoAjudaModel().buscarLatLng(coordenada);
            renderJSONGEOSucesso(listaPedido, "Consulta Correta!",listaPedido.size(), "geo", "usuario","fotos","tipoAnimal","observacao", "observacao", "condicoes", "frequencia","status");

        }
        catch (Exception e){
            renderJSONError(MessageUtil.ERRO_PADRAO);

        }

    }

    public static void buscarPedidosPorEndereco(CoordenadaGps coordenada){

        try{

            if(coordenada == null)
                renderJSONError(String.format(MessageUtil.BAD_REQUEST_PARAM,"coordenada"));

            List<PedidoAjudaModel> listaPedido = new PedidoAjudaModel().buscarLatLng(coordenada);
            renderJSONGEOSucesso(listaPedido, "Consulta Correta!",listaPedido.size(), "geo", "usuario","fotos","tipoAnimal","observacao", "observacao", "condicoes", "frequencia","status");
        }
        catch (Exception e){
            renderJSONError(MessageUtil.ERRO_PADRAO);

        }

    }

}
