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

export function TermsCA() {
  return (
    <LegalPageContainer>
      <LegalHeader>
        <LegalTitle>Vocdoni App - Termes i Condicions d'Ús</LegalTitle>
        <LegalCompanyInfo>
          <p>
            <strong>Synergize SL</strong>
          </p>
          <p>Jaume I, 65 (Local Esquerra) - 08470 Sant Celoni (Barcelona) ESPAÑA</p>
          <p>
            Synergize S.L. ha designat 4Dlegal S.L. com el seu Delegat de Protecció de Dades (DPO). Pots contactar el
            DPO a <LegalLink href='mailto:dpo@vocdoni.org'>dpo@vocdoni.org</LegalLink> per a qualsevol pregunta sobre
            protecció de dades.
          </p>
        </LegalCompanyInfo>
      </LegalHeader>

      <LegalSection>
        <LegalSectionTitle>TERMES I CONDICIONS D'ÚS DE L'APLICACIÓ</LegalSectionTitle>
        <LegalParagraph>
          Aquests Termes i Condicions regeixen l'accés i l'ús de l'aplicació web Vocdoni App (d'ara endavant,
          l'«APLICACIÓ»), que Synergize SL posa a disposició dels usuaris. L'usuari adquireix aquesta condició en
          accedir-hi i utilitzar-la.
        </LegalParagraph>
        <LegalParagraph>
          Aquesta versió de l'APLICACIÓ està disponible a través del lloc web oficial de Vocdoni. L'usuari reconeix i
          accepta complir amb tots els termes i condicions aplicables respecte a l'accés i l'ús de l'APLICACIÓ.
        </LegalParagraph>
        <LegalParagraph>
          Accedir a l'APLICACIÓ implica que l'usuari reconeix que ha acceptat i consentit sense reserves aquestes
          condicions d'ús.
        </LegalParagraph>
      </LegalSection>

      <LegalSection>
        <LegalSectionTitle>1. PROPÒSIT</LegalSectionTitle>
        <LegalParagraph>
          El propòsit de l'APLICACIÓ és proporcionar una plataforma digital de votació i participació que permeti a
          organitzacions, associacions i comunitats dur a terme processos de votació segurs, verificables i que preservin
          la privacitat, i gestionar la seva base de membres per configurar censos.
        </LegalParagraph>
        <LegalParagraph>
          Alguns dels grups que poden beneficiar-se d'aquest projecte són{' '}
          <strong>
            organitzacions sense ànim de lucre, cooperatives, associacions, grups comunitaris, ajuntaments i altres
            entitats que necessiten mecanismes de presa de decisions transparents i fiables
          </strong>
          . El disseny i desenvolupament d'aquesta APLICACIÓ ha involucrat especialistes professionals així com un grup
          d'usuaris que van participar en el període de prova.
        </LegalParagraph>
        <LegalParagraph>
          És compatible amb navegadors basats en Chromium (p. ex., Google Chrome, Microsoft Edge, Brave), WebKit (p. ex.,
          Safari) i Gecko (p. ex., Mozilla Firefox), i també pot ser compatible amb altres navegadors web moderns, tot i
          que no es pot garantir aquesta compatibilitat.
        </LegalParagraph>
      </LegalSection>

      <LegalSection>
        <LegalSectionTitle>2. CARACTERÍSTIQUES</LegalSectionTitle>
        <LegalParagraph>
          L'APLICACIÓ proporciona diferents funcionalitats segons el tipus d'usuari:
        </LegalParagraph>
        <LegalSubsection>
          <LegalSubsectionTitle>Per a usuaris votants (no registrats):</LegalSubsectionTitle>
          <LegalList variant='none'>
            <LegalListItem>
              ○ Accedir a un procés de votació amb credencials o un enllaç proporcionat per la seva organització.
            </LegalListItem>
            <LegalListItem>○ Emetre un vot de forma segura.</LegalListItem>
            <LegalListItem>
              ○ No es crea un compte persistent per a aquests usuaris; només es processen les dades mínimes requerides
              per verificar l'elegibilitat per votar.
            </LegalListItem>
          </LegalList>
        </LegalSubsection>
        <LegalSubsection>
          <LegalSubsectionTitle>Per a usuaris registrats (administradors):</LegalSubsectionTitle>
          <LegalList variant='none'>
            <LegalListItem>○ Crear i configurar processos de votació en nom de la seva organització.</LegalListItem>
            <LegalListItem>
              ○ Carregar i gestionar llistes de membres, que poden incloure informació personal dels membres de
              l'organització (que també són votants potencials).
            </LegalListItem>
            <LegalListItem>○ Gestionar credencials i distribuir-les a votants elegibles.</LegalListItem>
            <LegalListItem>
              ○ Accedir a funcions avançades per monitoritzar i gestionar processos de votació.
            </LegalListItem>
          </LegalList>
        </LegalSubsection>
        <LegalParagraph>
          L'APLICACIÓ processa les dades només quan s'executa en primer pla i quan és iniciada per l'acció de l'usuari.
        </LegalParagraph>
      </LegalSection>

      <LegalSection>
        <LegalSectionTitle>3. DRETS DE PROPIETAT INTEL·LECTUAL I INDUSTRIAL</LegalSectionTitle>
        <LegalParagraph>
          Els drets de propietat intel·lectual i industrial sobre l'APLICACIÓ són propietat de Synergize SL, corresponent
          l'exercici exclusiu dels drets d'ús per ells en qualsevol forma i, en particular, els drets de reproducció,
          distribució, comunicació pública i modificació.
        </LegalParagraph>
        <LegalParagraph>
          Els titulars de tercers de drets de propietat intel·lectual i industrial sobre fotografies, logotips i
          qualsevol altre símbol o contingut inclòs a l'APLICACIÓ han atorgat l'autorització corresponent per a la seva
          reproducció, distribució i disponibilitat al públic.
        </LegalParagraph>
        <LegalParagraph>
          L'usuari reconeix que la reproducció, modificació, distribució, comercialització, descompilació, desassemblatge,
          enginyeria inversa o qualsevol altre mitjà per obtenir el codi font, transformació o publicació de qualsevol
          resultat de prova de referència no autoritzat de qualsevol dels elements i utilitats integrats dins de la
          seqüència d'operacions constitueix una violació dels drets de propietat intel·lectual de Synergize SL, i per
          tant es compromet a abstenir-se de realitzar qualsevol de les accions esmentades anteriorment.
        </LegalParagraph>
      </LegalSection>

      <LegalSection>
        <LegalSectionTitle>
          4. NATURALESA OBLIGATÒRIA O OPCIONAL DE LA INFORMACIÓ PROPORCIONADA PER L'USUARI
        </LegalSectionTitle>
        <LegalParagraph>
          Els usuaris, en marcar les caselles corresponents i introduir dades als camps marcats amb un asterisc (*) als
          formularis de l'APLICACIÓ, accepten expressament i de forma lliure i inequívoca que les seves dades personals
          són necessàries perquè el proveïdor atengui la seva sol·licitud, proporcionant voluntàriament les seves dades
          als camps restants. L'usuari garanteix que les dades personals proporcionades a Synergize SL són veritables i
          és responsable de comunicar qualsevol canvi en elles.
        </LegalParagraph>
        <LegalParagraph>
          Els usuaris registrats (administradors) també són responsables de l'exactitud i legalitat de les dades
          personals dels seus membres que carreguen a l'APLICACIÓ.
        </LegalParagraph>
        <LegalParagraph>
          Synergize SL informa que totes les dades sol·licitades a través de l'APLICACIÓ són obligatòries, ja que són
          necessàries per a la prestació d'un servei òptim a l'usuari. En cas que no es proporcionin totes les dades, no
          hi ha garantia que la informació i els serveis proporcionats s'adaptin completament a les necessitats de
          l'Usuari.
        </LegalParagraph>
      </LegalSection>

      <LegalSection>
        <LegalSectionTitle>5. EXEMPCIÓ DE RESPONSABILITAT</LegalSectionTitle>
        <LegalParagraph>
          Synergize SL es reserva el dret d'editar, actualitzar, modificar, suspendre, eliminar o acabar els serveis
          oferts per l'APLICACIÓ, inclosa la totalitat o part del seu contingut, sense avís previ, i de modificar la
          forma o tipus d'accés a ella.
        </LegalParagraph>
        <LegalParagraph>
          Synergize SL aplica mesures tècniques i organitzatives raonables per protegir la integritat i seguretat de
          l'APLICACIÓ i les dades processades a través d'ella. El disseny de l'APLICACIÓ segueix el principi de
          minimització de dades, recopilant només la informació estrictament necessària per a la seva operació. A més,
          les dades més sensibles manejades per l'APLICACIÓ s'emmagatzemen en forma xifrada per millorar la
          confidencialitat i la protecció. Tanmateix, els usuaris reconeixen que cap sistema és completament segur i
          Synergize SL no pot garantir la seguretat absoluta de l'APLICACIÓ o de la informació transmesa o emmagatzemada
          a través d'ella.
        </LegalParagraph>
        <LegalParagraph>
          Synergize S.L. aplica mesures tècniques i organitzatives d'acord amb el RGPD per protegir les dades personals,
          incloent el xifratge, el control d'accés i la retenció limitada de dades. Les dades personals es processen
          només amb fins relacionats amb el correcte funcionament de l'aplicació i mai es comparteixen sense base legal.
        </LegalParagraph>
        <LegalParagraph>
          Les possibles causes de modificació poden ser per raons com l'adaptació a possibles canvis legislatius i canvis
          en l'APLICACIÓ mateixa, així com aquelles que puguin derivar-se dels codis de conducta existents en el camp, o
          per raons estratègiques o corporatives.
        </LegalParagraph>
        <LegalParagraph>
          Synergize SL no serà responsable de l'ús de l'APLICACIÓ per part d'un menor. La descàrrega i l'ús de
          l'APLICACIÓ és responsabilitat exclusiva de l'usuari.
        </LegalParagraph>
        <LegalParagraph>
          L'APLICACIÓ es proporciona «tal com és» sense garantia de cap tipus. Synergize SL no és responsable de la
          qualitat final de l'APLICACIÓ o de que serveixi i compleixi amb tots els propòsits de l'APLICACIÓ. Sense
          perjudici de l'anterior, Synergize SL es compromet a contribuir a millorar la qualitat de l'APLICACIÓ en la
          mesura de les seves possibilitats, però no pot garantir l'exactitud o la puntualitat del contingut d'aquesta.
        </LegalParagraph>
        <LegalParagraph>
          La responsabilitat d'usar l'APLICACIÓ recau únicament en l'usuari. Excepte pel que s'estableix en aquests
          Termes i Condicions, Synergize SL no és responsable de cap pèrdua o dany que sorgeixi en relació amb la
          descàrrega o l'ús de l'APLICACIÓ, com el resultant de fallades, avaries o bloquejos en el funcionament de
          l'APLICACIÓ (per exemple, però no limitat a: error en les línies de comunicació, defectes en el maquinari o
          programari de l'APLICACIÓ o fallades en la xarxa d'Internet). De manera similar, Synergize SL no serà
          responsable dels danys resultants de l'ús inadequat o inapropiat de l'APLICACIÓ per part dels usuaris.
        </LegalParagraph>
        <LegalParagraph>
          En particular, els usuaris registrats (administradors) són únicament responsables de garantir que les dades
          personals dels seus membres carregades a l'APLICACIÓ es recopilin i processin de conformitat amb les lleis de
          protecció de dades aplicables.
        </LegalParagraph>
        <LegalParagraph>
          Els administradors han d'assegurar-se que les dades dels membres i votants es recopilin i processin de
          conformitat amb el RGPD i les lleis nacionals rellevants.
        </LegalParagraph>
        <LegalParagraph>
          Per a més informació sobre com es processen les dades personals, consulta la nostra Política de Privacitat
          disponible a <LegalLink href='https://vocdoni.io/privacy'>vocdoni.io/privacy</LegalLink>.
        </LegalParagraph>
      </LegalSection>

      <LegalSection>
        <LegalSectionTitle>6. LEGISLACIÓ I JURISDICCIÓ</LegalSectionTitle>
        <LegalParagraph>
          L'usuari accepta que la llei aplicable i els Tribunals i Tribunals competents que coneixeran les diferències en
          la interpretació o aplicació d'aquesta clàusula són els tribunals espanyols, i renuncia expressament a
          qualsevol altra jurisdicció, és a dir, els tribunals més pròxims a la ciutat de Sant Celoni.
        </LegalParagraph>
        <LegalParagraph>
          Aquest acord es regirà per la llei espanyola i el RGPD per a assumptes de protecció de dades
        </LegalParagraph>
        <LegalParagraph>He llegit i acceptat els termes d'ús de l'APLICACIÓ.</LegalParagraph>
        <LegalLastUpdated>
          Versió: Octubre 2025 — Última actualització per incloure el compliment del RGPD i informació sobre el delegat
          de protecció de dades.
        </LegalLastUpdated>
      </LegalSection>
    </LegalPageContainer>
  )
}
