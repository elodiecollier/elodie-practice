package org.jhipster.ballet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.jhipster.ballet.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class BallerinaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ballerina.class);
        Ballerina ballerina1 = new Ballerina();
        ballerina1.setId(1L);
        Ballerina ballerina2 = new Ballerina();
        ballerina2.setId(ballerina1.getId());
        assertThat(ballerina1).isEqualTo(ballerina2);
        ballerina2.setId(2L);
        assertThat(ballerina1).isNotEqualTo(ballerina2);
        ballerina1.setId(null);
        assertThat(ballerina1).isNotEqualTo(ballerina2);
    }
}
