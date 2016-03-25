package controllers;

import enums.TipoAnimal;
import models.bean.PedidoPonto;
import models.helppet.PedidoAjudaModel;
import utils.ControllerUtil;
import utils.messages.MessageUtil;

import java.util.List;

/**
 * Created by gt4w_dev08 on 04/02/2016.
 */
public class MapaController  extends ControllerUtil {


	public static void listarPontos(Double lat, Double lng,Integer raio){

		try{

			List<PedidoPonto> listaPedido = new PedidoAjudaModel().listarPedidosMapa(lat, lng, raio);

			if(listaPedido==null || listaPedido.size() < 1)
				renderJSONSucesso("Consulta Vazia!");

			if(listaPedido!=null)
				renderJSONSucesso(listaPedido, "Consulta Correta!",listaPedido.size());
		}
		catch (Exception e){
			renderJSONError(MessageUtil.ERRO_PADRAO);

		}

	}

	public static void listarAppPontos(Double lat, Double lng,String raio, Boolean cao,Boolean gato,Boolean outros){

		try{

			List<PedidoPonto> listaPedido = new PedidoAjudaModel().filtrarPedidoMapa(lat, lng, raio,cao,gato,outros);

			if(listaPedido==null || listaPedido.size() < 1)
				renderJSONSucesso("Consulta Vazia!");

			if(listaPedido!=null)
				renderJSONSucesso(listaPedido, "Consulta Correta!",listaPedido.size());
		}
		catch (Exception e){
			renderJSONError(MessageUtil.ERRO_PADRAO);

		}

	}
}
