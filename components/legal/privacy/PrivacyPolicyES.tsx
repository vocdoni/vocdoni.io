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
  LegalTable,
} from '@/components/ui/legal-document'
import { Heading, Paragraph } from '@/components/ui/typography'

export function PrivacyPolicyES() {
  return (
    <LegalPageContainer>
      <LegalHeader>
        <Heading.H1 variant='legal'>Política de Privacidad</Heading.H1>
        <LegalCompanyInfo>
          <p>
            <strong>Synergize SL</strong>
          </p>
          <p>Jaume I, 65 (Local Esquerra) - 08470 Sant Celoni (Barcelona) ESPAÑA</p>
          <p>
            E-mail: <Link href='mailto:dpo@vocdoni.org'>dpo@vocdoni.org</Link>
          </p>
        </LegalCompanyInfo>
      </LegalHeader>

      <LegalSection>
        <Heading.H2 variant='legal'>Política de Privacidad</Heading.H2>
        <Paragraph variant='legal'>Operamos de acuerdo con los principios establecidos a continuación:</Paragraph>
        <Paragraph variant='legal'>
          Nos comprometemos a cumplir con las disposiciones legales sobre protección de datos y nos esforzamos por
          observar siempre los principios de evitación de datos y minimización de datos.
        </Paragraph>
        <Paragraph variant='legal'>
          Esta Política de Privacidad se aplica tanto a la aplicación Vocdoni (
          <Link href='https://app.vocdoni.io'>app.vocdoni.io</Link>) como al sitio web de Vocdoni (
          <Link href='https://vocdoni.io'>vocdoni.io</Link>).
        </Paragraph>
        <Paragraph variant='legal'>
          La aplicación incluye actividades de tratamiento adicionales relacionadas con usuarios registrados,
          administradores y procesos de votación, mientras que el sitio web se limita a finalidades informativas
          generales y analíticas.
        </Paragraph>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>1. El Responsable del Tratamiento</Heading.H2>
        <LegalSubsection>
          <Heading.H3 variant='legal'>¿Quién es el responsable de tus datos personales?</Heading.H3>
          <Paragraph variant='legal'>
            Synergize S.L. es el responsable del tratamiento de datos personales en cumplimiento del Reglamento (UE)
            2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD). Vocdoni App está diseñada y operada de acuerdo con los
            principios de legalidad, equidad, transparencia, minimización de datos e integridad, integrando la
            privacidad por diseño y por defecto.
          </Paragraph>
        </LegalSubsection>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>2. ¿Con qué finalidad procesamos tus datos personales?</Heading.H2>
        <Paragraph variant='legal'>
          Cuando visitas nuestro sitio web, solo procesamos datos técnicos mínimos (por ejemplo, dirección IP,
          navegador, tipo de dispositivo) necesarios para su correcto funcionamiento y con fines analíticos.
        </Paragraph>
        <Paragraph variant='legal'>
          Utilizamos Google Analytics (con direcciones IP anonimizadas), Plausible.io y PostHog con fines analíticos.
          Google Analytics y Plausible.io producen estadísticas agregadas. PostHog utiliza un identificador generado
          aleatoriamente que es seudonimizado y no anónimo, por lo que lo tratamos como dato personal. Google Analytics
          y PostHog solo se cargan después de que aceptes el banner de cookies.
        </Paragraph>
        <Paragraph variant='legal'>
          No se recogen datos personales con fines de marketing ni se lleva a cabo ningún perfilado de usuarios.
        </Paragraph>
        <Paragraph variant='legal'>
          Procesamos tus datos personales para operar la Vocdoni App (en adelante, la «APLICACIÓN»), que proporciona
          procesos de votación y participación seguros, verificables y que preservan la privacidad.
        </Paragraph>
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
            de seguridad y prevención del fraude, sobre la base de nuestro interés legítimo. La analítica no está
            cubierta por este apartado: se basa en tu consentimiento, según se describe en las secciones 3 y 9.
          </LegalListItem>
        </LegalList>
        <Paragraph variant='legal'>
          Todo el procesamiento sigue el principio de minimización de datos: solo se recopila la información
          estrictamente necesaria para operar el servicio. Los datos sensibles se almacenan de forma cifrada para
          mejorar la confidencialidad y la protección.
        </Paragraph>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>3. ¿Por qué podemos procesar tus datos personales?</Heading.H2>
        <Paragraph variant='legal'>El procesamiento de tus datos está legitimado sobre la base de:</Paragraph>
        <LegalList>
          <LegalListItem>Necesidad contractual (Art. 6(1)(b) RGPD)</LegalListItem>
          <LegalListItem>
            Consentimiento explícito (Art. 6(1)(a) RGPD) para funciones opcionales, incluida toda la analítica que
            almacena información en tu dispositivo y la grabación de sesiones descrita en la sección 9
          </LegalListItem>
          <LegalListItem>Interés legítimo (Art. 6(1)(f) RGPD) para seguridad y prevención de fraude</LegalListItem>
        </LegalList>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>4. ¿Durante cuánto tiempo conservaremos tus datos personales?</Heading.H2>
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
          <LegalListItem>
            Los eventos de analítica se conservan durante 12 meses. Este plazo permite comparar un año con el anterior,
            que es la finalidad para la que se recogen los datos.
          </LegalListItem>
          <LegalListItem>
            Las grabaciones de sesión en la Aplicación Vocdoni se conservan durante 30 días y después se eliminan.
          </LegalListItem>
        </LegalList>
        <Paragraph variant='legal'>
          Cuando los datos ya no sean necesarios para estos fines, se eliminarán con las medidas de seguridad apropiadas
          para una destrucción completa.
        </Paragraph>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>5. ¿A quién divulgamos tus datos personales?</Heading.H2>
        <Paragraph variant='legal'>Tus datos personales pueden divulgarse a:</Paragraph>
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

        <LegalSubsection>
          <Heading.H3 variant='legal'>Sitio web (vocdoni.io):</Heading.H3>
          <Paragraph variant='legal'>
            El sitio web utiliza Google Analytics (con cookies) y Plausible.io (sin cookies) para obtener estadísticas
            agregadas y no identificables sobre las visitas y patrones de uso.
          </Paragraph>
          <Paragraph variant='legal'>
            Los datos se tratan de forma agregada y seudonimizada y se utilizan exclusivamente con fines analíticos
            internos.
          </Paragraph>
          <Paragraph variant='legal'>
            El sitio web también utiliza PostHog, proporcionado por PostHog, Inc., para obtener estadísticas agregadas
            sobre las visitas, la navegación y la forma en que los visitantes pasan del sitio web a la Aplicación
            Vocdoni. Los datos se alojan en la Unión Europea (PostHog EU Cloud, con almacenamiento en Alemania) y
            PostHog actúa como encargado del tratamiento conforme al artículo 28.3 del RGPD. La recogida de direcciones
            IP está desactivada. PostHog solo se carga después de que aceptes el banner de cookies; si lo rechazas, no
            se instala ninguna cookie de PostHog ni se transmite dato alguno.
          </Paragraph>
          <Paragraph variant='legal'>
            PostHog, Inc. está establecida en los Estados Unidos. Aunque los datos se almacenan en la Unión Europea,
            PostHog puede acceder a ellos y tratarlos desde fuera del Espacio Económico Europeo, incluidos los Estados
            Unidos, con fines de soporte, mantenimiento y seguridad. Esta transferencia está amparada tanto por la
            certificación de PostHog, Inc. en el Marco de Privacidad de Datos UE-EE. UU. como por las Cláusulas
            Contractuales Tipo aprobadas por la Comisión Europea, que se aplican de forma adicional a dicha
            certificación conforme al contrato de encargo del tratamiento suscrito. Puedes solicitar una copia de estas
            garantías en <Link href='mailto:dpo@vocdoni.org'>dpo@vocdoni.org</Link>.
          </Paragraph>
          <Paragraph variant='legal'>
            Estas cookies se limitan a finalidades analíticas. No se utilizan con fines publicitarios ni para elaborar
            perfiles. El identificador de PostHog descrito en la sección 9 se comparte entre vocdoni.io y app.vocdoni.io
            - ambos operados por Synergize S.L. - con la única finalidad de medir la transición entre nuestro sitio web
            y nuestro propio servicio. Se trata de un identificador seudonimizado y lo tratamos como dato personal. No
            se comparte con terceros. Google Analytics es un servicio de un tercero, Google, que instala sus propias
            cookies conforme a su propia política de privacidad; si prefieres que no se instale ninguna cookie analítica
            de terceros, puedes rechazar las cookies en el banner.
          </Paragraph>
        </LegalSubsection>

        <LegalSubsection>
          <Heading.H3 variant='legal'>Aplicación (app.vocdoni.io):</Heading.H3>
          <Paragraph variant='legal'>
            En la Aplicación Vocdoni la analítica se realiza mediante Plausible, una plataforma que no utiliza cookies
            ni recoge identificadores personales, y - para los administradores y demás usuarios registrados que hayan
            aceptado el banner de cookies - mediante PostHog, que sí instala una cookie y sí utiliza un identificador
            seudonimizado.
          </Paragraph>
          <Paragraph variant='legal'>Otros encargados del tratamiento conforme al artículo 28(3) del RGPD:</Paragraph>
          <LegalList variant='none'>
            <LegalListItem>Stripe Payments Europe, Ltd. – Procesamiento de pagos.</LegalListItem>
            <LegalListItem>Twilio, Inc. – Envío de SMS y correos electrónicos.</LegalListItem>
            <LegalListItem>
              PostHog, Inc. – Analítica de producto, alojada en la Unión Europea, con acceso desde fuera del Espacio
              Económico Europeo según lo descrito anteriormente.
            </LegalListItem>
          </LegalList>
          <Paragraph variant='legal'>
            PostHog se utiliza en la Aplicación únicamente para administradores y usuarios registrados que hayan
            aceptado el banner de cookies, con el fin de comprender cómo se usa el servicio y mejorarlo. Para esos
            mismos usuarios PostHog graba además la sesión, con todo el texto y todos los campos de formulario
            enmascarados, según se describe en la sección 9. Nunca está activo durante la votación: PostHog no se carga
            en las páginas de votación, por lo que no se genera ni se transmite ningún evento desde ellas ni se graba
            ninguna sesión. Los votantes no son objeto de ningún tratamiento analítico.
          </Paragraph>
          <Paragraph variant='legal'>
            Estos proveedores tratan los datos únicamente para las finalidades contratadas y bajo garantías adecuadas de
            protección de datos.
          </Paragraph>
        </LegalSubsection>

        <LegalSubsection>
          <Heading.H3 variant='legal'>5.1 Servicio de chat de atención al usuario (opcional)</Heading.H3>
          <Paragraph variant='legal'>
            Esta sección solo será aplicable cuando el sitio web tenga habilitado el servicio de chat de atención al
            usuario.
          </Paragraph>
          <Paragraph variant='legal'>
            Este sitio web puede integrar un sistema de chat en tiempo real proporcionado por{' '}
            <strong>Crisp IM SARL</strong> con la finalidad de atender consultas o incidencias de los usuarios durante
            el proceso de votación.
          </Paragraph>
          <Paragraph variant='legal'>
            Cuando el usuario decide utilizar el chat, se tratan los siguientes datos personales:
          </Paragraph>
          <LegalList>
            <LegalListItem>Dirección IP y datos técnicos del dispositivo.</LegalListItem>
            <LegalListItem>Identificador técnico de sesión.</LegalListItem>
            <LegalListItem>Contenido de los mensajes.</LegalListItem>
            <LegalListItem>Datos de contacto facilitados voluntariamente por el usuario.</LegalListItem>
          </LegalList>
          <Paragraph variant='legal'>La base jurídica de este tratamiento es:</Paragraph>
          <LegalList>
            <LegalListItem>
              El interés legítimo del responsable en proporcionar asistencia y soporte técnico (art. 6.1.f RGPD), y
            </LegalListItem>
            <LegalListItem>El consentimiento del usuario al activar y utilizar el servicio de chat.</LegalListItem>
          </LegalList>
          <Paragraph variant='legal'>
            Los datos se utilizan exclusivamente para la gestión de la atención al usuario y la resolución de
            incidencias, y no se emplean para fines comerciales, publicitarios ni de elaboración de perfiles.
          </Paragraph>
          <Paragraph variant='legal'>
            Crisp actúa como <strong>encargado del tratamiento</strong>, conforme al artículo 28 del RGPD, y procesa los
            datos únicamente siguiendo las instrucciones de <strong>Synergize S.L.</strong> y del responsable del
            proceso de votación.
          </Paragraph>
          <Paragraph variant='legal'>
            Los datos tratados a través del chat se conservarán durante el tiempo necesario para gestionar la consulta
            y, posteriormente, durante los plazos legalmente exigidos para la atención de posibles responsabilidades.
          </Paragraph>
        </LegalSubsection>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>6. ¿Cuáles son tus derechos como usuario registrado?</Heading.H2>
        <Paragraph variant='legal'>Tus derechos incluyen los siguientes, pero no se limitan a:</Paragraph>
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
            <Link href='https://www.aepd.es'>www.aepd.es</Link>) si consideras que el procesamiento no cumple con la
            legislación vigente.
          </LegalListItem>
        </LegalList>
        <Paragraph variant='legal'>
          <strong>Información de contacto para ejercer tus derechos:</strong>
        </Paragraph>
        <Paragraph variant='legal'>
          Synergize SL. Jaume I, 65 (Local Esquerra) - 08470 Sant Celoni (Barcelona).
          <br />
          E-mail: <Link href='mailto:dpo@vocdoni.org'>dpo@vocdoni.org</Link>
        </Paragraph>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>7. Medidas de seguridad</Heading.H2>
        <Paragraph variant='legal'>
          De acuerdo con las disposiciones de las regulaciones actuales sobre protección de datos personales, el
          RESPONSABLE cumple con todas las disposiciones de las regulaciones RGPD y LOPDGDD para el procesamiento de los
          datos personales de los que es responsable, y cumple manifiestamente con los principios descritos en el
          Artículo 5 del RGPD, por los cuales se procesan de manera lícita, justa y transparente en relación con el
          interesado y son apropiados, relevantes y limitados a lo necesario en relación con los fines para los que se
          procesan.
        </Paragraph>
        <Paragraph variant='legal'>
          Synergize SL garantiza que se han implementado políticas técnicas y organizativas apropiadas para aplicar las
          medidas de seguridad establecidas por RGPD y LOPDGDD con el fin de proteger los derechos y libertades de los
          usuarios.
        </Paragraph>
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
        <Paragraph variant='legal'>
          Esta Política de Privacidad fue publicada el 28 de agosto de 2026 y es efectiva a partir de esa fecha. Para
          más información sobre las garantías de tu privacidad, puedes contactar a Synergize SL en{' '}
          <Link href='mailto:dpo@vocdoni.org'>dpo@vocdoni.org</Link>.
        </Paragraph>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>8. Delegado de Protección de Datos (DPO)</Heading.H2>
        <Paragraph variant='legal'>
          Synergize S.L. ha designado a <strong>4Dlegal S.L.</strong> como su Delegado de Protección de Datos (DPO) de
          acuerdo con los Artículos 37–39 del RGPD.
        </Paragraph>
        <Paragraph variant='legal'>
          Puedes contactar al DPO en <Link href='mailto:dpo@vocdoni.org'>dpo@vocdoni.org</Link> respecto a cualquier
          pregunta, preocupación o solicitud relacionada con el procesamiento de datos personales o el ejercicio de tus
          derechos de protección de datos.
        </Paragraph>
        <Paragraph variant='legal'>
          El DPO actúa de manera independiente y reporta a la alta dirección de Synergize.
        </Paragraph>
        <Paragraph variant='legal'>
          Todas las comunicaciones recibidas por el DPO se tratan de manera confidencial y se responderán en un plazo de
          un mes, prorrogable hasta dos meses adicionales si es necesario debido a la complejidad o el número de
          solicitudes.
        </Paragraph>
      </LegalSection>

      <LegalSection id='cookies'>
        <Heading.H2 variant='legal'>9. Cookies y Tecnologías de Seguimiento</Heading.H2>
        <Paragraph variant='legal'>
          El sitio web (vocdoni.io) y la aplicación (app.vocdoni.io) utilizan un número mínimo de cookies y tecnologías
          de seguimiento:
        </Paragraph>
        <Paragraph variant='legal'>
          <strong>Google Analytics</strong> – Se utiliza en vocdoni.io para recopilar estadísticas agregadas sobre las
          visitas y el uso del sitio web. Las direcciones IP se anonimizan antes de su almacenamiento. Google Analytics
          es un servicio prestado por un tercero, que instala sus propias cookies conforme a su propia política de
          privacidad. Solo se carga después de que aceptes el banner de cookies.
        </Paragraph>
        <Paragraph variant='legal'>
          <strong>Plausible.io</strong> – Utilizado para una analítica respetuosa con la privacidad, sin cookies ni
          identificadores personales, tanto en el sitio web como en la aplicación.
        </Paragraph>
        <Paragraph variant='legal'>
          <strong>PostHog</strong> – Se utiliza tanto en vocdoni.io como en app.vocdoni.io, y únicamente después de que
          aceptes el banner de cookies. PostHog almacena un identificador generado aleatoriamente en una cookie asociada
          al dominio vocdoni.io y sus subdominios. Dado que el sitio web y la Aplicación leen el mismo identificador,
          podemos saber que una visita a vocdoni.io y un uso posterior de app.vocdoni.io corresponden al mismo
          visitante, lo que nos permite medir cómo las personas pasan de nuestro sitio web a nuestro servicio. Este
          identificador es seudonimizado: no te identifica por tu nombre, pero lo tratamos como dato personal. No se
          comparte con ningún otro sitio web ni con terceros. Se conserva durante 12 meses. Los datos se alojan en la
          Unión Europea y no se recogen direcciones IP.
        </Paragraph>
        <Paragraph variant='legal'>
          <strong>Grabación de sesiones</strong> – Únicamente en la Aplicación Vocdoni, y solo respecto de los
          administradores y demás usuarios autenticados que hayan aceptado el banner de cookies, PostHog graba además la
          sesión: las páginas visitadas, los clics y el movimiento en pantalla. Todo el texto y todos los campos de
          formulario están enmascarados. El enmascaramiento se aplica en tu propio navegador, de modo que el contenido
          enmascarado nunca se transmite a PostHog ni sale de tu dispositivo. La finalidad es detectar y corregir
          problemas de usabilidad. Las grabaciones se conservan durante 30 días y después se eliminan; si una grabación
          documenta un problema concreto, puede conservarse excepcionalmente mientras se resuelve dicho problema, y en
          ningún caso más de un año. La grabación de sesiones nunca está activa en el sitio web vocdoni.io, nunca está
          activa en las páginas de votación y los votantes nunca son grabados.
        </Paragraph>
        <Paragraph variant='legal'>
          <strong>Registro de consentimiento</strong> – Una cookie denominada vocdoni-cookie-consent almacena tu
          elección en este banner. Está asociada al dominio vocdoni.io y sus subdominios, de modo que la decisión que
          tomes en el sitio web se aplique igualmente en la Aplicación y no se te pregunte dos veces. Se conserva
          durante 12 meses y registra tu elección, la fecha en que la realizaste y la versión de esta política vigente
          en ese momento, identificada por su fecha de revisión.
        </Paragraph>
        <Paragraph variant='legal'>
          Puedes modificar o retirar tu elección en cualquier momento, con efecto inmediato tanto en vocdoni.io como en
          app.vocdoni.io, mediante el enlace Configuración de cookies disponible en el pie de todas las páginas, que
          vuelve a abrir el banner. Retirar el consentimiento es tan sencillo como prestarlo y no afecta a la licitud
          del tratamiento realizado con anterioridad.
        </Paragraph>
        <Paragraph variant='legal'>Cookies utilizadas:</Paragraph>
        <LegalTable
          headers={['Cookie', 'Proveedor', 'Finalidad', 'Duración']}
          rows={[
            [
              'ph_[project_key]_posthog',
              'PostHog, Inc.',
              'Identificador analítico generado aleatoriamente, compartido entre vocdoni.io y app.vocdoni.io.',
              '12 meses',
            ],
            [
              'vocdoni-cookie-consent',
              'Synergize S.L.',
              'Registra tu elección sobre cookies, la fecha y la versión de la política vigente.',
              '12 meses',
            ],
            [
              '_ga, _ga_[id]',
              'Google',
              'Estadísticas agregadas del sitio web, con la anonimización de IP activada.',
              'Hasta 2 años',
            ],
            [
              '(ninguna cookie)',
              'Plausible.io',
              'Analítica sin cookies; no se almacena información en tu dispositivo.',
              'n/a',
            ],
          ]}
        />
        <Paragraph variant='legal'>
          Cuando el servicio de chat de soporte está activado, este instala cookies adicionales, descritas en la sección
          9.1.
        </Paragraph>
        <Paragraph variant='legal'>No se utilizan cookies con fines de marketing, perfilado o publicidad.</Paragraph>
        <Paragraph variant='legal'>
          También puedes desactivar las cookies a través de la configuración de tu navegador en cualquier momento, si
          bien el enlace Configuración de cookies descrito anteriormente es la forma más fiable de retirar el
          consentimiento, porque se aplica tanto a vocdoni.io como a app.vocdoni.io.
        </Paragraph>

        <LegalSubsection>
          <Heading.H3 variant='legal'>9.1 Cookies de terceros – Servicio de chat (opcional)</Heading.H3>
          <Paragraph variant='legal'>
            Esta sección solo será aplicable cuando el sitio web tenga habilitado el servicio de chat de atención al
            usuario.
          </Paragraph>
          <Paragraph variant='legal'>
            Este sitio web puede utilizar cookies y tecnologías similares proporcionadas por{' '}
            <strong>Crisp Chat (Crisp IM SARL)</strong> con la finalidad de habilitar un servicio de chat de atención al
            usuario.
          </Paragraph>
          <Paragraph variant='legal'>Estas cookies permiten:</Paragraph>
          <LegalList>
            <LegalListItem>Mantener la sesión del usuario durante la conversación.</LegalListItem>
            <LegalListItem>Recordar el contexto de la conversación entre páginas.</LegalListItem>
            <LegalListItem>Asignar un identificador técnico al usuario para poder gestionar el soporte.</LegalListItem>
          </LegalList>
          <Paragraph variant='legal'>
            Cuando el usuario utiliza el chat, Crisp puede tratar los siguientes datos:
          </Paragraph>
          <LegalList>
            <LegalListItem>
              Dirección IP y metadatos técnicos (navegador, sistema operativo, dispositivo).
            </LegalListItem>
            <LegalListItem>Un identificador técnico asignado por la plataforma.</LegalListItem>
            <LegalListItem>El contenido de los mensajes enviados.</LegalListItem>
            <LegalListItem>
              Datos de contacto (como la dirección de correo electrónico), únicamente si el usuario los facilita
              voluntariamente.
            </LegalListItem>
          </LegalList>
          <Paragraph variant='legal'>
            Estas cookies no se utilizan con fines publicitarios ni para rastrear al usuario entre sitios web de
            terceros, sino exclusivamente para permitir el funcionamiento del servicio de atención al usuario.
          </Paragraph>
          <Paragraph variant='legal'>
            Crisp actúa como <strong>encargado del tratamiento</strong>, de conformidad con el artículo 28 del
            Reglamento (UE) 2016/679 (RGPD), tratando los datos por cuenta y siguiendo las instrucciones de{' '}
            <strong>Synergize S.L.</strong>
          </Paragraph>
          <Paragraph variant='legal'>
            El uso de estas cookies está sujeto al <strong>consentimiento del usuario</strong>, que puede aceptarlas o
            rechazarlas desde el banner de configuración de cookies.
          </Paragraph>
        </LegalSubsection>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>10. Actualizaciones de esta Política</Heading.H2>
        <Paragraph variant='legal'>
          Esta política de privacidad se aplica tanto a la aplicación Vocdoni App (app.vocdoni.io) como al sitio web
          Vocdoni (vocdoni.io). Se revisa periódicamente y siempre que existan cambios legales, técnicos u organizativos
          relevantes en el tratamiento de datos.
        </Paragraph>
        <Paragraph variant='legal'>
          Las actualizaciones sustanciales se comunicarán a través de la APLICACIÓN o por correo electrónico a los
          usuarios registrados y administradores.
        </Paragraph>
        <Paragraph variant='legal'>
          Cada versión de la política incluirá su <strong>fecha de revisión</strong> y{' '}
          <strong>fecha de entrada en vigor</strong>.
        </Paragraph>
        <Paragraph variant='legal'>
          Dado que esta versión introduce una nueva finalidad - medir la transición entre nuestro sitio web y nuestro
          servicio mediante un identificador compartido -, cualquier consentimiento de cookies prestado con anterioridad
          a esa fecha ya no cubre la totalidad de los tratamientos aquí descritos y ha quedado invalidado. Se te volverá
          a solicitar tu elección en tu próxima visita.
        </Paragraph>
        <LegalLastUpdated>La última revisión de esta política es del 28 de agosto de 2026.</LegalLastUpdated>
      </LegalSection>
    </LegalPageContainer>
  )
}
