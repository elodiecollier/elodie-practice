package org.jhipster.ballet.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.jhipster.ballet.IntegrationTest;
import org.jhipster.ballet.domain.Ballerina;
import org.jhipster.ballet.repository.BallerinaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link BallerinaResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class BallerinaResourceIT {

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final Integer DEFAULT_CLASS_LEVEL = 1;
    private static final Integer UPDATED_CLASS_LEVEL = 2;

    private static final String DEFAULT_POINTE_SHOE_BRAND = "AAAAAAAAAA";
    private static final String UPDATED_POINTE_SHOE_BRAND = "BBBBBBBBBB";

    private static final Integer DEFAULT_POINTE_SHOE_SIZE = 1;
    private static final Integer UPDATED_POINTE_SHOE_SIZE = 2;

    private static final String ENTITY_API_URL = "/api/ballerinas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private BallerinaRepository ballerinaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBallerinaMockMvc;

    private Ballerina ballerina;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ballerina createEntity(EntityManager em) {
        Ballerina ballerina = new Ballerina()
            .firstName(DEFAULT_FIRST_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .email(DEFAULT_EMAIL)
            .classLevel(DEFAULT_CLASS_LEVEL)
            .pointeShoeBrand(DEFAULT_POINTE_SHOE_BRAND)
            .pointeShoeSize(DEFAULT_POINTE_SHOE_SIZE);
        return ballerina;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ballerina createUpdatedEntity(EntityManager em) {
        Ballerina ballerina = new Ballerina()
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .email(UPDATED_EMAIL)
            .classLevel(UPDATED_CLASS_LEVEL)
            .pointeShoeBrand(UPDATED_POINTE_SHOE_BRAND)
            .pointeShoeSize(UPDATED_POINTE_SHOE_SIZE);
        return ballerina;
    }

    @BeforeEach
    public void initTest() {
        ballerina = createEntity(em);
    }

    @Test
    @Transactional
    void createBallerina() throws Exception {
        int databaseSizeBeforeCreate = ballerinaRepository.findAll().size();
        // Create the Ballerina
        restBallerinaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ballerina)))
            .andExpect(status().isCreated());

        // Validate the Ballerina in the database
        List<Ballerina> ballerinaList = ballerinaRepository.findAll();
        assertThat(ballerinaList).hasSize(databaseSizeBeforeCreate + 1);
        Ballerina testBallerina = ballerinaList.get(ballerinaList.size() - 1);
        assertThat(testBallerina.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testBallerina.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testBallerina.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testBallerina.getClassLevel()).isEqualTo(DEFAULT_CLASS_LEVEL);
        assertThat(testBallerina.getPointeShoeBrand()).isEqualTo(DEFAULT_POINTE_SHOE_BRAND);
        assertThat(testBallerina.getPointeShoeSize()).isEqualTo(DEFAULT_POINTE_SHOE_SIZE);
    }

    @Test
    @Transactional
    void createBallerinaWithExistingId() throws Exception {
        // Create the Ballerina with an existing ID
        ballerina.setId(1L);

        int databaseSizeBeforeCreate = ballerinaRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restBallerinaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ballerina)))
            .andExpect(status().isBadRequest());

        // Validate the Ballerina in the database
        List<Ballerina> ballerinaList = ballerinaRepository.findAll();
        assertThat(ballerinaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkFirstNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = ballerinaRepository.findAll().size();
        // set the field null
        ballerina.setFirstName(null);

        // Create the Ballerina, which fails.

        restBallerinaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ballerina)))
            .andExpect(status().isBadRequest());

        List<Ballerina> ballerinaList = ballerinaRepository.findAll();
        assertThat(ballerinaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkLastNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = ballerinaRepository.findAll().size();
        // set the field null
        ballerina.setLastName(null);

        // Create the Ballerina, which fails.

        restBallerinaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ballerina)))
            .andExpect(status().isBadRequest());

        List<Ballerina> ballerinaList = ballerinaRepository.findAll();
        assertThat(ballerinaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = ballerinaRepository.findAll().size();
        // set the field null
        ballerina.setEmail(null);

        // Create the Ballerina, which fails.

        restBallerinaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ballerina)))
            .andExpect(status().isBadRequest());

        List<Ballerina> ballerinaList = ballerinaRepository.findAll();
        assertThat(ballerinaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllBallerinas() throws Exception {
        // Initialize the database
        ballerinaRepository.saveAndFlush(ballerina);

        // Get all the ballerinaList
        restBallerinaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ballerina.getId().intValue())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME)))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].classLevel").value(hasItem(DEFAULT_CLASS_LEVEL)))
            .andExpect(jsonPath("$.[*].pointeShoeBrand").value(hasItem(DEFAULT_POINTE_SHOE_BRAND)))
            .andExpect(jsonPath("$.[*].pointeShoeSize").value(hasItem(DEFAULT_POINTE_SHOE_SIZE)));
    }

    @Test
    @Transactional
    void getBallerina() throws Exception {
        // Initialize the database
        ballerinaRepository.saveAndFlush(ballerina);

        // Get the ballerina
        restBallerinaMockMvc
            .perform(get(ENTITY_API_URL_ID, ballerina.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ballerina.getId().intValue()))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.classLevel").value(DEFAULT_CLASS_LEVEL))
            .andExpect(jsonPath("$.pointeShoeBrand").value(DEFAULT_POINTE_SHOE_BRAND))
            .andExpect(jsonPath("$.pointeShoeSize").value(DEFAULT_POINTE_SHOE_SIZE));
    }

    @Test
    @Transactional
    void getNonExistingBallerina() throws Exception {
        // Get the ballerina
        restBallerinaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingBallerina() throws Exception {
        // Initialize the database
        ballerinaRepository.saveAndFlush(ballerina);

        int databaseSizeBeforeUpdate = ballerinaRepository.findAll().size();

        // Update the ballerina
        Ballerina updatedBallerina = ballerinaRepository.findById(ballerina.getId()).get();
        // Disconnect from session so that the updates on updatedBallerina are not directly saved in db
        em.detach(updatedBallerina);
        updatedBallerina
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .email(UPDATED_EMAIL)
            .classLevel(UPDATED_CLASS_LEVEL)
            .pointeShoeBrand(UPDATED_POINTE_SHOE_BRAND)
            .pointeShoeSize(UPDATED_POINTE_SHOE_SIZE);

        restBallerinaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedBallerina.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedBallerina))
            )
            .andExpect(status().isOk());

        // Validate the Ballerina in the database
        List<Ballerina> ballerinaList = ballerinaRepository.findAll();
        assertThat(ballerinaList).hasSize(databaseSizeBeforeUpdate);
        Ballerina testBallerina = ballerinaList.get(ballerinaList.size() - 1);
        assertThat(testBallerina.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testBallerina.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testBallerina.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testBallerina.getClassLevel()).isEqualTo(UPDATED_CLASS_LEVEL);
        assertThat(testBallerina.getPointeShoeBrand()).isEqualTo(UPDATED_POINTE_SHOE_BRAND);
        assertThat(testBallerina.getPointeShoeSize()).isEqualTo(UPDATED_POINTE_SHOE_SIZE);
    }

    @Test
    @Transactional
    void putNonExistingBallerina() throws Exception {
        int databaseSizeBeforeUpdate = ballerinaRepository.findAll().size();
        ballerina.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBallerinaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, ballerina.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ballerina))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ballerina in the database
        List<Ballerina> ballerinaList = ballerinaRepository.findAll();
        assertThat(ballerinaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchBallerina() throws Exception {
        int databaseSizeBeforeUpdate = ballerinaRepository.findAll().size();
        ballerina.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBallerinaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ballerina))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ballerina in the database
        List<Ballerina> ballerinaList = ballerinaRepository.findAll();
        assertThat(ballerinaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamBallerina() throws Exception {
        int databaseSizeBeforeUpdate = ballerinaRepository.findAll().size();
        ballerina.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBallerinaMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ballerina)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Ballerina in the database
        List<Ballerina> ballerinaList = ballerinaRepository.findAll();
        assertThat(ballerinaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateBallerinaWithPatch() throws Exception {
        // Initialize the database
        ballerinaRepository.saveAndFlush(ballerina);

        int databaseSizeBeforeUpdate = ballerinaRepository.findAll().size();

        // Update the ballerina using partial update
        Ballerina partialUpdatedBallerina = new Ballerina();
        partialUpdatedBallerina.setId(ballerina.getId());

        partialUpdatedBallerina.email(UPDATED_EMAIL);

        restBallerinaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBallerina.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedBallerina))
            )
            .andExpect(status().isOk());

        // Validate the Ballerina in the database
        List<Ballerina> ballerinaList = ballerinaRepository.findAll();
        assertThat(ballerinaList).hasSize(databaseSizeBeforeUpdate);
        Ballerina testBallerina = ballerinaList.get(ballerinaList.size() - 1);
        assertThat(testBallerina.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testBallerina.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testBallerina.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testBallerina.getClassLevel()).isEqualTo(DEFAULT_CLASS_LEVEL);
        assertThat(testBallerina.getPointeShoeBrand()).isEqualTo(DEFAULT_POINTE_SHOE_BRAND);
        assertThat(testBallerina.getPointeShoeSize()).isEqualTo(DEFAULT_POINTE_SHOE_SIZE);
    }

    @Test
    @Transactional
    void fullUpdateBallerinaWithPatch() throws Exception {
        // Initialize the database
        ballerinaRepository.saveAndFlush(ballerina);

        int databaseSizeBeforeUpdate = ballerinaRepository.findAll().size();

        // Update the ballerina using partial update
        Ballerina partialUpdatedBallerina = new Ballerina();
        partialUpdatedBallerina.setId(ballerina.getId());

        partialUpdatedBallerina
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .email(UPDATED_EMAIL)
            .classLevel(UPDATED_CLASS_LEVEL)
            .pointeShoeBrand(UPDATED_POINTE_SHOE_BRAND)
            .pointeShoeSize(UPDATED_POINTE_SHOE_SIZE);

        restBallerinaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBallerina.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedBallerina))
            )
            .andExpect(status().isOk());

        // Validate the Ballerina in the database
        List<Ballerina> ballerinaList = ballerinaRepository.findAll();
        assertThat(ballerinaList).hasSize(databaseSizeBeforeUpdate);
        Ballerina testBallerina = ballerinaList.get(ballerinaList.size() - 1);
        assertThat(testBallerina.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testBallerina.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testBallerina.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testBallerina.getClassLevel()).isEqualTo(UPDATED_CLASS_LEVEL);
        assertThat(testBallerina.getPointeShoeBrand()).isEqualTo(UPDATED_POINTE_SHOE_BRAND);
        assertThat(testBallerina.getPointeShoeSize()).isEqualTo(UPDATED_POINTE_SHOE_SIZE);
    }

    @Test
    @Transactional
    void patchNonExistingBallerina() throws Exception {
        int databaseSizeBeforeUpdate = ballerinaRepository.findAll().size();
        ballerina.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBallerinaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, ballerina.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ballerina))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ballerina in the database
        List<Ballerina> ballerinaList = ballerinaRepository.findAll();
        assertThat(ballerinaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchBallerina() throws Exception {
        int databaseSizeBeforeUpdate = ballerinaRepository.findAll().size();
        ballerina.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBallerinaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ballerina))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ballerina in the database
        List<Ballerina> ballerinaList = ballerinaRepository.findAll();
        assertThat(ballerinaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamBallerina() throws Exception {
        int databaseSizeBeforeUpdate = ballerinaRepository.findAll().size();
        ballerina.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBallerinaMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(ballerina))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Ballerina in the database
        List<Ballerina> ballerinaList = ballerinaRepository.findAll();
        assertThat(ballerinaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteBallerina() throws Exception {
        // Initialize the database
        ballerinaRepository.saveAndFlush(ballerina);

        int databaseSizeBeforeDelete = ballerinaRepository.findAll().size();

        // Delete the ballerina
        restBallerinaMockMvc
            .perform(delete(ENTITY_API_URL_ID, ballerina.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Ballerina> ballerinaList = ballerinaRepository.findAll();
        assertThat(ballerinaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
