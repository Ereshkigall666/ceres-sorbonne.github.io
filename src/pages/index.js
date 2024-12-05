import { graphql, Link } from "gatsby"
import * as React from 'react'
import Calendar from 'react-calendar'
import { Card } from "../components/card"
import Layout from '../components/layout'
import { filterNodes, isDateOnCallendar } from "../helpers"
import Planet from '../images/ceres-dither-1000-serpentine.png'
import LogoSorbonne from '../images/lettres-logo-white.svg'
import LogoHDEA from '../images/logo-hdea.jpg'

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
                            {filtered.map((el, index) => <Card postData={el} key={index} toggleTag={toggleTag} selectedTags={tags} />)}
                        </div>
                    </div>
                )
            }
            }
        </Layout>
    )
}

const HomeHeader = ({ nodes }) => {
    const [imageClass, setImageClass] = React.useState("")
    setTimeout(() => setImageClass('full'), 0)
    return (<header>
        <div className="image-container">
            <img id="landing-image" src={Planet} style={{ maxWidth: "100%", margin: 0 }} className={imageClass} />
            {/* <div class="gradient-overlay"></div> */}
            <img id="landing-logo" src={LogoHDEA} style={{ maxWidth: "100%", maxHeight: "100%", margin: 0 }} />
            <img id="landing-sorbonne" src={LogoSorbonne} style={{ maxWidth: "100%", margin: 0, height: "194px", width: "500px" }} />
        </div>

        <div id="landing-blocks-container">
            <div className="landing-block text">
                <h2><center>HDEA</center></h2>
                <p>
                    L’unité Histoire et dynamique des espaces anglophones (HDEA, UR 4086) est une unité de Sorbonne Université qui rassemble principalement des membres de la 11e section du CNU, travaillant sur les questions politiques, sociales, économiques et culturelles des pays anglophones.
                    </p>
                    <p>Pour 2025-2030, ses travaux sont structurés en trois axes principaux:
                        <ol>
                            <li><strong>Savoirs et cultures</strong></li> 
                            <ul>
                                <li>
                                    Circulations, échanges et transferts culturels.
                                </li>
                                <li>
                                    Religion(s) et spiritualités.
                                </li>
                                <li>
                                    Médias, images et cultures populaires.
                                </li>
                            </ul>
                            <li><strong>Sociétés et gouvernements</strong></li>
                            <ul>
                                <li>
                                    Dynamiques économiques et sociales.
                                </li>
                                <li>
                                    Politiques publiques – santé , famille, éducation.
                                </li>
                                <li>
                                    Droit et relations internationales.
                                </li>

                            </ul>
                            <li><strong>Nature, Espaces et Sociétés</strong></li>
                            <ul>
                                <li>
                                    Études environnementales.
                                </li>
                                <li>
                                    Études californiennes.
                                </li>
                                <li>
                                    Territoires urbains.
                                </li>

                            </ul>

                        </ol>
                </p>
            </div>
            <div className="landing-block">
                <h3>Évènements à venir</h3>
                <Calendar locale="fr-FR" maxDetail="month" minDetail="month" className="landing-block" tileContent={({ date }) => {
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
    </header>)
}

export const query = graphql`
  query MyQuery {
    site {
        siteMetadata {
            title
        }
    }
    allMarkdownRemark(sort: {fields: {date: DESC}}, filter: {fields: {date: {ne: null}}}, limit: 999) {
        nodes {
            frontmatter {
                tags
                title
                author
                abstract
                sound
                event
                uuid
                prettyName
            }
            fields {
                collection
                date(formatString: "DD MMMM, YYYY", locale: "fr")
                dateRaw: date
                slug
                image {
                    childImageSharp {
                        gatsbyImageData(placeholder: TRACED_SVG, width: 400)
                    }
                }
            }
            excerpt(pruneLength: 600)
        }
    }
}

`

export default Home
