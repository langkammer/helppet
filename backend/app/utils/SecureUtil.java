package utils;


import java.util.Calendar;
import java.util.UUID;

public class SecureUtil {


	//regra de geração de chave


	public String chaveBloqueio(){
		StringBuilder sb = new StringBuilder();
		sb.append(UUID.randomUUID().toString().substring(0,7));
		sb.append( Calendar.getInstance().get(Calendar.DAY_OF_MONTH));
		sb.append(UUID.randomUUID().toString().substring(0, 7));
		sb.append( Calendar.getInstance().get(Calendar.HOUR));
		sb.append(UUID.randomUUID().toString().substring(0,7));
		sb.append( Calendar.getInstance().get(Calendar.MINUTE));
		sb.append(UUID.randomUUID().toString().substring(0,7));
		sb.append(Calendar.getInstance().get(Calendar.MILLISECOND));
		sb.append(UUID.randomUUID().toString().substring(0, 7));

		return sb.toString();
	}


}
