package utils;


import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * Classe util para manipulação de datas.
 *
 * @author Gabriel Borges
 */
public class DateUtil {

	/**
	 * Método overloaded para renderizar um objeto como json usando o envelope definido.
	 *
	 * @param data - data.
	 * @param format - formato que será aplicado na data.
	 * @return String contendo a data formatada.
	 */
	public static String dateFormat(Date data, String format) {

		SimpleDateFormat sdf = new SimpleDateFormat(format);

		return sdf.format(data);
	}



	public Calendar dateToCalendar(Date date) {

		Calendar cal = Calendar.getInstance();

		cal.setTime(date);

		return cal;

	}

}
