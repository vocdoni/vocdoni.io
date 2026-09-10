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
import { formatPolicyRevisionDate } from '@/lib/privacyPolicy'

export function PrivacyPolicyCA() {
  return (
    <LegalPageContainer>
      <LegalHeader>
        <Heading.H1 variant='legal'>Política de Privacitat</Heading.H1>
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
        <Heading.H2 variant='legal'>Política de Privacitat</Heading.H2>
        <Paragraph variant='legal'>Operem d'acord amb els principis establerts a continuació:</Paragraph>
        <Paragraph variant='legal'>
          Ens comprometem a complir amb les disposicions legals sobre protecció de dades i ens esforcem per observar
          sempre els principis d'evitació de dades i minimització de dades.
        </Paragraph>
        <Paragraph variant='legal'>
          Aquesta Política de Privacitat s'aplica tant a l'aplicació Vocdoni (
          <Link href='https://app.vocdoni.io'>app.vocdoni.io</Link>) com al lloc web de Vocdoni (
          <Link href='https://vocdoni.io'>vocdoni.io</Link>).
        </Paragraph>
        <Paragraph variant='legal'>
          L'aplicació inclou activitats de tractament addicionals relacionades amb usuaris registrats, administradors i
          processos de votació, mentre que el lloc web es limita a finalitats informatives generals i d'anàlisi.
        </Paragraph>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>1. El Responsable del Tractament</Heading.H2>
        <LegalSubsection>
          <Heading.H3 variant='legal'>Qui és el responsable de les teves dades personals?</Heading.H3>
          <Paragraph variant='legal'>
            Synergize S.L. és el responsable del tractament de dades personals en compliment del Reglament (UE) 2016/679
            (RGPD) i la Llei Orgànica 3/2018 (LOPDGDD). Vocdoni App està dissenyada i operada d'acord amb els principis
            de legalitat, equitat, transparència, minimització de dades i integritat, integrant la privacitat per
            disseny i per defecte.
          </Paragraph>
        </LegalSubsection>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>2. Amb quina finalitat processem les teves dades personals?</Heading.H2>
        <Paragraph variant='legal'>
          Quan visites el nostre lloc web, només es processen les dades tècniques mínimes (p. ex., adreça IP, navegador,
          tipus de dispositiu) necessàries per al seu correcte funcionament i per a finalitats analítiques.
        </Paragraph>
        <Paragraph variant='legal'>
          Utilitzem Google Analytics (amb adreces IP anonimitzades), Plausible.io i PostHog amb finalitats analítiques.
          Google Analytics i Plausible.io produeixen estadístiques agregades. PostHog utilitza un identificador generat
          aleatòriament que és pseudonimitzat i no anònim, per la qual cosa el tractem com a dada personal. Google
          Analytics i PostHog només es carreguen després que acceptis el bàner de galetes.
        </Paragraph>
        <Paragraph variant='legal'>
          No es recullen dades personals amb finalitats de màrqueting ni es duu a terme cap perfilat dels usuaris.
        </Paragraph>
        <Paragraph variant='legal'>
          Processem les teves dades personals per operar la Vocdoni App (d'ara endavant, l'«APLICACIÓ»), que proporciona
          processos de votació i participació segurs, verificables i que preserven la privacitat.
        </Paragraph>
        <LegalList>
          <LegalListItem>
            <strong>(a) Administradors:</strong> processem dades d'identificació, contacte i autenticació per gestionar
            processos de votació.
          </LegalListItem>
          <LegalListItem>
            <strong>(b) Votants:</strong> processem credencials o codis d'accés proporcionats per la seva organització.
            Els vots es registren a la blockchain de Vocdoni utilitzant mecanismes criptogràfics que garanteixen
            l'anonimat.
          </LegalListItem>
          <LegalListItem>
            <strong>(c) Dades tècniques:</strong> el dispositiu, el navegador i la IP poden processar-se per monitoratge
            de seguretat i prevenció del frau, sobre la base del nostre interès legítim. L'analítica no està coberta per
            aquest apartat: es basa en el teu consentiment, tal com es descriu a les seccions 3 i 9.
          </LegalListItem>
        </LegalList>
        <Paragraph variant='legal'>
          Tot el processament segueix el principi de minimització de dades: només es recopila la informació estrictament
          necessària per operar el servei. Les dades sensibles s'emmagatzemen de forma xifrada per millorar la
          confidencialitat i la protecció.
        </Paragraph>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>3. Per què podem processar les teves dades personals?</Heading.H2>
        <Paragraph variant='legal'>El processament de les teves dades està legitimat sobre la base de:</Paragraph>
        <LegalList>
          <LegalListItem>Necessitat contractual (Art. 6(1)(b) RGPD)</LegalListItem>
          <LegalListItem>
            Consentiment explícit (Art. 6(1)(a) RGPD) per a funcions opcionals, inclosa tota l'analítica que emmagatzema
            informació al teu dispositiu i l'enregistrament de sessions descrit a la secció 9
          </LegalListItem>
          <LegalListItem>Interès legítim (Art. 6(1)(f) RGPD) per a seguretat i prevenció de frau</LegalListItem>
        </LegalList>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>4. Durant quant de temps conservarem les teves dades personals?</Heading.H2>
        <LegalList>
          <LegalListItem>
            Les dades d'usuaris registrats (administradors) i les dades carregades per ells (per exemple, llistes de
            membres) es conservaran mentre mantinguin el seu compte i relació contractual amb Synergize SL, i després
            durant els períodes de prescripció legal aplicables.
          </LegalListItem>
          <LegalListItem>
            Les dades dels votants romanen dins de la base de dades de la llista de membres de l'organització i mai es
            transfereixen fora d'ella. Les credencials s'utilitzen únicament per generar una adreça que atorga el dret a
            votar i que no està vinculada a cap dada personal. Les dades dels membres es conservaran mentre
            l'administrador mantingui la llista de membres o fins que finalitzi la relació contractual amb Synergize SL.
          </LegalListItem>
          <LegalListItem>
            Els votants estan ofuscats i emmagatzemats a la blockchain de manera immutable i permanent, sense cap vincle
            amb dades personals.
          </LegalListItem>
          <LegalListItem>
            Els esdeveniments d'analítica es conserven durant 12 mesos. Aquest termini permet comparar un any amb
            l'anterior, que és la finalitat per a la qual es recullen les dades.
          </LegalListItem>
          <LegalListItem>
            Els enregistraments de sessió a l'Aplicació Vocdoni es conserven durant 30 dies i després s'eliminen.
          </LegalListItem>
        </LegalList>
        <Paragraph variant='legal'>
          Quan les dades ja no siguin necessàries per a aquests fins, s'eliminaran amb les mesures de seguretat
          apropiades per a una destrucció completa.
        </Paragraph>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>5. A qui divulguem les teves dades personals?</Heading.H2>
        <Paragraph variant='legal'>Les teves dades personals poden divulgar-se a:</Paragraph>
        <LegalList>
          <LegalListItem>
            <strong>Administracions Públiques i autoritats</strong> quan sigui legalment requerit.
          </LegalListItem>
          <LegalListItem>
            <strong>Proveïdors de serveis</strong> que necessiten accés a dades personals per prestar serveis a
            Synergize SL (per exemple, processadors de pagaments, anàlisi). Aquests proveïdors actuen com a encarregats
            del tractament sota contractes que compleixen amb l'Article 28.3 RGPD.
          </LegalListItem>
        </LegalList>

        <LegalSubsection>
          <Heading.H3 variant='legal'>Lloc web (vocdoni.io):</Heading.H3>
          <Paragraph variant='legal'>
            El lloc web utilitza Google Analytics (amb galetes) i Plausible.io (sense galetes) per obtenir estadístiques
            agregades i no identificables sobre les visites i patrons d'ús.
          </Paragraph>
          <Paragraph variant='legal'>
            Les dades es tracten de manera agregada i pseudonimitzada i s'utilitzen exclusivament amb finalitats
            analítiques internes.
          </Paragraph>
          <Paragraph variant='legal'>
            El lloc web també utilitza PostHog, proporcionat per PostHog, Inc., per obtenir estadístiques agregades
            sobre les visites, la navegació i la manera com els visitants passen del lloc web a l'Aplicació Vocdoni. Les
            dades s'allotgen a la Unió Europea (PostHog EU Cloud, amb emmagatzematge a Alemanya) i PostHog actua com a
            encarregat del tractament d'acord amb l'article 28.3 del RGPD. La recollida d'adreces IP està desactivada.
            PostHog només es carrega després que acceptis el bàner de galetes; si el rebutges, no s'instal·la cap galeta
            de PostHog ni es transmet cap dada.
          </Paragraph>
          <Paragraph variant='legal'>
            PostHog, Inc. està establerta als Estats Units. Tot i que les dades s'emmagatzemen a la Unió Europea,
            PostHog hi pot accedir i tractar-les des de fora de l'Espai Econòmic Europeu, inclosos els Estats Units, amb
            finalitats de suport, manteniment i seguretat. Aquesta transferència està emparada tant per la certificació
            de PostHog, Inc. en el Marc de Privadesa de Dades UE-EUA com per les Clàusules Contractuals Tipus aprovades
            per la Comissió Europea, que s'apliquen de manera addicional a aquesta certificació d'acord amb el contracte
            d'encàrrec del tractament subscrit. Pots sol·licitar una còpia d'aquestes garanties a{' '}
            <Link href='mailto:dpo@vocdoni.org'>dpo@vocdoni.org</Link>.
          </Paragraph>
          <Paragraph variant='legal'>
            Aquestes galetes es limiten a finalitats analítiques. No s'utilitzen amb finalitats publicitàries ni per
            elaborar perfils. L'identificador de PostHog descrit a la secció 9 es comparteix entre vocdoni.io i
            app.vocdoni.io - tots dos operats per Synergize S.L. - amb l'única finalitat de mesurar la transició entre
            el nostre lloc web i el nostre propi servei. Es tracta d'un identificador pseudonimitzat i el tractem com a
            dada personal. No es comparteix amb tercers. Google Analytics és un servei d'un tercer, Google, que
            instal·la les seves pròpies galetes d'acord amb la seva pròpia política de privadesa; si prefereixes que no
            s'instal·li cap galeta analítica de tercers, pots rebutjar les galetes al bàner.
          </Paragraph>
        </LegalSubsection>

        <LegalSubsection>
          <Heading.H3 variant='legal'>Aplicació (app.vocdoni.io):</Heading.H3>
          <Paragraph variant='legal'>
            A l'Aplicació Vocdoni l'analítica es fa mitjançant Plausible, una plataforma que no utilitza galetes ni
            recull identificadors personals, i - per als administradors i altres usuaris registrats que hagin acceptat
            el bàner de galetes - mitjançant PostHog, que sí que instal·la una galeta i sí que utilitza un identificador
            pseudonimitzat.
          </Paragraph>
          <Paragraph variant='legal'>Altres encarregats del tractament sota l'article 28(3) del RGPD:</Paragraph>
          <LegalList variant='none'>
            <LegalListItem>Stripe Payments Europe, Ltd. – Processament de pagaments.</LegalListItem>
            <LegalListItem>Twilio, Inc. – Enviament d'SMS i correus electrònics.</LegalListItem>
            <LegalListItem>
              PostHog, Inc. – Analítica de producte, allotjada a la Unió Europea, amb accés des de fora de l'Espai
              Econòmic Europeu tal com s'ha descrit anteriorment.
            </LegalListItem>
          </LegalList>
          <Paragraph variant='legal'>
            PostHog s'utilitza a l'Aplicació únicament per a administradors i usuaris registrats que hagin acceptat el
            bàner de galetes, amb la finalitat d'entendre com s'utilitza el servei i millorar-lo. Per a aquests mateixos
            usuaris PostHog enregistra a més la sessió, amb tot el text i tots els camps de formulari emmascarats, tal
            com es descriu a la secció 9. Mai no està actiu durant la votació: PostHog no es carrega a les pàgines de
            votació, per la qual cosa no es genera ni es transmet cap esdeveniment des d'aquestes ni s'enregistra cap
            sessió. Els votants no són objecte de cap tractament analític.
          </Paragraph>
          <Paragraph variant='legal'>
            Aquests proveïdors tracten les dades únicament per a les finalitats contractades i sota garanties de
            protecció de dades adequades.
          </Paragraph>
        </LegalSubsection>

        <LegalSubsection>
          <Heading.H3 variant='legal'>5.1 Servei de xat d’atenció a l’usuari (opcional)</Heading.H3>
          <Paragraph variant='legal'>
            Aquesta secció només serà aplicable quan el lloc web tingui habilitat el servei de xat d’atenció a l’usuari.
          </Paragraph>
          <Paragraph variant='legal'>
            Aquest lloc web pot integrar un sistema de xat en temps real proporcionat per <strong>Crisp IM SARL</strong>{' '}
            amb la finalitat d’atendre consultes o incidències dels usuaris durant el procés de votació.
          </Paragraph>
          <Paragraph variant='legal'>
            Quan l’usuari decideix utilitzar el xat, es tracten les següents dades personals:
          </Paragraph>
          <LegalList>
            <LegalListItem>Adreça IP i dades tècniques del dispositiu.</LegalListItem>
            <LegalListItem>Identificador tècnic de sessió.</LegalListItem>
            <LegalListItem>Contingut dels missatges.</LegalListItem>
            <LegalListItem>Dades de contacte facilitades voluntàriament per l’usuari.</LegalListItem>
          </LegalList>
          <Paragraph variant='legal'>La base jurídica d’aquest tractament és:</Paragraph>
          <LegalList>
            <LegalListItem>
              L’interès legítim del responsable a proporcionar assistència i suport tècnic (art. 6.1.f RGPD), i
            </LegalListItem>
            <LegalListItem>El consentiment de l’usuari en activar i utilitzar el servei de xat.</LegalListItem>
          </LegalList>
          <Paragraph variant='legal'>
            Les dades s’utilitzen exclusivament per a la gestió de l’atenció a l’usuari i la resolució d’incidències, i
            no s’empren amb finalitats comercials, publicitàries ni d’elaboració de perfils.
          </Paragraph>
          <Paragraph variant='legal'>
            Crisp actua com a <strong>encarregat del tractament</strong>, d’acord amb l’article 28 del RGPD, i processa
            les dades únicament seguint les instruccions de <strong>Synergize S.L.</strong> i del responsable del procés
            de votació.
          </Paragraph>
          <Paragraph variant='legal'>
            Les dades tractades a través del xat es conservaran durant el temps necessari per gestionar la consulta i,
            posteriorment, durant els terminis legalment exigits per a l’atenció de possibles responsabilitats.
          </Paragraph>
        </LegalSubsection>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>6. Quins són els teus drets com a usuari registrat?</Heading.H2>
        <Paragraph variant='legal'>Els teus drets inclouen els següents, però no es limiten a:</Paragraph>
        <LegalList>
          <LegalListItem>Dret a sol·licitar informació d'acord amb l'Art. 15 RGPD</LegalListItem>
          <LegalListItem>Dret a sol·licitar rectificació segons l'Article 16 RGPD</LegalListItem>
          <LegalListItem>
            Dret de supressió de les teves dades personals, sempre que el processament addicional no sigui necessari per
            cap de les raons establertes a l'Art. 17 RGPD
          </LegalListItem>
          <LegalListItem>
            Dret a sol·licitar la restricció del processament de les teves dades personals per qualsevol de les raons
            establertes a l'Art. 18 RGPD
          </LegalListItem>
          <LegalListItem>
            Dret de transmissió de les teves dades en un format estructurat, d'ús comú i llegible per màquina.
          </LegalListItem>
          <LegalListItem>
            Dret a revocar el teu consentiment en qualsevol moment d'acord amb l'Art. 7 (3) RGPD
          </LegalListItem>
          <LegalListItem>
            Dret a presentar una queixa davant l'autoritat supervisora espanyola (
            <Link href='https://www.aepd.es'>www.aepd.es</Link>) si consideres que el processament no compleix amb la
            legislació vigent.
          </LegalListItem>
        </LegalList>
        <Paragraph variant='legal'>
          <strong>Informació de contacte per exercir els teus drets:</strong>
        </Paragraph>
        <Paragraph variant='legal'>
          Synergize SL. Jaume I, 65 (Local Esquerra) - 08470 Sant Celoni (Barcelona).
          <br />
          E-mail: <Link href='mailto:dpo@vocdoni.org'>dpo@vocdoni.org</Link>
        </Paragraph>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>7. Mesures de seguretat</Heading.H2>
        <Paragraph variant='legal'>
          D'acord amb les disposicions de les regulacions actuals sobre protecció de dades personals, el RESPONSABLE
          compleix amb totes les disposicions de les regulacions RGPD i LOPDGDD per al processament de les dades
          personals de les quals és responsable, i compleix manifestament amb els principis descrits a l'Article 5 del
          RGPD, pels quals es processen de manera lícita, justa i transparent en relació amb l'interessat i són
          apropiades, rellevants i limitades al necessari en relació amb les finalitats per a les quals es processen.
        </Paragraph>
        <Paragraph variant='legal'>
          Synergize SL garanteix que s'han implementat polítiques tècniques i organitzatives apropiades per aplicar les
          mesures de seguretat establertes per RGPD i LOPDGDD amb la finalitat de protegir els drets i llibertats dels
          usuaris.
        </Paragraph>
        <LegalList>
          <LegalListItem>
            Totes les comunicacions entre l'APLICACIÓ i els servidors estan xifrades (HTTPS/TLS).
          </LegalListItem>
          <LegalListItem>
            Les dades sensibles (per exemple, credencials d'autenticació, llistes de membres) s'emmagatzemen de forma
            xifrada.
          </LegalListItem>
          <LegalListItem>
            El disseny de l'APLICACIÓ minimitza la recopilació de dades personals, centrant-se en les dades estrictament
            necessàries per a la funcionalitat.
          </LegalListItem>
          <LegalListItem>
            Els vots estan anonimitzats per disseny i registrats a la blockchain de Vocdoni sense cap vincle amb la
            identitat del votant.
          </LegalListItem>
        </LegalList>
        <Paragraph variant='legal'>
          Aquesta Política de Privacitat va ser publicada el {formatPolicyRevisionDate('ca')} i és efectiva a partir
          d'aquesta data. Per a més informació sobre les garanties de la teva privacitat, pots contactar Synergize SL a{' '}
          <Link href='mailto:dpo@vocdoni.org'>dpo@vocdoni.org</Link>.
        </Paragraph>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>8. Delegat de Protecció de Dades (DPO)</Heading.H2>
        <Paragraph variant='legal'>
          Synergize S.L. ha designat <strong>4Dlegal S.L.</strong> com el seu Delegat de Protecció de Dades (DPO)
          d'acord amb els Articles 37–39 del RGPD.
        </Paragraph>
        <Paragraph variant='legal'>
          Pots contactar el DPO a <Link href='mailto:dpo@vocdoni.org'>dpo@vocdoni.org</Link> respecte a qualsevol
          pregunta, preocupació o sol·licitud relacionada amb el processament de dades personals o l'exercici dels teus
          drets de protecció de dades.
        </Paragraph>
        <Paragraph variant='legal'>
          El DPO actua de manera independent i reporta a l'alta direcció de Synergize.
        </Paragraph>
        <Paragraph variant='legal'>
          Totes les comunicacions rebudes pel DPO es tracten de manera confidencial i es respondran en un termini d'un
          mes, prorrogable fins a dos mesos addicionals si és necessari a causa de la complexitat o el nombre de
          sol·licituds.
        </Paragraph>
      </LegalSection>

      <LegalSection id='cookies'>
        <Heading.H2 variant='legal'>9. Galetes i tecnologies de seguiment</Heading.H2>
        <Paragraph variant='legal'>
          El lloc web (vocdoni.io) i l'aplicació (app.vocdoni.io) utilitzen un nombre mínim de galetes i tecnologies de
          seguiment:
        </Paragraph>
        <Paragraph variant='legal'>
          <strong>Google Analytics</strong> – S'utilitza a vocdoni.io per recopilar estadístiques agregades sobre les
          visites i l'ús del lloc web. Les adreces IP s'anonimitzen abans del seu emmagatzematge. Google Analytics és un
          servei prestat per un tercer, que instal·la les seves pròpies galetes d'acord amb la seva pròpia política de
          privadesa. Només es carrega després que acceptis el bàner de galetes.
        </Paragraph>
        <Paragraph variant='legal'>
          <strong>Plausible.io</strong> – Utilitzat per a una analítica respectuosa amb la privacitat, sense galetes ni
          identificadors personals, tant al lloc web com a l'aplicació.
        </Paragraph>
        <Paragraph variant='legal'>
          <strong>PostHog</strong> – S'utilitza tant a vocdoni.io com a app.vocdoni.io, i únicament després que acceptis
          el bàner de galetes. PostHog emmagatzema un identificador generat aleatòriament en una galeta associada al
          domini vocdoni.io i els seus subdominis. Com que el lloc web i l'Aplicació llegeixen el mateix identificador,
          podem saber que una visita a vocdoni.io i un ús posterior d'app.vocdoni.io corresponen al mateix visitant,
          cosa que ens permet mesurar com les persones passen del nostre lloc web al nostre servei. Aquest identificador
          és pseudonimitzat: no t'identifica pel teu nom, però el tractem com a dada personal. No es comparteix amb cap
          altre lloc web ni amb tercers. Es conserva durant 12 mesos. Les dades s'allotgen a la Unió Europea i no es
          recullen adreces IP.
        </Paragraph>
        <Paragraph variant='legal'>
          <strong>Enregistrament de sessions</strong> – Únicament a l'Aplicació Vocdoni, i només pel que fa als
          administradors i altres usuaris autenticats que hagin acceptat el bàner de galetes, PostHog enregistra a més
          la sessió: les pàgines visitades, els clics i el moviment en pantalla. Tot el text i tots els camps de
          formulari estan emmascarats. L'emmascarament s'aplica al teu propi navegador, de manera que el contingut
          emmascarat mai no es transmet a PostHog ni surt del teu dispositiu. La finalitat és detectar i corregir
          problemes d'usabilitat. Els enregistraments es conserven durant 30 dies i després s'eliminen; si un
          enregistrament documenta un problema concret, es pot conservar excepcionalment mentre es resol aquest
          problema, i en cap cas més d'un any. L'enregistrament de sessions mai no està actiu al lloc web vocdoni.io,
          mai no està actiu a les pàgines de votació i els votants no són mai enregistrats.
        </Paragraph>
        <Paragraph variant='legal'>
          <strong>Registre de consentiment</strong> – Una galeta anomenada vocdoni-cookie-consent emmagatzema la teva
          elecció en aquest bàner. Està associada al domini vocdoni.io i els seus subdominis, de manera que la decisió
          que prenguis al lloc web s'apliqui igualment a l'Aplicació i no se't pregunti dues vegades. Es conserva durant
          12 mesos i registra la teva elecció, la data en què la vas fer i la versió d'aquesta política vigent en aquell
          moment, identificada per la seva data de revisió.
        </Paragraph>
        <Paragraph variant='legal'>
          Pots modificar o retirar la teva elecció en qualsevol moment, amb efecte immediat tant a vocdoni.io com a
          app.vocdoni.io, mitjançant l'enllaç Configuració de galetes disponible al peu de totes les pàgines, que torna
          a obrir el bàner. Retirar el consentiment és tan senzill com donar-lo i no afecta la licitud del tractament
          dut a terme amb anterioritat.
        </Paragraph>
        <Paragraph variant='legal'>Galetes utilitzades:</Paragraph>
        <LegalTable
          headers={['Galeta', 'Proveïdor', 'Finalitat', 'Durada']}
          rows={[
            [
              'ph_[project_key]_posthog',
              'PostHog, Inc.',
              'Identificador analític generat aleatòriament, compartit entre vocdoni.io i app.vocdoni.io.',
              '12 mesos',
            ],
            [
              'vocdoni-cookie-consent',
              'Synergize S.L.',
              'Registra la teva elecció sobre galetes, la data i la versió de la política vigent.',
              '12 mesos',
            ],
            [
              '_ga, _ga_[id]',
              'Google',
              "Estadístiques agregades del lloc web, amb l'anonimització d'IP activada.",
              'Fins a 2 anys',
            ],
            [
              '(cap galeta)',
              'Plausible.io',
              "Analítica sense galetes; no s'emmagatzema informació al teu dispositiu.",
              'n/a',
            ],
          ]}
        />
        <Paragraph variant='legal'>
          Quan el servei de xat de suport està activat, aquest instal·la galetes addicionals, descrites a la secció 9.1.
        </Paragraph>
        <Paragraph variant='legal'>
          No s'utilitzen galetes amb finalitats de màrqueting, perfilat o publicitat.
        </Paragraph>
        <Paragraph variant='legal'>
          També pots desactivar les galetes a través de la configuració del teu navegador en qualsevol moment, si bé
          l'enllaç Configuració de galetes descrit anteriorment és la manera més fiable de retirar el consentiment,
          perquè s'aplica tant a vocdoni.io com a app.vocdoni.io.
        </Paragraph>

        <LegalSubsection>
          <Heading.H3 variant='legal'>9.1 Cookies de tercers – Servei de xat (opcional)</Heading.H3>
          <Paragraph variant='legal'>
            Aquesta secció només serà aplicable quan el lloc web tingui habilitat el servei de xat d’atenció a l’usuari.
          </Paragraph>
          <Paragraph variant='legal'>
            Aquest lloc web pot utilitzar cookies i tecnologies similars proporcionades per{' '}
            <strong>Crisp Chat (Crisp IM SARL)</strong> amb la finalitat d’habilitar un servei de xat d’atenció a
            l’usuari.
          </Paragraph>
          <Paragraph variant='legal'>Aquestes cookies permeten:</Paragraph>
          <LegalList>
            <LegalListItem>Mantenir la sessió de l’usuari durant la conversa.</LegalListItem>
            <LegalListItem>Recordar el context de la conversa entre pàgines.</LegalListItem>
            <LegalListItem>Assignar un identificador tècnic a l’usuari per poder gestionar el suport.</LegalListItem>
          </LegalList>
          <Paragraph variant='legal'>Quan l’usuari utilitza el xat, Crisp pot tractar les següents dades:</Paragraph>
          <LegalList>
            <LegalListItem>Adreça IP i metadades tècniques (navegador, sistema operatiu, dispositiu).</LegalListItem>
            <LegalListItem>Un identificador tècnic assignat per la plataforma.</LegalListItem>
            <LegalListItem>El contingut dels missatges enviats.</LegalListItem>
            <LegalListItem>
              Dades de contacte (com l’adreça de correu electrònic), únicament si l’usuari les facilita voluntàriament.
            </LegalListItem>
          </LegalList>
          <Paragraph variant='legal'>
            Aquestes cookies no s’utilitzen amb finalitats publicitàries ni per rastrejar l’usuari entre llocs web de
            tercers, sinó exclusivament per permetre el funcionament del servei d’atenció a l’usuari.
          </Paragraph>
          <Paragraph variant='legal'>
            Crisp actua com a <strong>encarregat del tractament</strong>, d’acord amb l’article 28 del Reglament (UE)
            2016/679 (RGPD), tractant les dades per compte i seguint les instruccions de <strong>Synergize S.L.</strong>
          </Paragraph>
          <Paragraph variant='legal'>
            L’ús d’aquestes cookies està subjecte al <strong>consentiment de l’usuari</strong>, que pot acceptar-les o
            rebutjar-les des del banner de configuració de cookies.
          </Paragraph>
        </LegalSubsection>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>10. Actualitzacions d'aquesta política</Heading.H2>
        <Paragraph variant='legal'>
          Aquesta política de privacitat s'aplica tant a l'aplicació Vocdoni App (app.vocdoni.io) com al lloc web
          Vocdoni (vocdoni.io). Es revisa periòdicament i sempre que hi hagi canvis legals, tècnics o organitzatius
          rellevants en el tractament de dades.
        </Paragraph>
        <Paragraph variant='legal'>
          Les actualitzacions materials es comunicaran a través de l'APLICACIÓ o per correu electrònic als usuaris
          registrats i administradors.
        </Paragraph>
        <Paragraph variant='legal'>
          Cada versió de la política inclourà la seva <strong>data de revisió</strong> i{' '}
          <strong>data d'entrada en vigor</strong>.
        </Paragraph>
        <Paragraph variant='legal'>
          Atès que aquesta versió introdueix una nova finalitat - mesurar la transició entre el nostre lloc web i el
          nostre servei mitjançant un identificador compartit -, qualsevol consentiment de galetes prestat abans
          d'aquesta data ja no cobreix la totalitat dels tractaments aquí descrits i ha quedat invalidat. Se't tornarà a
          demanar la teva elecció en la propera visita.
        </Paragraph>
        <LegalLastUpdated>
          L'última revisió d'aquesta política és del {formatPolicyRevisionDate('ca')}.
        </LegalLastUpdated>
      </LegalSection>
    </LegalPageContainer>
  )
}
