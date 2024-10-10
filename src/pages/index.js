import { graphql, Link } from "gatsby"
import * as React from 'react'
import Calendar from 'react-calendar'
import { Card } from "../components/card"
import Layout from '../components/layout'
import { filterNodes, isDateOnCallendar } from "../helpers"
import Planet from '../images/ceres-dither-1000-serpentine.png'
import LogoSorbonne from '../images/lettres-logo-white.svg'
import LogoCeres from '../images/LOGO_CERES_SOMBRE-2.png'

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
            <img id="landing-logo" src={LogoCeres} style={{ maxWidth: "100%", margin: 0 }} />
            <img id="landing-sorbonne" src={LogoSorbonne} style={{ maxWidth: "100%", margin: 0, height: "194px", width: "500px" }} />
        </div>

        <div id="landing-blocks-container">
            <div className="landing-block text">
                <h2>Lorem Ipsum Labs</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. 
                    <ul>
                        <li> Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.  </li>
                        <li> Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.  </li>
                        <li> lUt enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</li>
                    </ul>
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
