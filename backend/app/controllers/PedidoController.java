package controllers;

import enums.TipoAnimal;
import models.CoordenadaGps;
import models.helppet.PedidoAjudaModel;
import utils.ControllerUtil;
import utils.messages.MessageUtil;

import java.io.File;
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

    public static void cadastrarPedido(PedidoAjudaModel pedido, String lat, String lng){

        try{

            if(pedido == null)
                renderJSONError(String.format(MessageUtil.BAD_REQUEST_PARAM,"pedido"));


        }
        catch (Exception e){
            renderJSONError(MessageUtil.ERRO_PADRAO);

        }

    }

    public static void listarPedidos(Double lat, Double lng, TipoAnimal tipoAnimal, String raio, Long codigoMunicipio, Boolean ordem){

        try{

            List<PedidoAjudaModel> listaPedido = new PedidoAjudaModel().filtrarPedidos(lat,lng,tipoAnimal,raio,codigoMunicipio,ordem);

            if(listaPedido==null || listaPedido.size() < 1)
                renderJSONSucesso("Consulta Vazia!");

            if(listaPedido!=null)
                renderJSONGEOSucesso(listaPedido, "Consulta Correta!",listaPedido.size(), "geo", "usuario","fotos","tipoAnimal","observacao", "observacao", "condicoes", "frequencia","status");
        }
        catch (Exception e){
            renderJSONError(MessageUtil.ERRO_PADRAO);

        }

    }


}
