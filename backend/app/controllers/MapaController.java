package controllers;

import models.helppet.PedidoAjudaModel;
import utils.ControllerUtil;
import utils.messages.MessageUtil;

import java.util.List;

/**
 * Created by gt4w_dev08 on 04/02/2016.
 */
public class MapaController  extends ControllerUtil {


	public static void listarPontos(Double lat, Double lng,String raio){

		try{

			List<PedidoAjudaModel> listaPedido = new PedidoAjudaModel().listarPedidosMapa(lat,lng,raio);

			if(listaPedido==null || listaPedido.size() < 1)
				renderJSONSucesso("Consulta Vazia!");

			if(listaPedido!=null)
				renderJSONGEOSucesso(listaPedido, "Consulta Correta!",listaPedido.size(), "id","geo", "usuario","fotos","tipoAnimal","observacao", "observacao", "condicoes", "frequencia","status");
		}
		catch (Exception e){
			renderJSONError(MessageUtil.ERRO_PADRAO);

		}

	}
}
