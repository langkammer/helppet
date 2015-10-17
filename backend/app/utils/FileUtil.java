package utils;

import org.apache.commons.io.FilenameUtils;

import java.io.File;
import java.util.ArrayList;
import java.util.List;


public class FileUtil {

    private static final long TAMANHO_MAX_ARQUIVO_5Mb = ConfigUtil.TAMANHO_ARQUIVO_5MB;

    private static FileUtil instance;

    public static FileUtil getInstance() {

        if (instance == null) {

            instance = new FileUtil();

        }

        return instance;
    }

    public static boolean validaTamanhoArquivo(File file){

        if(file.length() < TAMANHO_MAX_ARQUIVO_5Mb) {

            return true;

        }

        return false;

    }

    public static boolean validaExtensaoArquivo(File file) {

        List<String> extensoes = new ArrayList<String>();

        extensoes.add("png");
        extensoes.add("jpg");
        extensoes.add("jpeg");
        extensoes.add("pdf");

        if(extensoes.contains(FilenameUtils.getExtension(file.getPath()))) {

            return true;

        }

        return false;

    }

}
