package utils;

import java.io.IOException;

import org.geotools.geojson.geom.GeometryJSON;

import com.vividsolutions.jts.geom.Geometry;

public class GeoJsonUtils {

    public static final Integer SRID = 4674;

    public static final Integer PRECISION = 15;

    public static String toGeoJson(Geometry geometry){

        GeometryJSON gjson = new GeometryJSON(PRECISION);

        return gjson.toString(geometry);

    }

    public static Geometry toGeometry(String geoJson) throws IOException{

        GeometryJSON gjson = new GeometryJSON();
        Geometry geometry = gjson.read(geoJson);
        geometry.setSRID(SRID);

        return geometry;

    }
}
