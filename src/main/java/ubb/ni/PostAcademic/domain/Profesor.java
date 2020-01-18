package ubb.ni.PostAcademic.domain;

import javax.persistence.*;
import java.util.ArrayList;

@Entity
@Table(name = "profesori")
public class Profesor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @Column
    private String nume;
    @Column
    private String email;
    @Column
    private String website;
    @Column
    private String adresa;
    @Column
    private String telefon;
    @Column
    private String domeniiDeInteres;
    @OneToOne
    @JoinColumn
    private User user;
    @Column
    private Integer semestru;

    public Profesor(){

    }

    public Profesor(String nume, String email, String website, String adresa, String telefon, String domeniiDeInteres, User user, Integer semestru)
    {
        this.nume = nume;
        this.email = email;
        this.website = website;
        this.adresa = adresa;
        this.telefon = telefon;
        this.domeniiDeInteres = domeniiDeInteres;
        this.user = user;
        this.semestru = semestru;
    }

    public Long getId()
    {
        return id;
    }

    public void setId(Long id)
    {
        this.id = id;
    }

    public String getNume()
    {
        return nume;
    }

    public void setNume(String nume)
    {
        this.nume = nume;
    }

    public String getEmail()
    {
        return email;
    }

    public void setEmail(String email)
    {
        this.email = email;
    }

    public String getWebsite()
    {
        return website;
    }

    public void setWebsite(String website)
    {
        this.website = website;
    }

    public String getAdresa()
    {
        return adresa;
    }

    public void setAdresa(String adresa)
    {
        this.adresa = adresa;
    }

    public String getTelefon()
    {
        return telefon;
    }

    public void setTelefon(String telefon)
    {
        this.telefon = telefon;
    }

    public String getDomeniiDeInteres()
    {
        return domeniiDeInteres;
    }

    public void setDomeniiDeInteres(String domeniiDeInteres)
    {
        this.domeniiDeInteres = domeniiDeInteres;
    }

    public User getUser()
    {
        return user;
    }

    public void setUser(User user)
    {
        this.user = user;
    }

    public Integer getSemestru()
    {
        return semestru;
    }

    public void setSemestru(Integer semestru)
    {
        this.semestru = semestru;
    }
}