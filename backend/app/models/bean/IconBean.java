package models.bean;

import models.helppet.PedidoAjudaModel;

import java.util.ArrayList;

/**
 * Created by Robson on 07/02/2016.
 */
public class IconBean {

	public String iconUrl;
	public Integer[] iconSize;

	public IconBean(){}

	public IconBean(Long idPedido){

		this.iconUrl = "images/ponto_marca.png";
		Integer[] intSize = new Integer[2];
		intSize[0] = 30;
		intSize[1] = 30;
		this.iconSize = intSize;


	}
}
