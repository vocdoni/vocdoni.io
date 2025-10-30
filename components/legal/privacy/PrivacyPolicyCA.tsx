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
          Utilitzem Google Analytics (amb adreces IP anonimitzades) i Plausible.io per obtenir estadístiques agrupades i
          no identificables.
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
            de seguretat i anàlisi no identificables.
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
          <LegalListItem>Consentiment explícit (Art. 6(1)(a) RGPD) per a funcions opcionals</LegalListItem>
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
            Les dades es processen de manera anonimitzada i només amb finalitats analítiques internes.
          </Paragraph>
          <Paragraph variant='legal'>
            Aquestes galetes estan limitades a propòsits d'anàlisi i no fan seguiment entre diferents llocs web.
          </Paragraph>
        </LegalSubsection>

        <LegalSubsection>
          <Heading.H3 variant='legal'>Aplicació (app.vocdoni.io):</Heading.H3>
          <Paragraph variant='legal'>
            L'aplicació Vocdoni utilitza Plausible, una plataforma d'analítica respectuosa amb la privacitat, sense
            galetes ni identificadors personals.
          </Paragraph>
          <Paragraph variant='legal'>Altres encarregats del tractament sota l'article 28(3) del RGPD:</Paragraph>
          <LegalList variant='none'>
            <LegalListItem>Stripe Payments Europe, Ltd. – Processament de pagaments.</LegalListItem>
            <LegalListItem>Twilio, Inc. – Enviament d'SMS i correus electrònics.</LegalListItem>
          </LegalList>
          <Paragraph variant='legal'>
            Aquests proveïdors tracten les dades únicament per a les finalitats contractades i sota garanties de
            protecció de dades adequades.
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
        <Paragraph variant='legal'>
          Consulta la nostra política de privacitat / Consulta la nostra política de galetes
        </Paragraph>
      </LegalSection>

      <LegalSection>
        <Heading.H2 variant='legal'>7. MESURES DE SEGURETAT</Heading.H2>
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
          Aquesta Política de Privacitat va ser publicada el 26 de setembre de 2025 i és efectiva a partir d'aquesta
          data. Per a més informació sobre les garanties de la teva privacitat, pots contactar Synergize SL a{' '}
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

      <LegalSection>
        <Heading.H2 variant='legal'>9. Galetes i tecnologies de seguiment</Heading.H2>
        <Paragraph variant='legal'>
          El lloc web (vocdoni.io) i l'aplicació (app.vocdoni.io) utilitzen un nombre mínim de galetes i tecnologies de
          seguiment:
        </Paragraph>
        <Paragraph variant='legal'>
          <strong>Google Analytics</strong> – Utilitzat a vocdoni.io per obtenir estadístiques anònimes i agregades
          sobre visites i ús. Les adreces IP s'anonimitzen abans de l'emmagatzematge.
        </Paragraph>
        <Paragraph variant='legal'>
          <strong>Plausible.io</strong> – Utilitzat per a una analítica respectuosa amb la privacitat, sense galetes ni
          identificadors personals, tant al lloc web com a l'aplicació.
        </Paragraph>
        <Paragraph variant='legal'>
          No s'utilitzen galetes amb finalitats de màrqueting, perfilat o publicitat.
        </Paragraph>
        <Paragraph variant='legal'>
          Pots desactivar les galetes en qualsevol moment mitjançant la configuració del teu navegador.
        </Paragraph>
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
        <LegalLastUpdated>L'última revisió d'aquesta política és del 24 d'octubre de 2025.</LegalLastUpdated>
      </LegalSection>
    </LegalPageContainer>
  )
}
