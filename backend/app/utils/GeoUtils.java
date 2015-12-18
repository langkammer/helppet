package utils;

import com.vividsolutions.jts.geom.Envelope;
import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.geom.Point;
import com.vividsolutions.jts.io.ParseException;
import com.vividsolutions.jts.io.WKTReader;
import org.apache.commons.lang.NullArgumentException;
import org.apache.commons.lang.StringUtils;

import java.util.List;

/**
 * 
 * @author Jaime Daniel Corrêa Mendes [a.k.a ~lordshark]
 * @since 19/03/2015
 * 
 * Métodos estáticos para ajudar com o GEO
 *
 */
public class GeoUtils {

	public static String converteKmRaio(String raio){

		Integer raioInt = Integer.parseInt(raio);


		String resulta;
		if(raioInt == 100)
			return resulta =  "1.00000";

		if(raioInt >= 1 && raioInt <= 9){
			resulta = "0.0" + raioInt +"000";
		}
		else{
			resulta = "0."+ raioInt  +"000";
		}
		return  resulta;



	}
	public static String juntaNumeros(String num){
		String resultado = null;

		if(num.split("\\.")[0]!=null){
			resultado = num.split("\\.")[0];
		}
		if(num.split("\\.").length >= 1){
			if(num.split("\\.")[1]!=null ){
				resultado += "." + num.split("\\.")[1];
			}
		}
		if(num.split("\\.").length >= 3){
			if(num.split("\\.")[2]!=null){
				resultado += "" + num.split("\\.")[2];
			}
		}
		return resultado;
	}
	/**
	 * 
	 */
	private static int DEFAULT_SRID = 3857;

	/**
	 * Convert an Envelope to Double[xmin, ymax, xmax, ymin]
	 * @return
	 */
	public static Double[] envelopeToArray(Envelope envelope) {
		
		if (envelope == null) {
			return null;
		}
		
		return new Double[] {
			envelope.getMinX(), envelope.getMaxY(), envelope.getMaxX(), envelope.getMinY()
		};
		
	}
	
	/**
	 * 
	 * Retorna um envelope
	 * Casos de erro retornam null;
	 * 
	 * @param points
	 * @return
	 */
	public static Envelope getBoundingBox (List<Geometry> points) {
		
		if ((points == null) || (points.size() == 0)) {
			return null;
		}
		
		Double xmin = Double.MAX_VALUE;
		
		Double ymin = Double.MAX_VALUE;
		
		Double ymax = Double.MAX_VALUE * -1;
		
		Double xmax = Double.MAX_VALUE * -1;
		
		for (Geometry point : points) {
			
			if (point.getGeometryType().equals("Point")) {
				
				Point cast = (Point)point;
				
				if (cast.getX() < xmin) {
					xmin = cast.getX();
				}
				
				if (cast.getY() < ymin) {
					ymin = cast.getY();
				}
				
				if (cast.getX() > xmax) {
					xmax = cast.getX();
				}
				
				if (cast.getY() > ymax) {
					ymax = cast.getY();
				}
				
			}
			
		}
		
		return new Envelope(xmin, xmax, ymin, ymax);
		
	}
	
	/**
	 * 
	 * @param points
	 * @param buffer
	 * @return
	 */
	public static Envelope getBufferedBoundingBox (List<Geometry> points, Double buffer) {
		
		if ((points == null) || (points.size() == 0) || (buffer <= 0)) {
			return null;
		}
		
		Envelope output = getBoundingBox(points);
		
		output.expandBy(buffer);
		
		return output; 
		
	}
	
	
	/**
	 * 
	 * Verfifica se a área do WKT é maior do que a informada como argumento.
	 * Lembrando que a área é em graus por se tratar de LAT LONG
	 * 
	 * @param wkt
	 * @param area
	 * @return
	 * @throws ParseException
	 * @throws NullArgumentException
	 * @throws IllegalArgumentException
	 */
	public static Boolean hasAreaBiggerThan (String wkt, Double area) throws ParseException, NullArgumentException, IllegalArgumentException {
		
		if ((StringUtils.isBlank(wkt)) || (area <= 0)) {
			
			throw new IllegalArgumentException("O WKT e a Área são obrigatórios"); 
			
		}
		
		Geometry polygon = new WKTReader().read(wkt);
		
		if (!polygon.getGeometryType().equals("Polygon")) {
			
			throw new IllegalArgumentException("A geometria informada não é um polígono");
			
		}

        polygon.setSRID(GeoUtils.DEFAULT_SRID);
		
		return polygon.getArea() > area;
		
	}
	
}
