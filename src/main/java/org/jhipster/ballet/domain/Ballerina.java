package org.jhipster.ballet.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Ballerina.
 */
@Entity
@Table(name = "ballerina")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Ballerina implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @NotNull
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @NotNull
    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "class_level")
    private Integer classLevel;

    @Column(name = "pointe_shoe_brand")
    private String pointeShoeBrand;

    @Column(name = "pointe_shoe_size")
    private Integer pointeShoeSize;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Ballerina id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public Ballerina firstName(String firstName) {
        this.setFirstName(firstName);
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public Ballerina lastName(String lastName) {
        this.setLastName(lastName);
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return this.email;
    }

    public Ballerina email(String email) {
        this.setEmail(email);
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getClassLevel() {
        return this.classLevel;
    }

    public Ballerina classLevel(Integer classLevel) {
        this.setClassLevel(classLevel);
        return this;
    }

    public void setClassLevel(Integer classLevel) {
        this.classLevel = classLevel;
    }

    public String getPointeShoeBrand() {
        return this.pointeShoeBrand;
    }

    public Ballerina pointeShoeBrand(String pointeShoeBrand) {
        this.setPointeShoeBrand(pointeShoeBrand);
        return this;
    }

    public void setPointeShoeBrand(String pointeShoeBrand) {
        this.pointeShoeBrand = pointeShoeBrand;
    }

    public Integer getPointeShoeSize() {
        return this.pointeShoeSize;
    }

    public Ballerina pointeShoeSize(Integer pointeShoeSize) {
        this.setPointeShoeSize(pointeShoeSize);
        return this;
    }

    public void setPointeShoeSize(Integer pointeShoeSize) {
        this.pointeShoeSize = pointeShoeSize;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Ballerina)) {
            return false;
        }
        return id != null && id.equals(((Ballerina) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Ballerina{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", email='" + getEmail() + "'" +
            ", classLevel=" + getClassLevel() +
            ", pointeShoeBrand='" + getPointeShoeBrand() + "'" +
            ", pointeShoeSize=" + getPointeShoeSize() +
            "}";
    }
}
