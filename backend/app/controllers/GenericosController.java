package controllers;

import enums.TipoAnimal;
import models.CoordenadaGps;
import models.base.MunicipioModel;
import models.bean.PontoBean;
import models.helppet.PedidoAjudaModel;
import utils.ControllerUtil;
import utils.GoogleMapsUtil;
import utils.messages.MessageUtil;

import java.util.List;

/**
 * Created by Robson on 20/10/2015.
 */
public class GenericosController extends ControllerUtil {


    public static void listarCidadesByUf(String uf){

        try{

            if(uf == null)
                renderJSONError(String.format(MessageUtil.BAD_REQUEST_PARAM,"uf"));

            List<MunicipioModel> listaCidades = MunicipioModel.find("uf = :uf").setParameter("uf",uf.toUpperCase()).fetch();
            renderJSONSucesso(listaCidades, "Consulta Correta!", listaCidades.size());

        }
        catch (Exception e){
            renderJSONError(MessageUtil.ERRO_PADRAO);

        }

    }

    public static void enderecoPonto(String nome, String uf){
        try{

            if(uf == null)
                renderJSONError(String.format(MessageUtil.BAD_REQUEST_PARAM,"uf"));
            if(nome == null)
                renderJSONError(String.format(MessageUtil.BAD_REQUEST_PARAM,"nome"));

            List<PontoBean> listPontos = GoogleMapsUtil.consultarGeolocalizacao(nome,uf);

            renderJSONSucesso(listPontos, "Consulta Correta!", listPontos.size());

        }
        catch (Exception e){
            renderJSONError(MessageUtil.ERRO_PADRAO);

        }
    }


}
