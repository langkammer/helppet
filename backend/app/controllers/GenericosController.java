package controllers;

import enums.TipoAnimal;
import models.CoordenadaGps;
import models.base.MunicipioModel;
import models.bean.PontoBean;
import models.helppet.PedidoAjudaModel;
import models.portalseg.FormularioContatoModel;
import utils.ControllerUtil;
import utils.GoogleMapsUtil;
import utils.messages.MessageUtil;

import javax.swing.text.html.HTML;
import javax.swing.text.html.HTMLDocument;
import javax.swing.text.html.HTMLWriter;
import java.util.List;
import java.util.concurrent.ExecutionException;

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

            List<PontoBean> listPontos = GoogleMapsUtil.consultarGeolocalizacao(nome, uf);

            renderJSONSucesso(listPontos, "Consulta Correta!", listPontos.size());

        }
        catch (Exception e){
            renderJSONError(MessageUtil.ERRO_PADRAO);

        }
    }

    public static void sendContato(FormularioContatoModel formContato){
        try{

            if(formContato == null)
                renderJSONError(String.format(MessageUtil.BAD_REQUEST_PARAM,"formContato"));
            formContato.enviarContato();
            renderJSONSucesso("Formulario de Contato Enviado com Sucesso!");

        }
        catch (Exception e){
            renderJSONError(MessageUtil.ERRO_PADRAO);

        }
    }

    public static void listarMensagens(Integer pagina){
        try{

            if(pagina == null)
                renderJSONError(String.format(MessageUtil.BAD_REQUEST_PARAM,"pagina"));

            renderJSONSucesso(FormularioContatoModel.listarMsgPaginado(pagina), "Consulta Realizada Com Sucesso!", (int) FormularioContatoModel.count());

        }
        catch (Exception e){
            renderJSONError(MessageUtil.ERRO_PADRAO);

        }
    }

    public static void gerarPaginaHtmlCompartilhamento(Long idPedido){

        try {
            PedidoAjudaModel pedido = PedidoAjudaModel.findById(idPedido);

            if (pedido != null) {
                renderHtml("<html xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"pt-br\" lang=\"pt-br\">\n" +
                        "<head>\n" +
                        "<title>HELP-PET</title>\n" +
                        "<meta charset=\"utf-8\">\n"+
                        "\t<meta property=\"og:type\"               content=\"article\" />\n" +
                        "\t<meta property=\"og:title\"              content=\"Animal de rua Perdido em : " + pedido.municipio.nome + "\" />\n" +
                        "\t<meta property=\"og:description\"        content=\"Ajude o resgate dele acessando nosso Portal ou em nosos Aplicativo Movel\" />\n" +
                        "\t<meta property=\"og:image\"              content=\"http://www.helppet.net.br/service/pedido/" + pedido.id + "/getFoto/0\" />\n" +
                        "</head>\n" +
                        "<body>\n" +
                        "</body>\n" +
                        "</html>");
            } else {
                renderHtml("<html xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"pt-br\" lang=\"pt-br\">\n" +
                        "<head>\n" +
                        "<title>HELP-PET</title>\n" +
                        "<meta charset=\"utf-8\">\n"+
                        "\t<meta property=\"og:type\"               content=\"article\" />\n" +
                        "\t<meta property=\"og:description\"        content=\"Ajude o resgate dele acessando nosso Portal ou em nosos Aplicativo Movel\" />\n" +
                        "</head>\n" +
                        "<body>\n" +
                        "</body>\n" +
                        "</html>");
            }
        }
        catch (Exception e){
            renderJSONError("erro " + e);
        }


    }

}
