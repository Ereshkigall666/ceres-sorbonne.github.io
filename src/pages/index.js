import { graphql, Link } from "gatsby"
import * as React from 'react'
import Layout from '../components/layout'
import Planet from '../images/5.png'
import { Card } from "../components/card"
import { filterNodes, isDateOnCallendar } from "../helpers"
import Calendar from 'react-calendar'

import "../style/accueil.css"

const Home = ({ data }) => {
    const nodes = data.allMarkdownRemark.nodes
    const lastPosts = React.useRef(null)
    return (
        <Layout nodes={nodes}>
            {/* petite astuce pour passer une fonction qui rend le composant actuel au layout pour que le layout puisse passer les paramètres nécessaires au filtrage*/}
            {(toggleTag, tags, search) => {
                const filtered = filterNodes(nodes, search, tags);
                if (lastPosts && lastPosts.current && filtered.length !== nodes.length) {
                    lastPosts.current.scrollIntoView()
                }
                return (
                    <div>
                        <HomeHeader nodes={nodes} />
                            <h2 ref={lastPosts} id="last-posts">Dernières publications</h2>
                            <div id="cards-container">
                                {filtered.map(el => <Card postData={el} toggleTag={toggleTag} selectedTags={tags} />)}
                            </div>
                    </div>
                )
            }
            }
        </Layout>
    )
}

const HomeHeader = ({ nodes }) => (
    <header>
        <img id="landing-image" src={Planet} style={{ maxWidth: "100%", margin: 0 }} />
        <h1 id="landing-title">Ceres</h1>
        <div id="landing-blocks-container">
            <div className="landing-block">
                <h2>Centre d’expérimentation en méthodes numériques pour les recherches en Sciences Humaines et Sociales</h2>
                <p>
                    Le Centre d’expérimentation en méthodes numériques pour les recherches en Sciences Humaines et Sociales (CERES) est une unité de service de la Faculté des Lettres de Sorbonne Université, créée en février 2021, dont la mission principale est d’offrir un accompagnement aux chercheurs et chercheuses, doctorants et doctorantes en SHS souhaitant recourir à des méthodes numériques et à des outils informatiques pour développer leurs recherches.
                </p>
                <p>
                    Les actions de CERES sont organisées autour de trois axes principaux :
                    <ul>
                        <li> les réseaux sociaux numériques </li>
                        <li> les sources patrimoniales numérisées </li>
                        <li> le déploiement d’une infrastructure transversale de gestion des corpus et des données analytiques associées </li>
                    </ul>
                </p>
                <p>
                    CERES offre un accompagnement technique et méthodologique dans la prise en main d’outils informatiques disponibles et œuvre au déploiement d’outils informatiques utiles à la communauté des chercheurs et chercheuses de la Faculté des Lettres. L’unité de service conduit par ailleurs une réflexion sur le statut épistémologique de ces outils et méthodes dans la recherche en SHS, mettant en avant le caractère central de l’activité interprétative du chercheur ou de la chercheuse face aux outils informatiques. Plus largement, il s’agit pour le CERES de contribuer à l’émergence de nouvelles pratiques de recherche en milieu numérique, au service des approches spécifiques des SHS. Le CERES est fort d’une <a href="/membres">équipe interdisciplinaire</a>.
                </p>
            </div>
            <div className="landing-block">
                <h3>Évènements à venir</h3>
                <Calendar maxDetail="month" minDetail="month" className="landing-block" tileContent={({ date }) => {
                    const events = nodes.filter(node => node.frontmatter.event)
                    for (const event of events) {
                        if (isDateOnCallendar({ calendarDate: date, eventDate: event.fields.dateRaw })) {
                            const title = event.frontmatter.title.length > 25 ? event.frontmatter.title.slice(0, 23) + "..." : event.frontmatter.title
                            return <Link to={`/${event.fields.collection}/` + event.fields.slug}>{title}</Link>
                        }
                    }
                    return null
                }
                } />
                {/* <img className="landing-block" src={Planet} /> */}
            </div>
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
                sound
                event
            }
            fields {
                collection
                date(formatString: "DD MMMM, YYYY", locale: "fr")
                dateRaw: date
                slug
                image {
                    publicURL
                }
            }
            excerpt(pruneLength: 600)
        }
    }
}

`

export default Home