package models.helppet;

import com.vividsolutions.jts.geom.Coordinate;
import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.geom.GeometryFactory;
import enums.EnumFrequencia;
import enums.EnumPedidoAjuda;
import enums.EnumPublicacao;
import enums.TipoAnimal;
import models.CoordenadaGps;
import models.base.MunicipioModel;
import models.bean.PedidoPonto;
import models.portalseg.UsuarioModel;
import notifiers.Mails;
import org.hibernate.annotations.Type;
import play.Play;
import play.db.jpa.Blob;
import play.db.jpa.GenericModel;
import play.db.jpa.JPA;
import play.libs.MimeTypes;
import utils.GeoUtils;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by Robson on 03/10/2015.
 */
@Entity
@Table(name = "pedido_ajuda")
public class PedidoAjudaModel extends GenericModel{

//
//	EXEMPLO DE BUFFER
//
//	0.00001 = 1  METROS
//	0.00010 = 10 METROS
//	0.00100 = 100 METROS
//	0.14000
//	0.01000 = 1000 METROS
//	0.10000 = 10000 METROS
//	1.00000 = 100000 METROS

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pedido_id_seq")
	@SequenceGenerator(name = "pedido_id_seq",
			sequenceName = "pedido_id_seq",
			allocationSize = 1)
	@Column(columnDefinition = "serial")
	public Long id;

	@OneToOne
	@JoinColumn(name = "ID_USUARIO")
	@NotNull
	public UsuarioModel usuario;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "FOTO_PEDIDOS",
			joinColumns = @JoinColumn(name = "ID_PEDIDO"),
			inverseJoinColumns = @JoinColumn(name = "ID_FOTO")
	)
	@Valid
	public List<FotosModel> fotos;

	@Column(name="TIPO_ANIMAL")
	@Enumerated
	@NotNull
	public TipoAnimal tipoAnimal;

	@Type(type = "org.hibernate.spatial.GeometryType")
	@Column(name = "GEO", nullable = true)
	@NotNull
	public Geometry geo;

	@Column(name="OBSERVACAO")
	public String observacao;

	@Column(name="CONDICOES")
	public String condicoes;

	@Column(name="FREQUENCIA")
	@Enumerated
	public EnumFrequencia frequencia;

	@Column(name="STATUS")
	@Enumerated
	public EnumPedidoAjuda status;

	@Column(name="DATA_POSTAGEM")
	public Date data;

	@OneToOne
	@JoinColumn(name = "ID_MUNICIPIO")
	public MunicipioModel municipio;

	public static List<PedidoAjudaModel> buscarLatLng(CoordenadaGps coordenada){
		String sql = "select * from  pedido_ajuda  WHERE ST_Within(geo, ST_Buffer(ST_SetSRID(ST_MakePoint("+coordenada.lat+","+coordenada.lng+"), 4326), "+coordenada.distancia+")) and status = + 1 ";


		//List lista = JPA.em().createQuery(sql).getResultList();

		return JPA.em().createNativeQuery(sql, PedidoAjudaModel.class).getResultList();
	}

	public static List<PedidoPonto> listarPedidosMapa(Double lat, Double lng, Integer raioInt){

		String raio = GeoUtils.zomToRaio(raioInt);

		String sql = "select * from  pedido_ajuda  WHERE ST_Within(geo, ST_Buffer(ST_SetSRID(ST_MakePoint(" + lng + "," +lat  + "), 4326), " + raio + ")) and status = + 1 ";


		List<PedidoAjudaModel> listaPedidos = JPA.em().createNativeQuery(sql, PedidoAjudaModel.class).getResultList();

		PedidoPonto pedidoBean;

		List<PedidoPonto> listaBeanPedidos = new ArrayList<PedidoPonto>();

		for(PedidoAjudaModel pedido : listaPedidos){

			pedidoBean = new PedidoPonto(pedido.geo.getCoordinate().y,pedido.geo.getCoordinate().x,pedido.condicoes,pedido.frequencia,pedido.id,
										 pedido.observacao,pedido.status,pedido.tipoAnimal,pedido.usuario.id,pedido.municipio,pedido.fotos.size());


			listaBeanPedidos.add(pedidoBean);
		}

		return listaBeanPedidos;

	}

	public static List<PedidoAjudaModel> filtrarPedidos(Double lat, Double lng, TipoAnimal tipoAnimal, String raio, Long codigoMunicipio, Boolean ordem, Long pagina){



		if(raio.isEmpty() || Integer.parseInt(raio) == 0){
			raio = "1.00000"; // padrao caso o raio n�o venha ser� de 100 km
		}
		else{
			raio = GeoUtils.converteKmRaio(raio);
		}

		if(tipoAnimal==null)
			tipoAnimal = TipoAnimal.CAES; // por padr�o � sempre selecionado c�es

		if(codigoMunicipio==null){
			codigoMunicipio = 3106200l; //padr�o municipio BH
			if(lat==null)
				lat = -43.944540;
			if(lng==null)
				lng = -19.922681;
		}
		else{
			MunicipioModel municipio = MunicipioModel.findById(codigoMunicipio);
			if(municipio!=null){
				if(lat==null && municipio.lng!=null){
					lat = Double.parseDouble(municipio.lng);
				}
				if(lng==null && municipio.lat!=null){
					lng = Double.parseDouble(municipio.lat);
				}
				if(lat==null && municipio.lng==null)
					lng = -19.922681;
				if(lng==null && municipio.lat==null)
					lat = -43.944540;
			}

		}

		if(ordem==null)
			ordem = true; // ordem padr�o crescente

		if(ordem == true) {
			String sql = "select * from  pedido_ajuda  WHERE ST_Within(geo, ST_Buffer(ST_SetSRID(ST_MakePoint(" + lat + "," + lng + "), 4326), " + raio + "))" +
					" and status = 1 and id_municipio = " + codigoMunicipio + " and  tipo_animal = " + tipoAnimal.ordinal() + " order by data_postagem asc";

			List<PedidoAjudaModel> listaPedidos = JPA.em().createNativeQuery(sql, PedidoAjudaModel.class).getResultList();

			return listaPedidos;
		}
		else{
			String sql = "select * from  pedido_ajuda  WHERE ST_Within(geo, ST_Buffer(ST_SetSRID(ST_MakePoint(" + lat + "," + lng + "), 4326), " + raio + "))" +
					"  and status = 1 and id_municipio = " + codigoMunicipio + " and  tipo_animal = " + tipoAnimal.ordinal() + " order by data_postagem desc";

			List<PedidoAjudaModel> listaPedidos = JPA.em().createNativeQuery(sql, PedidoAjudaModel.class).getResultList();

			return listaPedidos;
		}

		//List lista = JPA.em().createQuery(sql).getResultList();


	}

	public PedidoAjudaModel salvarPedido(String lat, String lng){


		Geometry geo =  new GeometryFactory().createPoint(new Coordinate(Double.parseDouble(lng),Double.parseDouble(lat)));
		geo.setSRID(4326);
		this.geo = geo;
		this.status = EnumPedidoAjuda.AGUARDANDO;
		return this.save();

	}
//
//	public List<Point> pontosPerto(Double lat, Double lng, Double distancia) throws FactoryException {
//
//
//		List<PedidoAjudaModel> pontos = PedidoAjudaModel.findAll();
//
//		CoordinateReferenceSystem geoCRS = CRS.decode("EPSG:*4326");
//		CoordinateReferenceSystem utmCRS = CRS.decode("EPSG:*32630");
//
//		MathTransform transformToUtm = CRS.findMathTransform(geoCRS, utmCRS);
//
//		Geometry targetGeometry = JTS.transform(point, transformToUtm);
//		Geometry buffer = targetGeometry.buffer(30.00);
//		buffer.setSRID(32630);
//
//		MathTransform transformToGeo = CRS.findMathTransform(utmCRS, geoCRS);
//		Geometry bufferGeo = JTS.transform( buffer, transformToGeo);
//		bufferGeo.setSRID(4326);
//
//
//	}


	public String salvarFoto(List<File> file, Long idPedido,String padrao) throws FileNotFoundException, UnsupportedEncodingException {

		PedidoAjudaModel pedido = PedidoAjudaModel.findById(idPedido);

		FotosModel foto;

		List<FotosModel> listaFoto = new ArrayList<FotosModel>();
		for(File fileFoto : file){
			foto = new FotosModel();
			Blob blobImage = new Blob();
			blobImage.set(new FileInputStream(fileFoto), MimeTypes.getContentType(fileFoto.getName()));
			foto.file = blobImage;
			if(fileFoto.getName().equals(padrao)){
				foto.capa = true;
			}
			else{
				foto.capa = false;
			}

			listaFoto.add(foto);
		}

		pedido.fotos = null;

		pedido.fotos = listaFoto;

		pedido.save();

		if(pedido.usuario.email!=null)
			Mails.notificaPublicacaoPendente(EnumPublicacao.PENDENTE,pedido.usuario);

		return "ok";

	}

	public File getFoto(Long idPedido, Integer numFoto){

		PedidoAjudaModel pedido = PedidoAjudaModel.findById(idPedido);

		if(numFoto==null)
			numFoto = 0;
		File file;
		if(pedido.fotos.size() <= 0){

			file = new java.io.File("public/images/logo.png");
		}
		else{
			file = pedido.fotos.get(numFoto).file.getFile();

		}

		return file;


	}

	public static String getPedidoFotoFalseTrue(Long idPedido){


		PedidoAjudaModel pedidoAjuda = PedidoAjudaModel.findById(idPedido);

		if(pedidoAjuda!=null){
			if(pedidoAjuda.fotos.size()>0){
				return "service/pedido/"+pedidoAjuda.id+"/getFoto/0";
			}
			else{
				return "images/ponto_marca.png";
			}
		}
		else{
			return "images/ponto_marca.png";
		}



	}


	public static String[] getFotosArray(Long idPedido){


		PedidoAjudaModel pedidoAjuda = PedidoAjudaModel.findById(idPedido);

		String[] pathFotos = new String[pedidoAjuda.fotos.size()];
		int i = 0;
		if(pedidoAjuda!=null){
			for(FotosModel fotos : pedidoAjuda.fotos){
				pathFotos[i] = "service/pedido/"+pedidoAjuda.id+"/getFoto/"+i;
				i++;
			}
			return pathFotos;
		}
		else{
			pathFotos[0] = "images/ponto_marca.png";
			return pathFotos;
		}



	}
	public static PedidoPonto getPedido(Long idPedido){

		PedidoAjudaModel pedido = PedidoAjudaModel.findById(idPedido);

		 return new PedidoPonto(pedido.geo.getCoordinate().y,pedido.geo.getCoordinate().x,pedido.condicoes,pedido.frequencia,pedido.id,
				pedido.observacao,pedido.status,pedido.tipoAnimal,pedido.usuario.id,pedido.municipio,pedido.fotos.size());

	}

	public static List<PedidoPonto> listarPedidoByUser(String idUsuario){

		List<PedidoAjudaModel> listaPedidos = PedidoAjudaModel.find("usuario.id = :idUsuario")
															  .setParameter("idUsuario",Long.parseLong(idUsuario))
															  .fetch();

		List<PedidoPonto> listaPedido = new ArrayList<PedidoPonto>();

		PedidoPonto pedido;

		SimpleDateFormat dt = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss");

		for(PedidoAjudaModel p : listaPedidos){

			pedido = new PedidoPonto();

			pedido.frequencia = p.frequencia;

			pedido.observacao = p.observacao;

			pedido.condicoes = p.condicoes;

			pedido.data = dt.format(p.data);

			pedido.status = p.status;

			pedido.id = p.id;

			listaPedido.add(pedido);

		}
		return listaPedido;

	}

	public static List<PedidoPonto> listarPedidosPaginado(Integer pagina){
		if( pagina == null || pagina<1)
		{
			pagina = 1;
		}

		List<PedidoPonto> listaPedidosBean = new ArrayList<PedidoPonto>();

		List<PedidoAjudaModel> listaPedidos = PedidoAjudaModel.find("")
				.fetch(pagina, Integer.parseInt(Play.configuration.getProperty("configuration.pagination.size")));

		PedidoPonto pedidoBean;
		SimpleDateFormat dt = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss");

		for(PedidoAjudaModel p : listaPedidos){

		pedidoBean = new PedidoPonto();
			pedidoBean.id = p.id;
			pedidoBean.condicoes = p.condicoes;
			pedidoBean.observacao = p.observacao;
			pedidoBean.frequencia = p.frequencia;
			pedidoBean.municipio = p.municipio;
			pedidoBean.idUsuario = p.usuario.id;
			pedidoBean.usuario = p.usuario;
			pedidoBean.status = p.status;
			pedidoBean.data = dt.format(p.data);
			pedidoBean.fotos = 	PedidoAjudaModel.getFotosArray(p.id);


			listaPedidosBean.add(pedidoBean);
		}

		return listaPedidosBean;
	}

	public void aprovarPedido() throws UnsupportedEncodingException {

		if(this.status != EnumPedidoAjuda.APROVADO){
			this.status = EnumPedidoAjuda.APROVADO;
			this.save();
			if(this.usuario.email!=null)
				Mails.notificaPublicacaoAprovada(EnumPublicacao.PUBLICADO, this.usuario);
		}

	}
	public void reprovarPedido() throws UnsupportedEncodingException {

			this.status = EnumPedidoAjuda.REPROVADO;
			this.save();
		if(this.usuario.email!=null)
			Mails.notificaPublicacaoReprovada(EnumPublicacao.REPROVADO, this.usuario);

	}
}
