package models.helppet;

import com.vividsolutions.jts.geom.Coordinate;
import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.geom.GeometryFactory;
import enums.EnumFrequencia;
import enums.EnumPedidoAjuda;
import enums.TipoAnimal;
import models.CoordenadaGps;
import models.base.MunicipioModel;
import models.portalseg.UsuarioModel;
import org.hibernate.annotations.Type;
import play.db.jpa.GenericModel;
import play.db.jpa.JPA;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

/**
 * Created by Robson on 03/10/2015.
 */
@Entity
@Table(name = "pedido_ajuda")
public class PedidoAjudaModel extends GenericModel implements Cloneable{

//
//	EXEMPLO DE BUFFER
//
//	0.00001 = 1  METROS
//	0.00010 = 10 METROS
//	0.00100 = 100 METROS
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
		String sql = "select * from  pedido_ajuda  WHERE ST_Within(geo, ST_Buffer(ST_SetSRID(ST_MakePoint("+coordenada.lat+","+coordenada.lng+"), 4326), "+coordenada.distancia+"))";

		//List lista = JPA.em().createQuery(sql).getResultList();

		return JPA.em().createNativeQuery(sql, PedidoAjudaModel.class).getResultList();
	}

	public static List<PedidoAjudaModel> filtrarPedidos(Double lat, Double lng, TipoAnimal tipoAnimal, String raio, Long codigoMunicipio, Boolean ordem){

		if(lat==null)
			lat = -43.944540;
		if(lng==null)
			lng = -19.922681;

		if(raio==null)
			raio = "0.10000"; // padrao caso o raio não venha será de 100 km

		if(tipoAnimal==null)
			tipoAnimal = TipoAnimal.CAES; // por padrão é sempre selecionado cães

		if(codigoMunicipio==null)
			codigoMunicipio = 3106200l; //padrão municipio BH

		if(ordem==null)
			ordem = true; // ordem padrão crescente

		if(ordem == true) {
			String sql = "select * from  pedido_ajuda  WHERE ST_Within(geo, ST_Buffer(ST_SetSRID(ST_MakePoint(" + lat + "," + lng + "), 4326), " + raio + "))" +
					" and id_municipio = " + codigoMunicipio + " and  tipo_animal = " + tipoAnimal.ordinal() + " order by data_postagem asc";

			List<PedidoAjudaModel> listaPedidos = JPA.em().createNativeQuery(sql, PedidoAjudaModel.class).getResultList();

			return listaPedidos;
		}
		else{
			String sql = "select * from  pedido_ajuda  WHERE ST_Within(geo, ST_Buffer(ST_SetSRID(ST_MakePoint(" + lat + "," + lng + "), 4326), " + raio + "))" +
					" and id_municipio = " + codigoMunicipio + " and  tipo_animal = " + tipoAnimal.ordinal() + " order by data_postagem desc";

			List<PedidoAjudaModel> listaPedidos = JPA.em().createNativeQuery(sql, PedidoAjudaModel.class).getResultList();

			return listaPedidos;
		}

		//List lista = JPA.em().createQuery(sql).getResultList();


	}

	public PedidoAjudaModel salvarPedido(String lat, String lng){


		Geometry geo =  new GeometryFactory().createPoint(new Coordinate(Double.parseDouble(lng),Double.parseDouble(lat)));
		geo.setSRID(4326);
		this.geo = geo;
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
}
