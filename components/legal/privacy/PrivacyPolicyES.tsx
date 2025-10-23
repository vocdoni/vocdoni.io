import {
  LegalCompanyInfo,
  LegalHeader,
  LegalLastUpdated,
  LegalLink,
  LegalList,
  LegalListItem,
  LegalPageContainer,
  LegalParagraph,
  LegalSection,
  LegalSectionTitle,
  LegalSubsection,
  LegalSubsectionTitle,
  LegalTitle,
} from '@/components/ui/legal-document'

export function PrivacyPolicyES() {
  return (
    <LegalPageContainer>
      <LegalHeader>
        <LegalTitle>Política de Privacidad</LegalTitle>
        <LegalCompanyInfo>
          <p>
            <strong>Synergize SL</strong>
          </p>
          <p>Jaume I, 65 (Local Esquerra) - 08470 Sant Celoni (Barcelona) ESPAÑA</p>
          <p>
            E-mail: <LegalLink href='mailto:dpo@vocdoni.org'>dpo@vocdoni.org</LegalLink>
          </p>
        </LegalCompanyInfo>
      </LegalHeader>

      <LegalSection>
        <LegalSectionTitle>Política de Privacidad</LegalSectionTitle>
        <LegalParagraph>Operamos de acuerdo con los principios establecidos a continuación:</LegalParagraph>
        <LegalParagraph>
          Nos comprometemos a cumplir con las disposiciones legales sobre protección de datos y nos esforzamos por
          observar siempre los principios de evitación de datos y minimización de datos.
        </LegalParagraph>
      </LegalSection>

      <LegalSection>
        <LegalSectionTitle>1. El Responsable del Tratamiento</LegalSectionTitle>
        <LegalSubsection>
          <LegalSubsectionTitle>¿Quién es el responsable de tus datos personales?</LegalSubsectionTitle>
          <LegalParagraph>
            Synergize S.L. es el responsable del tratamiento de datos personales en cumplimiento del Reglamento (UE)
            2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD). Vocdoni App está diseñada y operada de acuerdo con los
            principios de legalidad, equidad, transparencia, minimización de datos e integridad, integrando la
            privacidad por diseño y por defecto.
          </LegalParagraph>
        </LegalSubsection>
      </LegalSection>

      <LegalSection>
        <LegalSectionTitle>2. ¿Con qué finalidad procesamos tus datos personales?</LegalSectionTitle>
        <LegalParagraph>
          Procesamos tus datos personales para operar la Vocdoni App (en adelante, la «APLICACIÓN»), que proporciona
          procesos de votación y participación seguros, verificables y que preservan la privacidad.
        </LegalParagraph>
        <LegalList>
          <LegalListItem>
            <strong>(a) Administradores:</strong> procesamos datos de identificación, contacto y autenticación para
            gestionar procesos de votación.
          </LegalListItem>
          <LegalListItem>
            <strong>(b) Votantes:</strong> procesamos credenciales o códigos de acceso proporcionados por su
            organización. Los votos se registran en la blockchain de Vocdoni utilizando mecanismos criptográficos que
            garantizan el anonimato.
          </LegalListItem>
          <LegalListItem>
            <strong>(c) Datos técnicos:</strong> el dispositivo, el navegador y la IP pueden procesarse para monitoreo
            de seguridad y análisis no identificables.
          </LegalListItem>
        </LegalList>
        <LegalParagraph>
          Todo el procesamiento sigue el principio de minimización de datos: solo se recopila la información
          estrictamente necesaria para operar el servicio. Los datos sensibles se almacenan de forma cifrada para
          mejorar la confidencialidad y la protección.
        </LegalParagraph>
      </LegalSection>

      <LegalSection>
        <LegalSectionTitle>3. ¿Por qué podemos procesar tus datos personales?</LegalSectionTitle>
        <LegalParagraph>El procesamiento de tus datos está legitimado sobre la base de:</LegalParagraph>
        <LegalList>
          <LegalListItem>Necesidad contractual (Art. 6(1)(b) RGPD)</LegalListItem>
          <LegalListItem>Consentimiento explícito (Art. 6(1)(a) RGPD) para funciones opcionales</LegalListItem>
          <LegalListItem>Interés legítimo (Art. 6(1)(f) RGPD) para seguridad y prevención de fraude</LegalListItem>
        </LegalList>
      </LegalSection>

      <LegalSection>
        <LegalSectionTitle>4. ¿Durante cuánto tiempo conservaremos tus datos personales?</LegalSectionTitle>
        <LegalList>
          <LegalListItem>
            Los datos de usuarios registrados (administradores) y los datos cargados por ellos (por ejemplo, listas de
            miembros) se conservarán mientras mantengan su cuenta y relación contractual con Synergize SL, y después
            durante los períodos de prescripción legal aplicables.
          </LegalListItem>
          <LegalListItem>
            Los datos de los votantes permanecen dentro de la base de datos de la lista de miembros de la organización y
            nunca se transfieren fuera de ella. Las credenciales se utilizan únicamente para generar una dirección que
            otorga el derecho a votar y que no está vinculada a ningún dato personal. Los datos de los miembros se
            conservarán mientras el administrador mantenga la lista de miembros o hasta que finalice la relación
            contractual con Synergize SL.
          </LegalListItem>
          <LegalListItem>
            Los votantes están ofuscados y almacenados en la blockchain de manera inmutable y permanente, sin ningún
            vínculo con datos personales.
          </LegalListItem>
        </LegalList>
        <LegalParagraph>
          Cuando los datos ya no sean necesarios para estos fines, se eliminarán con las medidas de seguridad apropiadas
          para una destrucción completa.
        </LegalParagraph>
      </LegalSection>

      <LegalSection>
        <LegalSectionTitle>5. ¿A quién divulgamos tus datos personales?</LegalSectionTitle>
        <LegalParagraph>Tus datos personales pueden divulgarse a:</LegalParagraph>
        <LegalList>
          <LegalListItem>
            <strong>Administraciones Públicas y autoridades</strong> cuando sea legalmente requerido.
          </LegalListItem>
          <LegalListItem>
            <strong>Proveedores de servicios</strong> que necesitan acceso a datos personales para prestar servicios a
            Synergize SL (por ejemplo, procesadores de pagos, análisis). Estos proveedores actúan como encargados del
            tratamiento bajo contratos que cumplen con el Artículo 28.3 RGPD.
          </LegalListItem>
        </LegalList>
        <LegalParagraph>
          <strong>Específicamente:</strong>
        </LegalParagraph>
        <LegalList>
          <LegalListItem>
            Dentro de la APLICACIÓN, los análisis se realizan utilizando <strong>Plausible</strong>, una plataforma de
            análisis que prioriza la privacidad, que no utiliza cookies y no recopila ni almacena información de
            identificación personal. Para más detalles, puedes revisar{' '}
            <LegalLink href='https://plausible.io/privacy'>plausible.io/privacy</LegalLink>.
          </LegalListItem>
          <LegalListItem>
            La página de inicio de vocdoni.app utiliza <strong>Google Analytics</strong> para el análisis del tráfico
            web. Los datos recopilados a través de esta herramienta se procesan de manera disociada (sin identificación
            personal) y se utilizan exclusivamente con fines estadísticos internos. La APLICACIÓN puede recopilar,
            almacenar o compilar cierta información no personal sobre su uso. Google Analytics se rige por los Términos
            y Condiciones Generales de Google{' '}
            <LegalLink href='http://www.google.com/analytics/terms/us.html'>
              google.com/analytics/terms/us.html
            </LegalLink>{' '}
            y la Política de Privacidad de Google{' '}
            <LegalLink href='https://policies.google.com/privacy?hl=es&gl=es'>policies.google.com/privacy</LegalLink>.
          </LegalListItem>
        </LegalList>
      </LegalSection>

      <LegalSection>
        <LegalSectionTitle>6. ¿Cuáles son tus derechos como usuario registrado?</LegalSectionTitle>
        <LegalParagraph>Tus derechos incluyen los siguientes, pero no se limitan a:</LegalParagraph>
        <LegalList>
          <LegalListItem>Derecho a solicitar información de acuerdo con el Art. 15 RGPD</LegalListItem>
          <LegalListItem>Derecho a solicitar rectificación según el Artículo 16 RGPD</LegalListItem>
          <LegalListItem>
            Derecho de supresión de tus datos personales, siempre que el procesamiento adicional no sea necesario por
            ninguna de las razones establecidas en el Art. 17 RGPD
          </LegalListItem>
          <LegalListItem>
            Derecho a solicitar la restricción del procesamiento de tus datos personales por cualquiera de las razones
            establecidas en el Art. 18 RGPD
          </LegalListItem>
          <LegalListItem>
            Derecho de transmisión de tus datos en un formato estructurado, de uso común y legible por máquina.
          </LegalListItem>
          <LegalListItem>
            Derecho a revocar tu consentimiento en cualquier momento de acuerdo con el Art. 7 (3) RGPD
          </LegalListItem>
          <LegalListItem>
            Derecho a presentar una queja ante la autoridad supervisora española (
            <LegalLink href='https://www.aepd.es'>www.aepd.es</LegalLink>) si consideras que el procesamiento no cumple
            con la legislación vigente.
          </LegalListItem>
        </LegalList>
        <LegalParagraph>
          <strong>Información de contacto para ejercer tus derechos:</strong>
        </LegalParagraph>
        <LegalParagraph>
          Synergize SL. Jaume I, 65 (Local Esquerra) - 08470 Sant Celoni (Barcelona).
          <br />
          E-mail: <LegalLink href='mailto:dpo@vocdoni.org'>dpo@vocdoni.org</LegalLink>
        </LegalParagraph>
        <LegalParagraph>Consulta nuestra política de privacidad / Consulta nuestra política de cookies</LegalParagraph>
      </LegalSection>

      <LegalSection>
        <LegalSectionTitle>7. MEDIDAS DE SEGURIDAD</LegalSectionTitle>
        <LegalParagraph>
          De acuerdo con las disposiciones de las regulaciones actuales sobre protección de datos personales, el
          RESPONSABLE cumple con todas las disposiciones de las regulaciones RGPD y LOPDGDD para el procesamiento de los
          datos personales de los que es responsable, y cumple manifiestamente con los principios descritos en el
          Artículo 5 del RGPD, por los cuales se procesan de manera lícita, justa y transparente en relación con el
          interesado y son apropiados, relevantes y limitados a lo necesario en relación con los fines para los que se
          procesan.
        </LegalParagraph>
        <LegalParagraph>
          Synergize SL garantiza que se han implementado políticas técnicas y organizativas apropiadas para aplicar las
          medidas de seguridad establecidas por RGPD y LOPDGDD con el fin de proteger los derechos y libertades de los
          usuarios.
        </LegalParagraph>
        <LegalList>
          <LegalListItem>
            Todas las comunicaciones entre la APLICACIÓN y los servidores están cifradas (HTTPS/TLS).
          </LegalListItem>
          <LegalListItem>
            Los datos sensibles (por ejemplo, credenciales de autenticación, listas de miembros) se almacenan de forma
            cifrada.
          </LegalListItem>
          <LegalListItem>
            El diseño de la APLICACIÓN minimiza la recopilación de datos personales, centrándose en los datos
            estrictamente necesarios para la funcionalidad.
          </LegalListItem>
          <LegalListItem>
            Los votos están anonimizados por diseño y registrados en la blockchain de Vocdoni sin ningún vínculo con la
            identidad del votante.
          </LegalListItem>
        </LegalList>
        <LegalParagraph>
          Esta Política de Privacidad fue publicada el 26 de septiembre de 2025 y es efectiva a partir de esa fecha.
          Para más información sobre las garantías de tu privacidad, puedes contactar a Synergize SL en{' '}
          <LegalLink href='mailto:legal@vocdoni.org'>legal@vocdoni.org</LegalLink>.
        </LegalParagraph>
      </LegalSection>

      <LegalSection>
        <LegalSectionTitle>8. Delegado de Protección de Datos (DPO)</LegalSectionTitle>
        <LegalParagraph>
          Synergize S.L. ha designado a <strong>4Dlegal S.L.</strong> como su Delegado de Protección de Datos (DPO) de
          acuerdo con los Artículos 37–39 del RGPD.
        </LegalParagraph>
        <LegalParagraph>
          Puedes contactar al DPO en <LegalLink href='mailto:dpo@vocdoni.org'>dpo@vocdoni.org</LegalLink> respecto a
          cualquier pregunta, preocupación o solicitud relacionada con el procesamiento de datos personales o el
          ejercicio de tus derechos de protección de datos.
        </LegalParagraph>
        <LegalParagraph>
          El DPO actúa de manera independiente y reporta a la alta dirección de Synergize.
        </LegalParagraph>
        <LegalParagraph>
          Todas las comunicaciones recibidas por el DPO se tratan de manera confidencial y se responderán en un plazo de
          un mes, prorrogable hasta dos meses adicionales si es necesario debido a la complejidad o el número de
          solicitudes.
        </LegalParagraph>
      </LegalSection>

      <LegalSection>
        <LegalSectionTitle>9. Actualizaciones de esta Política</LegalSectionTitle>
        <LegalParagraph>
          Esta Política de Privacidad se revisa periódicamente y cada vez que hay cambios legales, técnicos u
          organizativos relevantes que afectan el procesamiento de datos personales.
        </LegalParagraph>
        <LegalParagraph>
          Las actualizaciones materiales se comunicarán a través de la APLICACIÓN o por correo electrónico a los
          usuarios registrados y administradores.
        </LegalParagraph>
        <LegalParagraph>
          Cada versión de la Política incluirá su <strong>fecha de revisión</strong> y <strong>fecha efectiva</strong>.
        </LegalParagraph>
        <LegalLastUpdated>La versión actual fue revisada por última vez el 16 de octubre de 2025.</LegalLastUpdated>
      </LegalSection>
    </LegalPageContainer>
  )
}
