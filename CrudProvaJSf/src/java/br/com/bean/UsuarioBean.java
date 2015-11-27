/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.bean;

import br.com.dao.UsuarioDao;
import br.com.dao.UsuarioImp;
import br.com.models.Usuario;
import java.awt.event.ActionEvent;
import java.util.List;
import javax.faces.bean.ManagedBean;
import javax.faces.model.DataModel;
import javax.faces.model.ListDataModel;
import javax.faces.view.ViewScoped;
/**
 *
 * @author Robson
 */
@ManagedBean
@ViewScoped
public class UsuarioBean {
    
    private Usuario usuario;
    private DataModel listaUsuario;
    
    public Usuario getUsuario(){
        return usuario;
    }
    public void setUsuario(Usuario usuario){
        this.usuario = usuario;
    }
    public DataModel getListarUsuarios() {
        List<Usuario> lista = new UsuarioImp().list();
        listaUsuario =  new ListDataModel(lista);
        return listaUsuario;
    }
    public void adicionarLivro(ActionEvent actionEvent){

        UsuarioDao dao = new UsuarioImp();
        dao.save(usuario);
        
    }
    public void prepararUsuario(ActionEvent actionEvent){
        usuario = new Usuario();
    }
    
    public String excluirUsuario(){

        Usuario userTemp = (Usuario)(listaUsuario.getRowData());
        UsuarioDao dao = new UsuarioImp();
        dao.remove(userTemp);
        return "index";

    }
    
    public void alterarUsuario(ActionEvent actionEvent){
        UsuarioImp dao = new UsuarioImp();
        dao.update(usuario);
    }
    
}

