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

export function PrivacyPolicyCA() {
  return (
    <LegalPageContainer>
      <LegalHeader>
        <LegalTitle>Política de Privacitat</LegalTitle>
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
        <LegalSectionTitle>Política de Privacitat</LegalSectionTitle>
        <LegalParagraph>Operem d'acord amb els principis establerts a continuació:</LegalParagraph>
        <LegalParagraph>
          Ens comprometem a complir amb les disposicions legals sobre protecció de dades i ens esforcem per observar
          sempre els principis d'evitació de dades i minimització de dades.
        </LegalParagraph>
      </LegalSection>

      <LegalSection>
        <LegalSectionTitle>1. El Responsable del Tractament</LegalSectionTitle>
        <LegalSubsection>
          <LegalSubsectionTitle>Qui és el responsable de les teves dades personals?</LegalSubsectionTitle>
          <LegalParagraph>
            Synergize S.L. és el responsable del tractament de dades personals en compliment del Reglament (UE) 2016/679
            (RGPD) i la Llei Orgànica 3/2018 (LOPDGDD). Vocdoni App està dissenyada i operada d'acord amb els principis
            de legalitat, equitat, transparència, minimització de dades i integritat, integrant la privacitat per
            disseny i per defecte.
          </LegalParagraph>
        </LegalSubsection>
      </LegalSection>

      <LegalSection>
        <LegalSectionTitle>2. Amb quina finalitat processem les teves dades personals?</LegalSectionTitle>
        <LegalParagraph>
          Processem les teves dades personals per operar la Vocdoni App (d'ara endavant, l'«APLICACIÓ»), que proporciona
          processos de votació i participació segurs, verificables i que preserven la privacitat.
        </LegalParagraph>
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
        <LegalParagraph>
          Tot el processament segueix el principi de minimització de dades: només es recopila la informació estrictament
          necessària per operar el servei. Les dades sensibles s'emmagatzemen de forma xifrada per millorar la
          confidencialitat i la protecció.
        </LegalParagraph>
      </LegalSection>

      <LegalSection>
        <LegalSectionTitle>3. Per què podem processar les teves dades personals?</LegalSectionTitle>
        <LegalParagraph>El processament de les teves dades està legitimat sobre la base de:</LegalParagraph>
        <LegalList>
          <LegalListItem>Necessitat contractual (Art. 6(1)(b) RGPD)</LegalListItem>
          <LegalListItem>Consentiment explícit (Art. 6(1)(a) RGPD) per a funcions opcionals</LegalListItem>
          <LegalListItem>Interès legítim (Art. 6(1)(f) RGPD) per a seguretat i prevenció de frau</LegalListItem>
        </LegalList>
      </LegalSection>

      <LegalSection>
        <LegalSectionTitle>4. Durant quant de temps conservarem les teves dades personals?</LegalSectionTitle>
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
        <LegalParagraph>
          Quan les dades ja no siguin necessàries per a aquests fins, s'eliminaran amb les mesures de seguretat
          apropiades per a una destrucció completa.
        </LegalParagraph>
      </LegalSection>

      <LegalSection>
        <LegalSectionTitle>5. A qui divulguem les teves dades personals?</LegalSectionTitle>
        <LegalParagraph>Les teves dades personals poden divulgar-se a:</LegalParagraph>
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
        <LegalParagraph>
          <strong>Específicament:</strong>
        </LegalParagraph>
        <LegalList>
          <LegalListItem>
            Dins de l'APLICACIÓ, les anàlisis es realitzen utilitzant <strong>Plausible</strong>, una plataforma
            d'anàlisi que prioritza la privacitat, que no utilitza galetes i no recopila ni emmagatzema informació
            d'identificació personal. Per a més detalls, pots revisar{' '}
            <LegalLink href='https://plausible.io/privacy'>plausible.io/privacy</LegalLink>.
          </LegalListItem>
          <LegalListItem>
            La pàgina d'inici de vocdoni.app utilitza <strong>Google Analytics</strong> per a l'anàlisi del trànsit web.
            Les dades recopilades a través d'aquesta eina es processen de manera dissociada (sense identificació
            personal) i s'utilitzen exclusivament amb fins estadístics interns. L'APLICACIÓ pot recopilar, emmagatzemar
            o compilar certa informació no personal sobre el seu ús. Google Analytics es regeix pels Termes i Condicions
            Generals de Google{' '}
            <LegalLink href='http://www.google.com/analytics/terms/us.html'>
              google.com/analytics/terms/us.html
            </LegalLink>{' '}
            i la Política de Privacitat de Google{' '}
            <LegalLink href='https://policies.google.com/privacy?hl=ca&gl=es'>policies.google.com/privacy</LegalLink>.
          </LegalListItem>
        </LegalList>
      </LegalSection>

      <LegalSection>
        <LegalSectionTitle>6. Quins són els teus drets com a usuari registrat?</LegalSectionTitle>
        <LegalParagraph>Els teus drets inclouen els següents, però no es limiten a:</LegalParagraph>
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
            <LegalLink href='https://www.aepd.es'>www.aepd.es</LegalLink>) si consideres que el processament no compleix
            amb la legislació vigent.
          </LegalListItem>
        </LegalList>
        <LegalParagraph>
          <strong>Informació de contacte per exercir els teus drets:</strong>
        </LegalParagraph>
        <LegalParagraph>
          Synergize SL. Jaume I, 65 (Local Esquerra) - 08470 Sant Celoni (Barcelona).
          <br />
          E-mail: <LegalLink href='mailto:dpo@vocdoni.org'>dpo@vocdoni.org</LegalLink>
        </LegalParagraph>
        <LegalParagraph>
          Consulta la nostra política de privacitat / Consulta la nostra política de galetes
        </LegalParagraph>
      </LegalSection>

      <LegalSection>
        <LegalSectionTitle>7. MESURES DE SEGURETAT</LegalSectionTitle>
        <LegalParagraph>
          D'acord amb les disposicions de les regulacions actuals sobre protecció de dades personals, el RESPONSABLE
          compleix amb totes les disposicions de les regulacions RGPD i LOPDGDD per al processament de les dades
          personals de les quals és responsable, i compleix manifestament amb els principis descrits a l'Article 5 del
          RGPD, pels quals es processen de manera lícita, justa i transparent en relació amb l'interessat i són
          apropiades, rellevants i limitades al necessari en relació amb les finalitats per a les quals es processen.
        </LegalParagraph>
        <LegalParagraph>
          Synergize SL garanteix que s'han implementat polítiques tècniques i organitzatives apropiades per aplicar les
          mesures de seguretat establertes per RGPD i LOPDGDD amb la finalitat de protegir els drets i llibertats dels
          usuaris.
        </LegalParagraph>
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
        <LegalParagraph>
          Aquesta Política de Privacitat va ser publicada el 26 de setembre de 2025 i és efectiva a partir d'aquesta
          data. Per a més informació sobre les garanties de la teva privacitat, pots contactar Synergize SL a{' '}
          <LegalLink href='mailto:legal@vocdoni.org'>legal@vocdoni.org</LegalLink>.
        </LegalParagraph>
      </LegalSection>

      <LegalSection>
        <LegalSectionTitle>8. Delegat de Protecció de Dades (DPO)</LegalSectionTitle>
        <LegalParagraph>
          Synergize S.L. ha designat <strong>4Dlegal S.L.</strong> com el seu Delegat de Protecció de Dades (DPO)
          d'acord amb els Articles 37–39 del RGPD.
        </LegalParagraph>
        <LegalParagraph>
          Pots contactar el DPO a <LegalLink href='mailto:dpo@vocdoni.org'>dpo@vocdoni.org</LegalLink> respecte a
          qualsevol pregunta, preocupació o sol·licitud relacionada amb el processament de dades personals o l'exercici
          dels teus drets de protecció de dades.
        </LegalParagraph>
        <LegalParagraph>El DPO actua de manera independent i reporta a l'alta direcció de Synergize.</LegalParagraph>
        <LegalParagraph>
          Totes les comunicacions rebudes pel DPO es tracten de manera confidencial i es respondran en un termini d'un
          mes, prorrogable fins a dos mesos addicionals si és necessari a causa de la complexitat o el nombre de
          sol·licituds.
        </LegalParagraph>
      </LegalSection>

      <LegalSection>
        <LegalSectionTitle>9. Actualitzacions d'aquesta Política</LegalSectionTitle>
        <LegalParagraph>
          Aquesta Política de Privacitat es revisa periòdicament i cada vegada que hi ha canvis legals, tècnics o
          organitzatius rellevants que afecten el processament de dades personals.
        </LegalParagraph>
        <LegalParagraph>
          Les actualitzacions materials es comunicaran a través de l'APLICACIÓ o per correu electrònic als usuaris
          registrats i administradors.
        </LegalParagraph>
        <LegalParagraph>
          Cada versió de la Política inclourà la seva <strong>data de revisió</strong> i <strong>data efectiva</strong>.
        </LegalParagraph>
        <LegalLastUpdated>La versió actual va ser revisada per última vegada el 16 d'octubre de 2025.</LegalLastUpdated>
      </LegalSection>
    </LegalPageContainer>
  )
}
