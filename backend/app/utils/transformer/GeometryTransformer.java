package utils.transformer;

import java.io.IOException;
import java.lang.reflect.Type;

import com.vividsolutions.jts.geom.Geometry;

import flexjson.ObjectBinder;
import flexjson.ObjectFactory;
import flexjson.transformer.AbstractTransformer;
import utils.GeoJsonUtils;

public class GeometryTransformer extends AbstractTransformer implements ObjectFactory {

    @Override
    public Object instantiate(ObjectBinder context, Object geoJson, Type targetType, Class targetClass) {
        try {
            return GeoJsonUtils.toGeometry((String) geoJson);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public void transform(Object geometria) {

        if (geometria != null)
            getContext().writeQuoted(GeoJsonUtils.toGeoJson((Geometry) geometria));

    }

}
