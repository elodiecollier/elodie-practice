package org.jhipster.ballet.repository;

import org.jhipster.ballet.domain.Ballerina;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Ballerina entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BallerinaRepository extends JpaRepository<Ballerina, Long> {}
