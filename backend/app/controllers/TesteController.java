package controllers;

import models.helppet.PedidoAjudaModel;
import play.mvc.Controller;
import utils.ControllerUtil;

import javax.xml.transform.Result;
import java.sql.Blob;

/**
 * Created by Robson on 03/10/2015.
 */
public class TesteController extends Controller{


	public static void testar(PedidoAjudaModel pedido){


//		try{
//			renderJSONSucesso(pedido.save(),"SUCESSO",null);
//		}
//		catch (Exception e){
//			renderJSONError("ERRO");
//		}
	}


	public static void testar2(){
		PedidoAjudaModel pedido = PedidoAjudaModel.findById(3l);

		renderBinary(pedido.foto.getFile());
	}
}
