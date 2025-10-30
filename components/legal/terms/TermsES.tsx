import { Link } from '@/components/Link'
import {
  LegalCompanyInfo,
  LegalHeader,
  LegalLastUpdated,
  LegalList,
  LegalListItem,
  LegalPageContainer,
  LegalSection,
  LegalSubsection,
} from '@/components/ui/legal-document'
import { Heading, Paragraph } from '@/components/ui/typography'

export function TermsES() {
  return (
    <LegalPageContainer>
      <LegalHeader>
        <Heading.H1 variant='legal'>Términos y Condiciones de Uso</Heading.H1>
        <LegalCompanyInfo>
          <p>
            <strong>Synergize SL</strong>
          </p>
          <p>Jaume I, 65 (Local Esquerra) - 08470 Sant Celoni (Barcelona) ESPAÑA</p>
          <p>
            Synergize S.L. ha designado a 4Dlegal S.L. como su Delegado de Protección de Datos (DPO). Puedes contactar
            al DPO en <Link href='mailto:dpo@vocdoni.org'>dpo@vocdoni.org</Link> para cualquier pregunta sobre
            protección de datos.
          </p>
        </LegalCompanyInfo>
      </LegalHeader>

      <LegalSection>
        <Heading.H2 variant='legal'>TÉRMINOS Y CONDICIONES DE USO DE LA APLICACIÓN</Heading.H2>
        <Paragraph variant='legal'>
          Estos Términos y Condiciones rigen el acceso y uso de la aplicación web Vocdoni App (en adelante, la
          «APLICACIÓN»), que Synergize SL pone a disposición de los usuarios. El usuario adquiere esta condición al
          acceder y utilizarla.
        </Paragraph>
        <Paragraph variant='legal'>
          Esta versión de la APLICACIÓN está disponible a través del sitio web oficial de Vocdoni. El usuario reconoce y
          acepta cumplir con todos los términos y condiciones aplicables con respecto al acceso y uso de la APLICACIÓN.
        </Paragraph>
        <Paragraph variant='legal'>
          Acceder a la APLICACIÓN implica que el usuario reconoce que ha aceptado y consentido sin reservas estas
          condiciones de uso.
        </Paragraph>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>1. PROPÓSITO</Heading.H2>
        <Paragraph variant='legal'>
          El propósito de la APLICACIÓN es proporcionar una plataforma digital de votación y participación que permita a
          organizaciones, asociaciones y comunidades llevar a cabo procesos de votación seguros, verificables y que
          preserven la privacidad, y gestionar su base de miembros para configurar censos.
        </Paragraph>
        <Paragraph variant='legal'>
          Algunos de los grupos que pueden beneficiarse de este proyecto son{' '}
          <strong>
            organizaciones sin fines de lucro, cooperativas, asociaciones, grupos comunitarios, ayuntamientos y otras
            entidades que necesitan mecanismos de toma de decisiones transparentes y confiables
          </strong>
          . El diseño y desarrollo de esta APLICACIÓN ha involucrado a especialistas profesionales así como a un grupo
          de usuarios que participaron en el período de prueba.
        </Paragraph>
        <Paragraph variant='legal'>
          Es compatible con navegadores basados en Chromium (p. ej., Google Chrome, Microsoft Edge, Brave), WebKit (p.
          ej., Safari) y Gecko (p. ej., Mozilla Firefox), y también puede ser compatible con otros navegadores web
          modernos, aunque no se puede garantizar dicha compatibilidad.
        </Paragraph>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>2. CARACTERÍSTICAS</Heading.H2>
        <Paragraph variant='legal'>
          La APLICACIÓN proporciona diferentes funcionalidades según el tipo de usuario:
        </Paragraph>
        <LegalSubsection>
          <Heading.H3 variant='legal'>Para usuarios votantes (no registrados):</Heading.H3>
          <LegalList>
            <LegalListItem>
              Acceder a un proceso de votación con credenciales o un enlace proporcionado por su organización.
            </LegalListItem>
            <LegalListItem>Emitir un voto de forma segura.</LegalListItem>
            <LegalListItem>
              No se crea una cuenta persistente para estos usuarios; solo se procesan los datos mínimos requeridos para
              verificar la elegibilidad para votar.
            </LegalListItem>
          </LegalList>
        </LegalSubsection>
        <LegalSubsection>
          <Heading.H3 variant='legal'>Para usuarios registrados (administradores):</Heading.H3>
          <LegalList>
            <LegalListItem>Crear y configurar procesos de votación en nombre de su organización.</LegalListItem>
            <LegalListItem>
              Cargar y gestionar listas de miembros, que pueden incluir información personal de los miembros de la
              organización (que también son votantes potenciales).
            </LegalListItem>
            <LegalListItem>Gestionar credenciales y distribuirlas a votantes elegibles.</LegalListItem>
            <LegalListItem>
              Acceder a funciones avanzadas para monitorear y gestionar procesos de votación.
            </LegalListItem>
          </LegalList>
        </LegalSubsection>
        <Paragraph variant='legal'>
          La APLICACIÓN procesa los datos solo cuando se ejecuta en primer plano y cuando es iniciada por la acción del
          usuario.
        </Paragraph>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>3. DERECHOS DE PROPIEDAD INTELECTUAL E INDUSTRIAL</Heading.H2>
        <Paragraph variant='legal'>
          Los derechos de propiedad intelectual e industrial sobre la APLICACIÓN son propiedad de Synergize SL,
          correspondiendo el ejercicio exclusivo de los derechos de uso por ellos en cualquier forma y, en particular,
          los derechos de reproducción, distribución, comunicación pública y modificación.
        </Paragraph>
        <Paragraph variant='legal'>
          Los titulares de terceros de derechos de propiedad intelectual e industrial sobre fotografías, logotipos y
          cualquier otro símbolo o contenido incluido en la APLICACIÓN han otorgado la autorización correspondiente para
          su reproducción, distribución y disponibilidad al público.
        </Paragraph>
        <Paragraph variant='legal'>
          El usuario reconoce que la reproducción, modificación, distribución, comercialización, descompilación,
          desensamblaje, ingeniería inversa o cualquier otro medio para obtener el código fuente, transformación o
          publicación de cualquier resultado de prueba de referencia no autorizado de cualquiera de los elementos y
          utilidades integrados dentro de la secuencia de operaciones constituye una violación de los derechos de
          propiedad intelectual de Synergize SL, y por lo tanto se compromete a abstenerse de realizar cualquiera de las
          acciones antes mencionadas.
        </Paragraph>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>
          4. NATURALEZA OBLIGATORIA U OPCIONAL DE LA INFORMACIÓN PROPORCIONADA POR EL USUARIO
        </Heading.H2>
        <Paragraph variant='legal'>
          Los usuarios, al marcar las casillas correspondientes e introducir datos en los campos marcados con un
          asterisco (*) en los formularios de la APLICACIÓN, aceptan expresa y de forma libre e inequívoca que sus datos
          personales son necesarios para que el proveedor atienda su solicitud, proporcionando voluntariamente sus datos
          en los campos restantes. El usuario garantiza que los datos personales proporcionados a Synergize SL son
          verdaderos y es responsable de comunicar cualquier cambio en ellos.
        </Paragraph>
        <Paragraph variant='legal'>
          Los usuarios registrados (administradores) también son responsables de la exactitud y legalidad de los datos
          personales de sus miembros que cargan en la APLICACIÓN.
        </Paragraph>
        <Paragraph variant='legal'>
          Synergize SL informa que todos los datos solicitados a través de la APLICACIÓN son obligatorios, ya que son
          necesarios para la prestación de un servicio óptimo al usuario. En caso de que no se proporcionen todos los
          datos, no hay garantía de que la información y los servicios proporcionados se adapten completamente a las
          necesidades del Usuario.
        </Paragraph>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>5. EXENCIÓN DE RESPONSABILIDAD</Heading.H2>
        <Paragraph variant='legal'>
          Synergize SL se reserva el derecho de editar, actualizar, modificar, suspender, eliminar o terminar los
          servicios ofrecidos por la APLICACIÓN, incluida la totalidad o parte de su contenido, sin previo aviso, y de
          modificar la forma o tipo de acceso a ella.
        </Paragraph>
        <Paragraph variant='legal'>
          Synergize SL aplica medidas técnicas y organizativas razonables para proteger la integridad y seguridad de la
          APLICACIÓN y los datos procesados a través de ella. El diseño de la APLICACIÓN sigue el principio de
          minimización de datos, recopilando solo la información estrictamente necesaria para su operación. Además, los
          datos más sensibles manejados por la APLICACIÓN se almacenan en forma cifrada para mejorar la confidencialidad
          y la protección. Sin embargo, los usuarios reconocen que ningún sistema es completamente seguro y Synergize SL
          no puede garantizar la seguridad absoluta de la APLICACIÓN o de la información transmitida o almacenada a
          través de ella.
        </Paragraph>
        <Paragraph variant='legal'>
          Synergize S.L. aplica medidas técnicas y organizativas de acuerdo con el RGPD para proteger los datos
          personales, incluido el cifrado, el control de acceso y la retención limitada de datos. Los datos personales
          se procesan solo con fines relacionados con el correcto funcionamiento de la aplicación y nunca se comparten
          sin base legal.
        </Paragraph>
        <Paragraph variant='legal'>
          Las posibles causas de modificación pueden ser por razones como la adaptación a posibles cambios legislativos
          y cambios en la APLICACIÓN misma, así como aquellas que puedan derivarse de los códigos de conducta existentes
          en el campo, o por razones estratégicas o corporativas.
        </Paragraph>
        <Paragraph variant='legal'>
          Synergize SL no será responsable del uso de la APLICACIÓN por parte de un menor. La descarga y el uso de la
          APLICACIÓN es responsabilidad exclusiva del usuario.
        </Paragraph>
        <Paragraph variant='legal'>
          La APLICACIÓN se proporciona «tal cual» sin garantía de ningún tipo. Synergize SL no es responsable de la
          calidad final de la APLICACIÓN o de que sirva y cumpla con todos los propósitos de la APLICACIÓN. Sin
          perjuicio de lo anterior, Synergize SL se compromete a contribuir a mejorar la calidad de la APLICACIÓN en la
          medida de sus posibilidades, pero no puede garantizar la exactitud o la puntualidad del contenido de la misma.
        </Paragraph>
        <Paragraph variant='legal'>
          La responsabilidad de usar la APLICACIÓN recae únicamente en el usuario. Excepto por lo establecido en estos
          Términos y Condiciones, Synergize SL no es responsable de ninguna pérdida o daño que surja en relación con la
          descarga o el uso de la APLICACIÓN, como el resultante de fallas, averías o bloqueos en el funcionamiento de
          la APLICACIÓN (por ejemplo, pero no limitado a: error en las líneas de comunicación, defectos en el hardware o
          software de la APLICACIÓN o fallas en la red de Internet). De manera similar, Synergize SL no será responsable
          de los daños resultantes del uso inadecuado o inapropiado de la APLICACIÓN por parte de los usuarios.
        </Paragraph>
        <Paragraph variant='legal'>
          En particular, los usuarios registrados (administradores) son únicamente responsables de garantizar que los
          datos personales de sus miembros cargados en la APLICACIÓN se recopilen y procesen de conformidad con las
          leyes de protección de datos aplicables.
        </Paragraph>
        <Paragraph variant='legal'>
          Los administradores deben asegurarse de que los datos de los miembros y votantes se recopilen y procesen de
          conformidad con el RGPD y las leyes nacionales relevantes.
        </Paragraph>
        <Paragraph variant='legal'>
          Para más información sobre cómo se procesan los datos personales, consulta nuestra Política de Privacidad
          disponible en <Link href='https://vocdoni.io/privacy'>vocdoni.io/privacy</Link>.
        </Paragraph>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>6. LEGISLACIÓN Y JURISDICCIÓN</Heading.H2>
        <Paragraph variant='legal'>
          El usuario acepta que la ley aplicable y los Tribunales y Tribunales competentes que conocerán las diferencias
          en la interpretación o aplicación de esta cláusula son los tribunales españoles, y renuncia expresamente a
          cualquier otra jurisdicción, es decir, los tribunales más cercanos a la ciudad de Sant Celoni.
        </Paragraph>
        <Paragraph variant='legal'>
          Este acuerdo se regirá por la ley española y el RGPD para asuntos de protección de datos
        </Paragraph>
        <Paragraph variant='legal'>He leído y aceptado los términos de uso de la APLICACIÓN.</Paragraph>
        <LegalLastUpdated>
          Versión: Octubre 2025 — Última actualización para incluir el cumplimiento del RGPD e información sobre el
          delegado de protección de datos.
        </LegalLastUpdated>
      </LegalSection>
    </LegalPageContainer>
  )
}
