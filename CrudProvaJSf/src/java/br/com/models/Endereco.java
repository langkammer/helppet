package br.com.models;
// Generated 27/11/2015 18:16:50 by Hibernate Tools 4.3.1


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 * Endereco generated by hbm2java
 */
@Entity
@Table(name = "endereco")
public class Endereco  implements java.io.Serializable {


     @Id
     @GeneratedValue(strategy = GenerationType.AUTO)
     private Long id;
     
     @Column(name = "rua")
     private String rua;
     
     @Column(name = "bairro")
     private String bairro;
     
     @Column(name = "telefone")
     private String telefone;

    public Endereco() {
    }

	
    public Endereco(Long id) {
        this.id = id;
    }
    public Endereco(Long id, String rua, String bairro, String telefone) {
       this.id = id;
       this.rua = rua;
       this.bairro = bairro;
       this.telefone = telefone;
    }
   
    public Long getIdEndereco() {
        return this.id;
    }
    
    public void setIdEndereco(Long id) {
        this.id = id;
    }
    public String getRua() {
        return this.rua;
    }
    
    public void setRua(String rua) {
        this.rua = rua;
    }
    public String getBairro() {
        return this.bairro;
    }
    
    public void setBairro(String bairro) {
        this.bairro = bairro;
    }
    public String getTelefone() {
        return this.telefone;
    }
    
    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }





}


