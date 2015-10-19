package controllers;

import models.helppet.PedidoAjudaModel;
import utils.ControllerUtil;


/**
 * Created by Robson on 03/10/2015.
 */
public class TesteController extends ControllerUtil {


//	public static void testar(){
//
//
//		try{
//			PedidoAjudaModel pedido = new PedidoAjudaModel();
//
//			Double lat = -19.808628;
//
//			Double lng = -43.951632;
//
//			Geometry geo =  new GeometryFactory().createPoint(new Coordinate(lng,lat));
//
//			geo.setSRID(4326);
//			// lat -19.808628 long -43.951632
//			// lat -19.808920 long -43.953794
//			// lat -19.809898 long -43.952683
//			// lat -19.809113 long -43.951744
//			// lat -19.808321 long -43.951997
//			// lat -19.807364 long -43.951803
//
//
//			pedido.condicoes = "ok";
//			pedido.data = new Date();
//			pedido.foto = new play.db.jpa.Blob();
//			pedido.frequencia = EnumFrequencia.ATIVO;
//			pedido.usuario = UsuarioModel.findById(1l);
//			pedido.geo = geo;
//			pedido.tipoAnimal = TipoAnimal.CAES;
//			pedido.status = EnumPedidoAjuda.EM_ABERTO;
//
//			renderJSONSucesso(pedido.save(),"SUCESSO",null);
//		}
//		catch (Exception e){
//		renderJSONError("ERRO");
//		}
//	}


	public static void testar2(Long idPedido){

		try
		{

			PedidoAjudaModel pedido = PedidoAjudaModel.findById(idPedido);

			renderJSONGEOSucesso(pedido, "Consulta Correta!", "geo","usuario","observacao","condicoes","frequencia","status");
		}
		catch (Exception e){
			renderJSONError("ERROU!" +e);
		}

	}
}
