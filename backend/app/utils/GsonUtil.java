package utils;


import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.vividsolutions.jts.geom.Geometry;

import utils.serializer.GeometryJsonSerializer;

public class GsonUtil {


	private static Gson gson;

	public static Gson gsonColetaMongo() {

		GsonBuilder builder = new GsonBuilder()
                .setDateFormat(ConfigUtil.DATE_FORMAT)
                .registerTypeHierarchyAdapter(Geometry.class, new GeometryJsonSerializer())
                .serializeNulls();

		gson = builder.create();

		return gson;
	}

    public static Gson gsonController() {

        GsonBuilder builder = new GsonBuilder().setDateFormat(ConfigUtil.DATE_FORMAT).serializeNulls();

        gson = builder.create();

        return gson;
    }
    
    /**
     * Para retornar a data em formato "legível" no relatório
     * 
     * @author Jaime Daniel Corrêa Mendes [a.k.a ~lordshark]
     * @return
     */
    public static Gson gsonReport () {
    	
    	return new GsonBuilder().setDateFormat(ConfigUtil.DATE_FORMAT).create();
    	
    }

}
