import {
  LegalCompanyInfo,
  LegalHeader,
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
  LegalLastUpdated,
} from '@/components/ui/legal-document'

export function TermsES() {
  return (
    <LegalPageContainer>
      <LegalHeader>
        <LegalTitle>Vocdoni App - Términos y Condiciones de Uso</LegalTitle>
        <LegalCompanyInfo>
          <p>
            <strong>Synergize SL</strong>
          </p>
          <p>Jaume I, 65 (Local Esquerra) - 08470 Sant Celoni (Barcelona) ESPAÑA</p>
          <p>
            Synergize S.L. ha designado a 4Dlegal S.L. como su Delegado de Protección de Datos (DPO). Puedes contactar
            al DPO en <LegalLink href='mailto:dpo@vocdoni.org'>dpo@vocdoni.org</LegalLink> para cualquier pregunta sobre
            protección de datos.
          </p>
        </LegalCompanyInfo>
      </LegalHeader>

      <LegalSection>
        <LegalSectionTitle>TÉRMINOS Y CONDICIONES DE USO DE LA APLICACIÓN</LegalSectionTitle>
        <LegalParagraph>
          Estos Términos y Condiciones rigen el acceso y uso de la aplicación web Vocdoni App (en adelante, la
          «APLICACIÓN»), que Synergize SL pone a disposición de los usuarios. El usuario adquiere esta condición al
          acceder y utilizarla.
        </LegalParagraph>
        <LegalParagraph>
          Esta versión de la APLICACIÓN está disponible a través del sitio web oficial de Vocdoni. El usuario reconoce y
          acepta cumplir con todos los términos y condiciones aplicables con respecto al acceso y uso de la APLICACIÓN.
        </LegalParagraph>
        <LegalParagraph>
          Acceder a la APLICACIÓN implica que el usuario reconoce que ha aceptado y consentido sin reservas estas
          condiciones de uso.
        </LegalParagraph>
      </LegalSection>

      <LegalSection>
        <LegalSectionTitle>1. PROPÓSITO</LegalSectionTitle>
        <LegalParagraph>
          El propósito de la APLICACIÓN es proporcionar una plataforma digital de votación y participación que permita a
          organizaciones, asociaciones y comunidades llevar a cabo procesos de votación seguros, verificables y que
          preserven la privacidad, y gestionar su base de miembros para configurar censos.
        </LegalParagraph>
        <LegalParagraph>
          Algunos de los grupos que pueden beneficiarse de este proyecto son{' '}
          <strong>
            organizaciones sin fines de lucro, cooperativas, asociaciones, grupos comunitarios, ayuntamientos y otras
            entidades que necesitan mecanismos de toma de decisiones transparentes y confiables
          </strong>
          . El diseño y desarrollo de esta APLICACIÓN ha involucrado a especialistas profesionales así como a un grupo
          de usuarios que participaron en el período de prueba.
        </LegalParagraph>
        <LegalParagraph>
          Es compatible con navegadores basados en Chromium (p. ej., Google Chrome, Microsoft Edge, Brave), WebKit (p.
          ej., Safari) y Gecko (p. ej., Mozilla Firefox), y también puede ser compatible con otros navegadores web
          modernos, aunque no se puede garantizar dicha compatibilidad.
        </LegalParagraph>
      </LegalSection>

      <LegalSection>
        <LegalSectionTitle>2. CARACTERÍSTICAS</LegalSectionTitle>
        <LegalParagraph>
          La APLICACIÓN proporciona diferentes funcionalidades según el tipo de usuario:
        </LegalParagraph>
        <LegalSubsection>
          <LegalSubsectionTitle>Para usuarios votantes (no registrados):</LegalSubsectionTitle>
          <LegalList variant='none'>
            <LegalListItem>
              ○ Acceder a un proceso de votación con credenciales o un enlace proporcionado por su organización.
            </LegalListItem>
            <LegalListItem>○ Emitir un voto de forma segura.</LegalListItem>
            <LegalListItem>
              ○ No se crea una cuenta persistente para estos usuarios; solo se procesan los datos mínimos requeridos
              para verificar la elegibilidad para votar.
            </LegalListItem>
          </LegalList>
        </LegalSubsection>
        <LegalSubsection>
          <LegalSubsectionTitle>Para usuarios registrados (administradores):</LegalSubsectionTitle>
          <LegalList variant='none'>
            <LegalListItem>○ Crear y configurar procesos de votación en nombre de su organización.</LegalListItem>
            <LegalListItem>
              ○ Cargar y gestionar listas de miembros, que pueden incluir información personal de los miembros de la
              organización (que también son votantes potenciales).
            </LegalListItem>
            <LegalListItem>○ Gestionar credenciales y distribuirlas a votantes elegibles.</LegalListItem>
            <LegalListItem>
              ○ Acceder a funciones avanzadas para monitorear y gestionar procesos de votación.
            </LegalListItem>
          </LegalList>
        </LegalSubsection>
        <LegalParagraph>
          La APLICACIÓN procesa los datos solo cuando se ejecuta en primer plano y cuando es iniciada por la acción del
          usuario.
        </LegalParagraph>
      </LegalSection>

      <LegalSection>
        <LegalSectionTitle>3. DERECHOS DE PROPIEDAD INTELECTUAL E INDUSTRIAL</LegalSectionTitle>
        <LegalParagraph>
          Los derechos de propiedad intelectual e industrial sobre la APLICACIÓN son propiedad de Synergize SL,
          correspondiendo el ejercicio exclusivo de los derechos de uso por ellos en cualquier forma y, en particular,
          los derechos de reproducción, distribución, comunicación pública y modificación.
        </LegalParagraph>
        <LegalParagraph>
          Los titulares de terceros de derechos de propiedad intelectual e industrial sobre fotografías, logotipos y
          cualquier otro símbolo o contenido incluido en la APLICACIÓN han otorgado la autorización correspondiente para
          su reproducción, distribución y disponibilidad al público.
        </LegalParagraph>
        <LegalParagraph>
          El usuario reconoce que la reproducción, modificación, distribución, comercialización, descompilación,
          desensamblaje, ingeniería inversa o cualquier otro medio para obtener el código fuente, transformación o
          publicación de cualquier resultado de prueba de referencia no autorizado de cualquiera de los elementos y
          utilidades integrados dentro de la secuencia de operaciones constituye una violación de los derechos de
          propiedad intelectual de Synergize SL, y por lo tanto se compromete a abstenerse de realizar cualquiera de las
          acciones antes mencionadas.
        </LegalParagraph>
      </LegalSection>

      <LegalSection>
        <LegalSectionTitle>
          4. NATURALEZA OBLIGATORIA U OPCIONAL DE LA INFORMACIÓN PROPORCIONADA POR EL USUARIO
        </LegalSectionTitle>
        <LegalParagraph>
          Los usuarios, al marcar las casillas correspondientes e introducir datos en los campos marcados con un
          asterisco (*) en los formularios de la APLICACIÓN, aceptan expresa y de forma libre e inequívoca que sus datos
          personales son necesarios para que el proveedor atienda su solicitud, proporcionando voluntariamente sus datos
          en los campos restantes. El usuario garantiza que los datos personales proporcionados a Synergize SL son
          verdaderos y es responsable de comunicar cualquier cambio en ellos.
        </LegalParagraph>
        <LegalParagraph>
          Los usuarios registrados (administradores) también son responsables de la exactitud y legalidad de los datos
          personales de sus miembros que cargan en la APLICACIÓN.
        </LegalParagraph>
        <LegalParagraph>
          Synergize SL informa que todos los datos solicitados a través de la APLICACIÓN son obligatorios, ya que son
          necesarios para la prestación de un servicio óptimo al usuario. En caso de que no se proporcionen todos los
          datos, no hay garantía de que la información y los servicios proporcionados se adapten completamente a las
          necesidades del Usuario.
        </LegalParagraph>
      </LegalSection>

      <LegalSection>
        <LegalSectionTitle>5. EXENCIÓN DE RESPONSABILIDAD</LegalSectionTitle>
        <LegalParagraph>
          Synergize SL se reserva el derecho de editar, actualizar, modificar, suspender, eliminar o terminar los
          servicios ofrecidos por la APLICACIÓN, incluida la totalidad o parte de su contenido, sin previo aviso, y de
          modificar la forma o tipo de acceso a ella.
        </LegalParagraph>
        <LegalParagraph>
          Synergize SL aplica medidas técnicas y organizativas razonables para proteger la integridad y seguridad de la
          APLICACIÓN y los datos procesados a través de ella. El diseño de la APLICACIÓN sigue el principio de
          minimización de datos, recopilando solo la información estrictamente necesaria para su operación. Además, los
          datos más sensibles manejados por la APLICACIÓN se almacenan en forma cifrada para mejorar la confidencialidad
          y la protección. Sin embargo, los usuarios reconocen que ningún sistema es completamente seguro y Synergize SL
          no puede garantizar la seguridad absoluta de la APLICACIÓN o de la información transmitida o almacenada a
          través de ella.
        </LegalParagraph>
        <LegalParagraph>
          Synergize S.L. aplica medidas técnicas y organizativas de acuerdo con el RGPD para proteger los datos
          personales, incluido el cifrado, el control de acceso y la retención limitada de datos. Los datos personales se
          procesan solo con fines relacionados con el correcto funcionamiento de la aplicación y nunca se comparten sin
          base legal.
        </LegalParagraph>
        <LegalParagraph>
          Las posibles causas de modificación pueden ser por razones como la adaptación a posibles cambios legislativos y
          cambios en la APLICACIÓN misma, así como aquellas que puedan derivarse de los códigos de conducta existentes
          en el campo, o por razones estratégicas o corporativas.
        </LegalParagraph>
        <LegalParagraph>
          Synergize SL no será responsable del uso de la APLICACIÓN por parte de un menor. La descarga y el uso de la
          APLICACIÓN es responsabilidad exclusiva del usuario.
        </LegalParagraph>
        <LegalParagraph>
          La APLICACIÓN se proporciona «tal cual» sin garantía de ningún tipo. Synergize SL no es responsable de la
          calidad final de la APLICACIÓN o de que sirva y cumpla con todos los propósitos de la APLICACIÓN. Sin perjuicio
          de lo anterior, Synergize SL se compromete a contribuir a mejorar la calidad de la APLICACIÓN en la medida de
          sus posibilidades, pero no puede garantizar la exactitud o la puntualidad del contenido de la misma.
        </LegalParagraph>
        <LegalParagraph>
          La responsabilidad de usar la APLICACIÓN recae únicamente en el usuario. Excepto por lo establecido en estos
          Términos y Condiciones, Synergize SL no es responsable de ninguna pérdida o daño que surja en relación con la
          descarga o el uso de la APLICACIÓN, como el resultante de fallas, averías o bloqueos en el funcionamiento de la
          APLICACIÓN (por ejemplo, pero no limitado a: error en las líneas de comunicación, defectos en el hardware o
          software de la APLICACIÓN o fallas en la red de Internet). De manera similar, Synergize SL no será responsable
          de los daños resultantes del uso inadecuado o inapropiado de la APLICACIÓN por parte de los usuarios.
        </LegalParagraph>
        <LegalParagraph>
          En particular, los usuarios registrados (administradores) son únicamente responsables de garantizar que los
          datos personales de sus miembros cargados en la APLICACIÓN se recopilen y procesen de conformidad con las leyes
          de protección de datos aplicables.
        </LegalParagraph>
        <LegalParagraph>
          Los administradores deben asegurarse de que los datos de los miembros y votantes se recopilen y procesen de
          conformidad con el RGPD y las leyes nacionales relevantes.
        </LegalParagraph>
        <LegalParagraph>
          Para más información sobre cómo se procesan los datos personales, consulta nuestra Política de Privacidad
          disponible en <LegalLink href='https://vocdoni.io/privacy'>vocdoni.io/privacy</LegalLink>.
        </LegalParagraph>
      </LegalSection>

      <LegalSection>
        <LegalSectionTitle>6. LEGISLACIÓN Y JURISDICCIÓN</LegalSectionTitle>
        <LegalParagraph>
          El usuario acepta que la ley aplicable y los Tribunales y Tribunales competentes que conocerán las diferencias
          en la interpretación o aplicación de esta cláusula son los tribunales españoles, y renuncia expresamente a
          cualquier otra jurisdicción, es decir, los tribunales más cercanos a la ciudad de Sant Celoni.
        </LegalParagraph>
        <LegalParagraph>
          Este acuerdo se regirá por la ley española y el RGPD para asuntos de protección de datos
        </LegalParagraph>
        <LegalParagraph>He leído y aceptado los términos de uso de la APLICACIÓN.</LegalParagraph>
        <LegalLastUpdated>
          Versión: Octubre 2025 — Última actualización para incluir el cumplimiento del RGPD e información sobre el
          delegado de protección de datos.
        </LegalLastUpdated>
      </LegalSection>
    </LegalPageContainer>
  )
}
