package org.jhipster.ballet.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.jhipster.ballet.domain.Ballerina;
import org.jhipster.ballet.repository.BallerinaRepository;
import org.jhipster.ballet.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link org.jhipster.ballet.domain.Ballerina}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BallerinaResource {

    private final Logger log = LoggerFactory.getLogger(BallerinaResource.class);

    private static final String ENTITY_NAME = "ballerina";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BallerinaRepository ballerinaRepository;

    public BallerinaResource(BallerinaRepository ballerinaRepository) {
        this.ballerinaRepository = ballerinaRepository;
    }

    /**
     * {@code POST  /ballerinas} : Create a new ballerina.
     *
     * @param ballerina the ballerina to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ballerina, or with status {@code 400 (Bad Request)} if the ballerina has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ballerinas")
    public ResponseEntity<Ballerina> createBallerina(@Valid @RequestBody Ballerina ballerina) throws URISyntaxException {
        log.debug("REST request to save Ballerina : {}", ballerina);
        if (ballerina.getId() != null) {
            throw new BadRequestAlertException("A new ballerina cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ballerina result = ballerinaRepository.save(ballerina);
        return ResponseEntity
            .created(new URI("/api/ballerinas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ballerinas/:id} : Updates an existing ballerina.
     *
     * @param id the id of the ballerina to save.
     * @param ballerina the ballerina to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ballerina,
     * or with status {@code 400 (Bad Request)} if the ballerina is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ballerina couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ballerinas/{id}")
    public ResponseEntity<Ballerina> updateBallerina(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Ballerina ballerina
    ) throws URISyntaxException {
        log.debug("REST request to update Ballerina : {}, {}", id, ballerina);
        if (ballerina.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ballerina.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ballerinaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Ballerina result = ballerinaRepository.save(ballerina);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ballerina.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /ballerinas/:id} : Partial updates given fields of an existing ballerina, field will ignore if it is null
     *
     * @param id the id of the ballerina to save.
     * @param ballerina the ballerina to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ballerina,
     * or with status {@code 400 (Bad Request)} if the ballerina is not valid,
     * or with status {@code 404 (Not Found)} if the ballerina is not found,
     * or with status {@code 500 (Internal Server Error)} if the ballerina couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/ballerinas/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Ballerina> partialUpdateBallerina(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Ballerina ballerina
    ) throws URISyntaxException {
        log.debug("REST request to partial update Ballerina partially : {}, {}", id, ballerina);
        if (ballerina.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ballerina.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ballerinaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Ballerina> result = ballerinaRepository
            .findById(ballerina.getId())
            .map(existingBallerina -> {
                if (ballerina.getFirstName() != null) {
                    existingBallerina.setFirstName(ballerina.getFirstName());
                }
                if (ballerina.getLastName() != null) {
                    existingBallerina.setLastName(ballerina.getLastName());
                }
                if (ballerina.getEmail() != null) {
                    existingBallerina.setEmail(ballerina.getEmail());
                }
                if (ballerina.getClassLevel() != null) {
                    existingBallerina.setClassLevel(ballerina.getClassLevel());
                }
                if (ballerina.getPointeShoeBrand() != null) {
                    existingBallerina.setPointeShoeBrand(ballerina.getPointeShoeBrand());
                }
                if (ballerina.getPointeShoeSize() != null) {
                    existingBallerina.setPointeShoeSize(ballerina.getPointeShoeSize());
                }

                return existingBallerina;
            })
            .map(ballerinaRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ballerina.getId().toString())
        );
    }

    /**
     * {@code GET  /ballerinas} : get all the ballerinas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ballerinas in body.
     */
    @GetMapping("/ballerinas")
    public List<Ballerina> getAllBallerinas() {
        log.debug("REST request to get all Ballerinas");
        return ballerinaRepository.findAll();
    }

    /**
     * {@code GET  /ballerinas/:id} : get the "id" ballerina.
     *
     * @param id the id of the ballerina to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ballerina, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ballerinas/{id}")
    public ResponseEntity<Ballerina> getBallerina(@PathVariable Long id) {
        log.debug("REST request to get Ballerina : {}", id);
        Optional<Ballerina> ballerina = ballerinaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ballerina);
    }

    /**
     * {@code DELETE  /ballerinas/:id} : delete the "id" ballerina.
     *
     * @param id the id of the ballerina to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ballerinas/{id}")
    public ResponseEntity<Void> deleteBallerina(@PathVariable Long id) {
        log.debug("REST request to delete Ballerina : {}", id);
        ballerinaRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
