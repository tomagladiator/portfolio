<template>
  <div class="uk-container uk-container-expand">
    <div class="realisations">
      <h1 class="uk-heading-primary uk-margin-large-top">J'ai travaillé sur ces projets</h1>

      <p class="uk-margin-large-bottom">
        Jetez aussi un oeil à mes <router-link to="/expertise">compétences !</router-link>
      </p>

      <div class="uk-child-width-1-2@m uk-child-width-1-3@xl uk-grid-match" uk-grid="parallax: 450">
        <MyRealisation
          year        ="2019"
          agency      ="Exoskills"
          titleJob    ="Senior Front-end Web Developer"
          project     ="Confidentiel"
          descClient  ="Confidentiel"
          descProject ="Projet interne pour un client de grosse envergure afin de relier leurs infrastructures à un système de monitoring centralisé et numérique"
          hashtag     ="#Responsive #Sass #HTML5 #Vue #Es6 #JavaScript"
          logoUrl     ="../img/realisations/logo-exoskills.png"
          imgUrl      ="../img/realisations/exoskills.jpg"/>

        <MyRealisation
          year        ="2018"
          agency      ="Nexio"
          titleJob    ="Lead Front-end"
          project     ="ftq"
          descClient  ="Au 31 mai 2017, le Fonds de solidarité FTQ, disposait d’un actif net de 13,1 milliards de dollars, comptait plus de 645 000 actionnaires-épargnants et participait à la création, au maintien et à la sauvegarde de plus de 186 440 emplois. Il est le plus grand fonds de travailleurs au Canada."
          descProject ="Le projet, étalé sur plusieurs années et plusieurs livraisons offre une expérience utilisateur unique et personnalisée. Le site va progressivement être refondu; De ce fait seul la section particuliers est faite."
          hashtag     ="#Responsive #Sitecore 8 #Bootstrap 3 #Habitat #Accessibilité AA #SCSS #HTML5"
          logoUrl     ="../img/realisations/logo-ftq.png"
          imgUrl      ="../img/realisations/ftq.jpg"/>

        <MyRealisation
          year        ="2017"
          agency      ="Nexio"
          titleJob    ="Lead Front-end"
          project     ="wsp"
          descClient  ="WSP Global inc., est une entreprise Canadienne de génie-conseil comptant 36 000 employés"
          descProject ="Ma mission consistait à l'intégration des maquettes dans un CMS Sitecore."
          hashtag     ="#Responsive #Sitecore #Agile #Bootstrap 2 #Habitat #Accessibilité AA #SCSS #HTML5"
          logoUrl     ="../img/realisations/logo-wsp.png"
          imgUrl      ="../img/realisations/wsp.jpg"/>

        <MyRealisation
          year        ="2016"
          agency      ="ConstraintSolver"
          titleJob    ="Développeur Front-end"
          project     ="dyscatalog"
          descClient  ="Il s'agit d'un projet personnel développé en collaboration avec ma conjointe orthophoniste."
          descProject ="Je souhaitais un projet libre afin de mettre en pratique mes dernières recherches sur AngularJS, NodeJS, Bower, Gulp, Yeoman et le Material Design de Google. En 2016 j'ai changé le framework de ce site en passant de Angular a Vue.js"
          hashtag     ="#Responsive #Vue #Angular #Node #Bower #Gulp #Yeoman #Material Design #SCSS #HTML5"
          logoUrl     ="../img/realisations/logo-dyscatalog.png"
          imgUrl      ="../img/realisations/dyscatalog.jpg"/>

        <MyRealisation
          year        ="2016"
          agency      ="Tink"
          titleJob    ="Lead Technique Front-end"
          project     ="metro-epicerie"
          descClient  ="Metro inc. est une entreprise québécoise de distribution alimentaire et pharmaceutique au Canada. En 2013, son chiffre d'affaires était de 11,4 milliards de dollars cad et elle employait 65 000 employés."
          descProject ="Ma mission consistait à l'intégration des maquettes dans un environnement JAVA. Évaluer les récits et déléguer les tâches"
          hashtag     ="#Responsive #CMS #Java #Agile #SCSS #HTML5"
          logoUrl     ="../img/realisations/logo-metro.png"
          imgUrl      ="../img/realisations/metro-epicerie.jpg"/>

        <MyRealisation
          year        ="2015"
          agency      ="Tink"
          titleJob    ="Lead Front-end"
          project     ="desjardins-disnat"
          descClient  ="En 2014, le Mouvement Desjardins compte 6 millions de membres dont 400 000 entreprises, plus de 5000 dirigeants élus et 45 000 employés, qui gèrent un actif de 210 milliards de dollars canadiens."
          descProject ="Pour ce client ma mission consistait à l'intégration des maquettes dans un environnement .Net, le site est accessible double A de plus celui-ci devait être supporté par IE8 et +."
          hashtag     ="#Accessibilité AA #.Net #SCSS #HTML5"
          logoUrl     ="../img/realisations/logo-desjardins.png"
          imgUrl      ="../img/realisations/desjardins-disnat.jpg"/>

        <MyRealisation
          year        ="2015"
          agency      ="Tink"
          titleJob    ="Lead Front-end"
          project     ="tink"
          descClient  ="Tink est une agence de communications marketing et de solutions numériques aui figure au palmarès des 500 plus grandes sociétés au Québec."
          descProject ="Ma mission consistait à l'évaluation des tâches, l'intégration des maquettes dans le CMS Drupal ainsi qu'à l'ajout d'animations."
          hashtag     ="#Responsive #Drupal #SCSS #HTML5 #Agile #Motion design #Javascript"
          logoUrl     ="../img/realisations/logo-tink.png"
          imgUrl      ="../img/realisations/tink.jpg"/>

        <MyRealisation
          year        ="2015"
          agency      ="Tink"
          titleJob    ="Lead technique front-end"
          project     ="desjardins-assurances-generales"
          descClient  ="En 2014, le Mouvement Desjardins compte 6 millions de membres dont 400 000 entreprises, plus de 5000 dirigeants élus et 45 000 employés, qui gèrent un actif de 210 milliards de dollars canadiens."
          descProject ="Pour ce client ma mission consistait à l'évaluation des tâches, l'intégration des maquettes dans un environnement JAVA sous Liferay."
          hashtag     ="#Responsive #Accessibilité AA #Agile #Liferay"
          logoUrl     ="../img/realisations/logo-desjardins.png"
          imgUrl      ="../img/realisations/desjardins-assurances-generales.jpg"/>

        <MyRealisation
          year        ="2015"
          agency      ="Tink"
          titleJob    ="Lead Front-end"
          project     ="desjardins-investisseur-en-ligne"
          descClient  ="En 2014, le Mouvement Desjardins compte 6 millions de membres dont 400 000 entreprises, plus de 5000 dirigeants élus et 45 000 employés, qui gèrent un actif de 210 milliards de dollars canadiens."
          descProject ="Ma mission consistait à l'évaluation des tâches, l'intégration des maquettes dans un site statique bilingue et multiplateforme."
          hashtag     ="#Responsive #Agile #HTML5 #CSS3 #JQuery"
          logoUrl     ="../img/realisations/logo-desjardins.png"
          imgUrl      ="../img/realisations/desjardins-investisseur-en-ligne.jpg"/>

        <MyRealisation
          year        ="2014"
          agency      ="Tink"
          titleJob    ="Lead technique front-end"
          project     ="desjardins-monetico"
          descClient  ="En 2014, le Mouvement Desjardins compte 6 millions de membres dont 400 000 entreprises, plus de 5000 dirigeants élus et 45 000 employés, qui gèrent un actif de 210 milliards de dollars canadiens."
          descProject ="Pour ce client ma mission consistait à l'intégration des maquettes dans un site statique."
          hashtag     ="#PrixBoomerang #Responsive #Accessibilité #Agile #CSS3 #HTML5 #Motion design #Javascript #Parallax"
          logoUrl     ="../img/realisations/logo-desjardins.png"
          imgUrl      ="../img/realisations/desjardins-monetico.jpg"/>

        <MyRealisation
          year        ="2014"
          agency      ="Tink"
          titleJob    ="Développeur Front-end"
          project     ="st-hubert-poule-position"
          descClient  ="Reconnu pour son fameux poulet rôti à la broche, ses côtes levées et ses produits en épicerie, St-Hubert compte 115 restaurants situés au Québec, en Ontario et au Nouveau-Brunswick."
          descProject ="Pour ce client ma mission consistait à l'intégration du jeu web de la machine à gagner des prix."
          hashtag     ="#PrixBoomerang #Agile #CSS3 #HTML5 #Motion design #Responsive #Javascript"
          logoUrl     ="../img/realisations/logo-st-hubert.png"
          imgUrl      ="../img/realisations/st-hubert-poule-position.jpg"/>

        <MyRealisation
          year        ="2014"
          agency      ="Tink"
          titleJob    ="Développeur Front-end"
          project     ="amt"
          descClient  ="L'AMT est une agence gouvernementale, rattachée au ministère des Transports du Québec, elle coordonne l'ensemble du réseau des transports de la région montréalaise. (Train, Métro, Autobus)."
          descProject ="Pour ce client ma mission consistait à l'intégration des maquettes ainsi qu'à la division des tâches pour l'ensemble de l'équipe frontend. Un suivi sur l'avancement du frontend était également de ma responsabilité. Une formation en accessibilité et des défis techniques de taille pour ce site."
          hashtag     ="#PrixBoomerang #Responsive #Orchard #Accessible #Agile"
          logoUrl     ="../img/realisations/logo-amt.png"
          imgUrl      ="../img/realisations/amt.jpg"/>

        <MyRealisation
          year        ="2014"
          agency      ="Tink"
          titleJob    ="Consultant Front-end"
          project     ="metro-inc"
          descClient  ="Metro inc. est une entreprise québécoise de distribution alimentaire et pharmaceutique au Canada. En 2013, son chiffre d'affaires était de 11,4 milliards de dollars cad et elle employait 65 000 employés."
          descProject ="Pour ce client ma mission consistait à refondre le site corporatif. Ce site responsive utilise la parallax pour un effet de profondeur."
          hashtag     ="#PrixBoomerang #Responsive #Parallax #Agile"
          logoUrl     ="../img/realisations/logo-metro.png"
          imgUrl      ="../img/realisations/metro-inc.jpg"/>

        <MyRealisation
          year        ="2013"
          agency      ="Altimax"
          titleJob    ="Chargé de projet"
          project     ="la-plagne"
          descClient  ="La Plagne est une station de sports d'hiver de la vallée de la Tarentaise, dans le département de la Savoie en région Rhône-Alpes. Aujourd'hui, la station compte onze stations-villages."
          descProject ="Pour ce client ma mission consistait à la relation client, au suivi du projet et à la délégation du travail au sein des employés (designer, développeurs)."
          hashtag     ="#iOs #Application #Gestion d'équipe"
          logoUrl     ="../img/realisations/logo-la-plagne.png"
          imgUrl      ="../img/realisations/la-plagne.jpg"/>

        <MyRealisation
          year        ="2013"
          agency      ="Altimax"
          titleJob    ="Chargé de projet"
          project     ="mavic"
          descClient  ="Mavic est un équipementier de l'industrie du cycle. Propriété de Amer Sports Oyj, numéro un mondial du matériel de sport hors textile et chaussures avec un chiffre d'affaires de 1,7 milliard d'euros."
          descProject ="Pour ce client ma mission consistait à l élaboration des wireframes en collaboration étroite avec le client ainsi qu'au suivi du travail du directeur artistique."
          hashtag     ="#Responsive #wireframe #Relation Client"
          logoUrl     ="../img/realisations/logo-mavic.png"
          imgUrl      ="../img/realisations/mavic.jpg"/>

        <MyRealisation
          year        ="2013"
          agency      ="Altimax"
          titleJob    ="Chargé de projet"
          project     ="somfy"
          descClient  ="Somfy est le, #1 de la domotique en France, présent dans plus de 60 pays avec 7600 employés et ayant un chiffre d'affaires de près d'un milliard d'euros."
          descProject ="Pour ce client ma mission consistait à l'étude de la stratégie de la marque, à l'élaboration des wireframes, au suivi du projet ainsi qu'à la délégation du travail au sein des employés (designer, développeurs)."
          hashtag     ="#Responsive #Wireframe #Joomla #Relation Client"
          logoUrl     ="../img/realisations/logo-somfy.png"
          imgUrl      ="../img/realisations/somfy.jpg"/>
      </div>
    </div>
  </div>
</template>

<script>
import MyRealisation from '@/components/MyRealisation.vue'

export default {
  name: 'realisations',
  metaInfo: {
    title: 'Realisations'
  },
  components: {
    MyRealisation
  }
}
</script>
