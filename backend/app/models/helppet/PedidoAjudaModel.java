package models.helppet;

import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.geom.Point;
import enums.EnumFrequencia;
import enums.EnumPedidoAjuda;
import enums.TipoAnimal;
import models.portalseg.UsuarioModel;
import org.hibernate.annotations.Type;
import play.db.jpa.Blob;
import play.db.jpa.Model;

import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.OneToOne;
import java.util.Date;
import java.util.List;

/**
 * Created by Robson on 03/10/2015.
 */
@Entity
public class PedidoAjudaModel extends Model{


	@OneToOne
	public UsuarioModel usuario;

	public Blob foto;

	@Enumerated
	public TipoAnimal tipoAnimal;

	@Type(type = "org.hibernate.spatial.GeometryType")
	public Geometry geo;

	public String observacao;

	public String condicoes;

	@Enumerated
	public EnumFrequencia frequencia;

	@Enumerated
	public EnumPedidoAjuda status;

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
