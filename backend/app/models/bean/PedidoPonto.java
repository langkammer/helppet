package models.bean;

import enums.EnumFrequencia;
import enums.EnumPedidoAjuda;
import enums.TipoAnimal;
import models.base.MunicipioModel;
import models.helppet.PedidoAjudaModel;

import javax.persistence.Column;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Robson on 07/02/2016.
 */
public class PedidoPonto {

	public Double lat;

	public Double lng;

	public String group;

	public String message;

	public EnumFrequencia frequencia;

	public Long id;

	public EnumPedidoAjuda status;

	public TipoAnimal tipo;

	public Long idUsuario;

	public IconBean icon;

	public Integer[] iconSize;

	public MunicipioModel municipio;

	public String observacao;

	public String condicoes;

	public Integer numFotos;

	public String data;

	public String[] fotos;

	public PedidoPonto(){}

	public PedidoPonto(Double lat,Double lng,String condicao,EnumFrequencia frequencia,Long id,String observacao, EnumPedidoAjuda status,
					   TipoAnimal tipo,Long idUsuario,MunicipioModel municipio,Integer numFotos){
		this.lat = lat;
		this.lng = lng;
		this.frequencia = frequencia;
		this.id = id;
		String path =  PedidoAjudaModel.getPedidoFotoFalseTrue(id);
		//PedidoAjudaModel.getPedidoFotoFalseTrue(idPedido)
//		this.message = "<p> Condicao : " + condicao + "</p>" +"<p> Observacoes : " + observacao + "</p>" +
//					   "<p> Tipo Animal :</p>" + tipo.toString() + "<p> Frequencia em que foi avistado : </p>" +frequencia.toString() + " Vezes";
		this.message = "<div class=\"row\">\n" +
				"      <div class=\"col-md-5 center\">\n" +
				"        <img src="+ path + " width=\"100px\" height=\"100px\" alt=\"...\" class=\"img-circle\" >\n" +
				"           <p></p> "+
				" 			<a class=\"btn btn-default center\" href=\"/#/detalhes-pedido?id="+id+"\" role=\"button\">Detalhes</a>" +
				"      </div>\n" +
				"\n" +
				"      <div class=\"col-md-7\">\n" +
				"        <div>\n" +
				"          <p>Tipo Animal : " + tipo.toString() +" </p>\n" +
				"        </div>\n" +
				"        <div>\n" +
				"          <p>Condicoes : " + condicao + " </p>\n" +
				"        </div>\n" +
				"        <div>\n" +
				"          <p>Observacoes : " + observacao + " </p>\n" +
				"        </div>\n" +
				"        <div>\n" +
				"          <p>Frequencia de avistamento : "+ frequencia.toString() +" Vezes</p>\n" +
				"        </div>\n" +
				"      </div>\n" +
				"      \n" +
				"    </div>";
		this.condicoes = condicao;
		this.observacao = observacao;
		this.municipio = municipio;
		this.status = status;
		this.tipo = tipo;
		this.idUsuario = idUsuario;
		this.icon = new IconBean(id);
		this.numFotos = numFotos;
		this.fotos = PedidoAjudaModel.getFotosArray(id);

	}

}
