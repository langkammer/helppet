package controllers;


import models.base.MunicipioModel;
import utils.ControllerUtil;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Robson on 04/12/2015.
 */
public class TesteController extends ControllerUtil {


	public static void gerarDados1() {

//
//		try{
//			List<MunicipioModel> listaMunicipios = MunicipioModel.findAll();
//			for(MunicipioModel municipio : listaMunicipios){
//				if(municipio.lat == null && municipio.lng == null){
//					List<String> LatLng = buscaLatLng(municipio.nome.toUpperCase(),municipio.uf.toUpperCase());
//					municipio.lng = LatLng.get(0);
//					municipio.lat = LatLng.get(1);
//				}
//
//			}
//
//		}
//		catch (Exception e){
//			System.out.println("ERRO " + e);
//		}

	}

	public static void gerarDados(){

		try{
			String arquivo = "C:\\Users\\Robson\\Desktop\\cidados_lat_lng.csv";
			File file = new File(arquivo);
			BufferedReader br = new BufferedReader(new FileReader(arquivo));
			StringBuilder bufSaida = new StringBuilder();

			String linha;

			List<String> LngLat = new ArrayList<String>();
			int i = 0;
			while( (linha = br.readLine()) != null ){
				i++;
//				System.out.println(linha);
//				if(prefeituraModel!=null){
//				System.out.println("uf " +linha.split(";")[0] + " municipio " +linha.split(";")[1] + " longitude " +linha.split(";")[2]+" latitude " + linha.split(";")[3]);

				MunicipioModel municipio = MunicipioModel.find("uf =:uf And nome Like :cidade").setParameter("uf", linha.split(";")[0].toUpperCase()).setParameter("cidade","%"+linha.split(";")[1]+"%").first();
				if(municipio!=null){
					if(municipio.lat == null && municipio.lng ==null){
						System.out.println(i+ " "+municipio.nome);
						municipio.lat = linha.split(";")[3];
						municipio.lng = linha.split(";")[2];
						municipio.save();

					}
				}

//				if(uf.equals(linha.split(";")[0].toUpperCase()) && cidade.equals(linha.split(";")[1].toUpperCase())){
//					LngLat.set(0,linha.split(";")[2]);
//					LngLat.set(1,linha.split(";")[3]);
//
//				}

//					System.out.println("municipio\n " +linha.split(";")[1]);
//					System.out.println("longitude\n " +linha.split(";")[2]);
//					System.out.println("latitude\n " + linha.split(";")[3]);

//				}




			}

			br.close();

		}
		catch (Exception e){
			System.out.println("ERRO " + e);
		}

	}
}
