/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.dao;

import br.com.models.Pessoa;
import br.com.models.Usuario;
import java.util.List;

/**
 *
 * @author Robson
 */
public interface UsuarioDao {
    
    public void save(Usuario usuario);
    public Pessoa getUsuario(long id);
    public List<Usuario> list();
    public void remove(Usuario usuario);
    public void update(Usuario usuario);
    
}
