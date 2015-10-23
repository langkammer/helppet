package models.helppet;

import com.vividsolutions.jts.geom.Geometry;
import enums.EnumFrequencia;
import enums.EnumPedidoAjuda;
import enums.TipoAnimal;
import models.CoordenadaGps;
import models.portalseg.UsuarioModel;
import org.hibernate.annotations.Type;
import play.db.jpa.GenericModel;
import play.db.jpa.JPA;
import utils.messages.MessageUtil;

import javax.persistence.*;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by Robson on 03/10/2015.
 */
@Entity
@Table(name = "pedido_ajuda")
public class PedidoAjudaModel extends GenericModel implements Cloneable{



	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pedido_id_seq")
	@SequenceGenerator(name = "pedido_id_seq",
			sequenceName = "pedido_id_seq",
			allocationSize = 1)
	@Column(columnDefinition = "serial")
	public Long id;

	@OneToOne
	@JoinColumn(name = "ID_USUARIO")
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
	public TipoAnimal tipoAnimal;

	@Type(type = "org.hibernate.spatial.GeometryType")
	@Column(name = "GEO", nullable = true)
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

	public static List<PedidoAjudaModel> buscarLatLng(CoordenadaGps coordenada){
		String sql = "select * from  pedido_ajuda  WHERE ST_Within(geo, ST_Buffer(ST_SetSRID(ST_MakePoint("+coordenada.lat+","+coordenada.lng+"), 4326), "+coordenada.distancia+"))";

		//List lista = JPA.em().createQuery(sql).getResultList();

		return JPA.em().createNativeQuery(sql, PedidoAjudaModel.class).getResultList();
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
