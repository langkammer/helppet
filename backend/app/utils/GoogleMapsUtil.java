package utils;

import com.google.code.geocoder.Geocoder;
import com.google.code.geocoder.GeocoderRequestBuilder;
import com.google.code.geocoder.model.GeocodeResponse;
import com.google.code.geocoder.model.GeocoderAddressComponent;
import com.google.code.geocoder.model.GeocoderRequest;
import com.google.code.geocoder.model.GeocoderResult;
import models.base.MunicipioModel;
import models.bean.PontoBean;
import play.Logger;

import java.io.IOException;
import java.util.List;

public class GoogleMapsUtil {
	
//
//	public static List<BairroColetaModel> consultarEndereco(String endereco) {
//		try {
//
//
//			GeocoderRequest geocoderRequest = new GeocoderRequestBuilder()
//					.setAddress(endereco).setLanguage("br")
//					.getGeocoderRequest();
//
//			GeocodeResponse geocoderResponse;
//
//			geocoderResponse = new Geocoder().geocode(geocoderRequest);
//
//			// lista de resultados de endereço começa com 0
//
//			EnderecoColetaModel enderecoColeta;
//			LogradouroColetaModel logradouroColeta;
//			List<LogradouroColetaModel> logradouroColetaList;
//			List<EnderecoColetaModel> listaEndereco;
//			List<BairroColetaModel> bairroColetas = new ArrayList<BairroColetaModel>();
//			BairroColetaModel bairroColeta;
//			UfModel ufModel;
//			MunicipioModel municipioModel;
//
//			// int i = 0;
//			for (GeocoderResult geoResponse : geocoderResponse.getResults()) {
//				bairroColeta = new BairroColetaModel();
//				logradouroColeta = new LogradouroColetaModel();
//				enderecoColeta = new EnderecoColetaModel();
//				municipioModel = new MunicipioModel();
//				ufModel = new UfModel();
//				listaEndereco = new ArrayList<EnderecoColetaModel>();
//				logradouroColetaList = new ArrayList<LogradouroColetaModel>();
//
//				for (GeocoderAddressComponent addressComponent : geoResponse
//						.getAddressComponents()) {
//
//					if (addressComponent.getTypes().toString()
//							.equals("[route]")) {
//						// RUA
//						logradouroColeta.nome = addressComponent.getLongName();
//
//					}
//					if (addressComponent.getTypes().toString()
//							.equals("[neighborhood, political]")) {
//						// BAIRRO
//
//						bairroColeta.nome = addressComponent.getLongName();
//					}
//					if (addressComponent.getTypes().toString()
//							.equals("[locality, political]")) {
//						municipioModel.nome = addressComponent.getLongName();
//					}
//
//					if (addressComponent.getTypes().toString()
//							.equals("[administrative_area_level_1, political]")) {
//
//						// CIDADE
//						ufModel.nome = addressComponent.getLongName();
//						ufModel.sigla = addressComponent.getShortName();
//						municipioModel.uf = ufModel;
//
//					}
//
//					if (addressComponent.getTypes().toString()
//							.equals("[postal_code]")) {
//						enderecoColeta.cep = addressComponent.getLongName();
//					}
//
//				}
//				listaEndereco.add(enderecoColeta);
//				logradouroColeta.enderecoColeta = listaEndereco;
//				logradouroColetaList.add(logradouroColeta);
//				bairroColeta.logradouros = logradouroColetaList;
//				bairroColeta.municipio = municipioModel;
//				bairroColetas.add(bairroColeta);
//
//			}
//			return bairroColetas;
//
//		} catch (IOException e) {
//
//			Logger.error(e, "[UrbGTException] >>> HASH: " + e.hashCode());
//
//			return null;
//		}
//
//	}

		public static MunicipioModel consultaCidade(MunicipioModel cidade) {
		try {


			GeocoderRequest geocoderRequest = new GeocoderRequestBuilder()
					.setAddress(cidade.nome)
					.setRegion(cidade.uf)
					.setLanguage("br")
					.getGeocoderRequest();

			GeocodeResponse geocoderResponse;
			geocoderResponse = new Geocoder().geocode(geocoderRequest);

			// lista de resultados de endereço começa com 0

			// int i = 0;
			for (GeocoderResult geoResponse : geocoderResponse.getResults()) {

				for (GeocoderAddressComponent addressComponent : geoResponse
						.getAddressComponents()) {

					if (geoResponse.getGeometry()!=null) {


						// CIDADE
						if(addressComponent.getShortName().equals(cidade.uf)){
							System.out.println(cidade.nome);
							cidade.lat = geoResponse.getGeometry().getLocation().getLat().toString();
							cidade.lng = geoResponse.getGeometry().getLocation().getLng().toString();

							return cidade.save();
						}




					}

				}

			}
			return null;
		} catch (IOException e) {

			Logger.error(e, "[HELP-PET] >>> HASH: " + e.hashCode());

			return null;
		}

	}

	public static List<PontoBean> consultarGeolocalizacao(String endereco,String uf) {

		try {
			GeocoderRequest geocoderRequest = new GeocoderRequestBuilder()
					.setAddress(endereco)
					.setRegion(uf)
					.setLanguage("br")
					.getGeocoderRequest();

			GeocodeResponse geocoderResponse;

			geocoderResponse = new Geocoder().geocode(geocoderRequest);

			List<PontoBean> listaPontos = null;
			PontoBean pontoBean;


			for (GeocoderResult geoResult : geocoderResponse.getResults()) {

				pontoBean = new PontoBean();

				for (GeocoderAddressComponent addressComponent : geoResult.getAddressComponents()) {

					if (geoResult.getGeometry() != null) {
						if (addressComponent.getShortName().equals(uf)) {
							if (addressComponent.getTypes().toString().equals("[route]")) {
								pontoBean.endereco = addressComponent.getLongName();
								pontoBean.lat = geoResult.getGeometry().getLocation().getLat().toString();
								pontoBean.lng = geoResult.getGeometry().getLocation().getLng().toString();
							}


						}

					}

					listaPontos.add(pontoBean);

				}

			}

			return listaPontos;
		}
		catch(Exception e){
			Logger.error(e, "[HELP-PET] >>> HASH: " + e.hashCode());
			return  null;

		}
	}
//
//	public static List<BairroColetaModel> consultarPonto(String latitude,
//			String longitude) {
//
//
//		LatLng latLng = new LatLng(new BigDecimal(latitude), new BigDecimal(longitude));
//
//		GeocoderRequest geocoderRequest = new GeocoderRequestBuilder()
//				.setLocation(latLng).setLanguage("br").getGeocoderRequest();
//
//		try {
//
//			GeocodeResponse geocoderResponse = new Geocoder()
//					.geocode(geocoderRequest);
//
//			EnderecoColetaModel enderecoColeta;
//
//			LogradouroColetaModel logradouroColeta;
//
//			BairroColetaModel bairroColeta;
//
//			UfModel ufModel;
//
//			MunicipioModel municipioModel;
//
//			List<LogradouroColetaModel> logradouroColetaList;
//
//			List<EnderecoColetaModel> listaEndereco;
//
//			List<BairroColetaModel> bairroColetas = new ArrayList<BairroColetaModel>();
//
//
//			GeocoderResult geoResponse = geocoderResponse.getResults().get(0);
//			bairroColeta = new BairroColetaModel();
//			logradouroColeta = new LogradouroColetaModel();
//			enderecoColeta = new EnderecoColetaModel();
//			municipioModel = new MunicipioModel();
//			ufModel = new UfModel();
//			listaEndereco = new ArrayList<EnderecoColetaModel>();
//			logradouroColetaList = new ArrayList<LogradouroColetaModel>();
//
//			for (GeocoderAddressComponent addressComponent : geoResponse
//					.getAddressComponents()) {
//
//				if (addressComponent.getTypes().toString()
//						.equals("[street_number]")) {
//					enderecoColeta.numero = addressComponent.getLongName();
//
//				}
//				if (addressComponent.getTypes().toString().equals("[route]")) {
//					logradouroColeta.nome = addressComponent.getLongName();
//				}
//				if (addressComponent.getTypes().toString()
//						.equals("[neighborhood, political]")) {
//					bairroColeta.nome = addressComponent.getLongName();
//				}
//				if (addressComponent.getTypes().toString()
//						.equals("[locality, political]")) {
//					municipioModel.nome = addressComponent.getLongName();
//				}
//				if (addressComponent.getTypes().toString()
//						.equals("[administrative_area_level_2, political]")) {
//
//				}
//				if (addressComponent.getTypes().toString()
//						.equals("[administrative_area_level_1, political]")) {
//					ufModel.nome = addressComponent.getLongName();
//					ufModel.sigla = addressComponent.getShortName();
//					municipioModel.uf = ufModel;
//
//				}
//				if (addressComponent.getTypes().toString()
//						.equals("[country, political]")) {
//
//				}
//				if (addressComponent.getTypes().toString()
//						.equals("[postal_code]")) {
//					enderecoColeta.cep = addressComponent.getLongName();
//				}
//
//			}
//			listaEndereco.add(enderecoColeta);
//			logradouroColeta.enderecoColeta = listaEndereco;
//			logradouroColetaList.add(logradouroColeta);
//			bairroColeta.logradouros = logradouroColetaList;
//			bairroColeta.municipio = municipioModel;
//			bairroColetas.add(bairroColeta);
//
//			return bairroColetas;
//
//		} catch (IOException e) {
//
//			Logger.error(e, "[UrbGTException] >>> HASH: " + e.hashCode());
//
//			return null;
//
//		}
//
//	}

	
}
