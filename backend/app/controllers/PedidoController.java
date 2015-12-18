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
            renderJSONGEOSucesso(pedido.salvarPedido(lat,lng), "Pedido Salvo com Sucesso!",0, "id", "geo", "usuario","fotos","tipoAnimal","observacao", "observacao", "condicoes", "frequencia","status");

        }
        catch (Exception e){
            renderJSONError(MessageUtil.ERRO_PADRAO);

        }

    }

    public static void listarPedidos(Double lat, Double lng, TipoAnimal tipoAnimal, String raio, Long codigoMunicipio, Boolean ordem,Long pagina){

        try{

            List<PedidoAjudaModel> listaPedido = new PedidoAjudaModel().filtrarPedidos(lat,lng,tipoAnimal,raio,codigoMunicipio,ordem,pagina);

            if(listaPedido==null || listaPedido.size() < 1)
                renderJSONSucesso("Consulta Vazia!");

            if(listaPedido!=null)
                renderJSONGEOSucesso(listaPedido, "Consulta Correta!",listaPedido.size(), "id","geo", "usuario","fotos","tipoAnimal","observacao", "observacao", "condicoes", "frequencia","status");
        }
        catch (Exception e){
            renderJSONError(MessageUtil.ERRO_PADRAO);

        }

    }

    public static void salvarFoto(List<File> file, Long idPedido, String padrao){

        try{

            if(idPedido == null)
                renderJSONError(String.format(MessageUtil.BAD_REQUEST_PARAM,"idPedido"));

            renderJSONSucesso(new PedidoAjudaModel().salvarFoto(file,idPedido,padrao), "Foto Adicionada com Sucesso" ,0);


        }
        catch (Exception e){

            renderJSONError("ERRO AO ADICIONAR FOTO");
        }

    }

    public static void getFoto(Long idPedido, Integer numFoto){

        try{
            if(idPedido == null)
                renderJSONError(String.format(MessageUtil.BAD_REQUEST_PARAM,"idPedido"));

            File file = new PedidoAjudaModel().getFoto(idPedido, numFoto);

            if(file!=null)
                renderBinary(new PedidoAjudaModel().getFoto(idPedido,numFoto));

        }
        catch (Exception e){
            renderJSONError("ERRO AO LOCALIZAR FOTO");
        }

    }

    public static void getPedido(Long idPedido){

        try{
            if(idPedido == null)
                renderJSONError(String.format(MessageUtil.BAD_REQUEST_PARAM,"idPedido"));
            renderJSONGEOSucesso(PedidoAjudaModel.findById(idPedido), "Consulta Correta!",0, "id","geo", "usuario","fotos","tipoAnimal","observacao", "observacao", "condicoes", "frequencia","status");


        }
        catch (Exception e){
            renderJSONError("ERRO AO LOCALIZAR FOTO");
        }
    }
}
