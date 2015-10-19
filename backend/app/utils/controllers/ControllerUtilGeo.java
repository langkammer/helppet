package utils.controllers;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.persistence.PersistenceException;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import com.google.gson.Gson;
import com.vividsolutions.jts.geom.Geometry;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;
import play.Logger;
import play.db.jpa.JPA;
import play.mvc.Catch;
import play.mvc.Controller;
import play.mvc.Http;
import utils.ConfigUtil;
import utils.GsonUtil;
import utils.transformer.GeometryTransformer;

public abstract class ControllerUtilGeo extends Controller {

	protected static Gson gson;

	static {

		gson = GsonUtil.gsonController();

	}


	protected static void renderError(Object ... erros){

		response.status = Http.StatusCode.INTERNAL_ERROR;

		renderJSON(erros);

	}

	protected static void renderJSON(Object model) {

		renderJSON(gson.toJson(model));

	}
	
	protected static void renderJSON(Object model, String... campos) {

		renderJSON(new JSONSerializer()
				.include(campos)
				.exclude("*")
				.transform(new DateTransformer(ConfigUtil.DATE_FORMAT), Date.class)
                .transform(new GeometryTransformer(), Geometry.class)
				.serialize(model));

	}


	@Catch(value = Exception.class, priority = 2)
	protected static void returnIfExceptionRaised(Throwable throwable) {

		JPA.setRollbackOnly();

		Logger.error(throwable.getMessage());

		if(throwable instanceof ConstraintViolationException) {

			List<String> erros = new ArrayList<String>();

			Iterator<ConstraintViolation<?>> iterator = ((ConstraintViolationException)throwable).getConstraintViolations().iterator();

			while(iterator.hasNext()){
				erros.add(iterator.next().getMessage());
			}

			renderError(erros.toArray());

		}

		if(throwable instanceof PersistenceException){

			renderError(throwable.getMessage());

		}

		if(throwable instanceof Exception) {

			renderError("error !!!!");

		}

	}

}
