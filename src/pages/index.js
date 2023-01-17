import { graphql } from "gatsby"
import * as React from 'react'
import Layout from '../components/layout'
import Planet from '../images/5.png'
import { Card } from "../components/card"
import {filterNodes} from "../helpers"

import "../style/accueil.css"

const Home = ({ data }) => {
    const nodes = data.allMarkdownRemark.nodes
    return (
        <Layout>
            {/* petite astuce pour passer une fonction qui rend le composant actuel au layout pour que le layout puisse passer les paramètres nécessaires au filtrage*/}
            {(toggleTag, tags, search) => { 
                const filtered = filterNodes(nodes, search, tags);
                return (
                    <div>
                        <HomeHeader />
                        <div id="last-posts-wrapper">
                            <h2 id="last-posts">Dernières publications</h2>
                            <div id="cards-wrapper">
                                <div id="cards-container">
                                    {filtered.map(el => <Card postData={el} toggleTag={toggleTag} selectedTags={tags}/>)}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            }
        </Layout>
    )
}

const HomeHeader = () => (
        <header>
            <img id="landing-image" src={Planet} style={{maxWidth: "100%", margin: 0}}/>
            <h1 id="landing-title">Ceres</h1>
            <div id="landing-blocks-container">
                <div className="landing-block">
                    <h2>Centre d’expérimentation en méthodes numériques pour les recherches en Sciences Humaines et Sociales</h2>
                    <p>
                    Le Centre d’expérimentation en méthodes numériques pour les recherches en Sciences Humaines et Sociales (CERES) est une unité de service de la Faculté des Lettres de Sorbonne Université, créée en février 2021, dont la mission principale est d’offrir un accompagnement aux chercheurs et chercheuses, doctorants et doctorantes en SHS souhaitant recourir à des méthodes numériques et à des outils informatiques pour développer leurs recherches.
                    </p>
                    <p>
                    Les actions de CERES sont organisées autour de trois axes principaux : 
                        +     les réseaux sociaux numériques
                        +     les sources patrimoniales numérisées
                        +      le déploiement d’une infrastructure transversale de gestion des corpus et des données analytiques associées
                    </p>
                    <p>
                    CERES offre un accompagnement technique et méthodologique dans la prise en main d’outils informatiques disponibles et œuvre au déploiement d’outils informatiques utiles à la communauté des chercheurs et chercheuses de la Faculté des Lettres. L’unité de service conduit par ailleurs une réflexion sur le statut épistémologique de ces outils et méthodes dans la recherche en SHS, mettant en avant le caractère central de l’activité interprétative du chercheur ou de la chercheuse face aux outils informatiques. Plus largement, il s’agit pour le CERES de contribuer à l’émergence de nouvelles pratiques de recherche en milieu numérique, au service des approches spécifiques des SHS. Le CERES est fort d’une <a href="../membres">équipe interdisciplinaire</a>.
                    </p>
                    <div id="buttons-container">
                        <a className="button" href="http://memes.sorbonne-universite.fr/">En savoir plus ↗</a>
                    </div>
                </div>
                <img className="landing-block" src={Planet} />
            </div>
        </header>
        )

export const query = graphql`
  query MyQuery {
    allMarkdownRemark(sort: {fields: fields___date, order: DESC}, filter: {fields: {date: {ne: null}}}, limit: 999) {
        nodes {
            frontmatter {
                tags
                title
                author
                abstract
            }
            fields {
                collection
                date(formatString: "DD MMMM, YYYY", locale: "fr")
                slug
                image {
                    publicURL
                }
                sound {
                    publicURL
                }
            }
            excerpt
        }
    }
}

`

export default Home