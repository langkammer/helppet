package models.helppet;

import com.vividsolutions.jts.geom.Geometry;
import enums.EnumFrequencia;
import enums.EnumPedidoAjuda;
import enums.TipoAnimal;
import models.portalseg.UsuarioModel;
import org.hibernate.annotations.Type;
import play.db.jpa.GenericModel;

import javax.persistence.*;
import java.util.Date;

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

	@OneToOne
	@JoinColumn(name = "ID_FOTO")
	public FotosModel foto;

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
