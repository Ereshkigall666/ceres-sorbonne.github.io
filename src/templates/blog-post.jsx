import { graphql } from "gatsby"
import * as React from 'react'
import Layout from '../components/layout'
import '../style/article.css'

const BlogPost = ({ data, children }) => {
    const date = data.markdownRemark.fields.date
    const { author, title, tags, abstract, sound } = data.markdownRemark.frontmatter
    const authorName = author ? data.site.siteMetadata.authors.find(el => el.id === author).name : ""
    return (
        <Layout>
            <main>
                {data.markdownRemark.tableOfContents && (<div id="toc-container">
                    <nav dangerouslySetInnerHTML={{ __html: data.markdownRemark.tableOfContents }} />
                </div>)
                }
                <div id="article-container">
                    <header>
                        <h1>{title}</h1>
                        {author && date && (<span id="article-meta">Un article écrit par {authorName} le {date}</span>)}
                        <button className="button print" onClick={() => { window.print(); }}>&darr; Enregistrer au format pdf</button>
                        {tags && (<div id="tags-container">
                            {tags ? tags.map((el, i) => <a className="tag" key={i} >{el}</a>) : ''}
                        </div>)}
                    </header>
                    <article id="article">
                        {abstract ? <aside><p>{abstract}</p></aside> : ''}
                        {
                            sound && (
                                <audio controls>
                                    <source src={sound} type="audio/wav" />
                                </audio>
                            )
                        }
                        <section dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
                    </article>
                </div>
            </main>
        </Layout>
    )
}

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title,
        authors {
          id,
          name
        }
      }
    }
    markdownRemark(fields: {slug: {eq: $slug}}) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        author
        title
        tags
        abstract
        sound
      }
      fields {
        date(formatString: "DD MMMM, YYYY", locale: "fr")
        slug
        collection
      }
      tableOfContents
    }
  }
`

export default BlogPost