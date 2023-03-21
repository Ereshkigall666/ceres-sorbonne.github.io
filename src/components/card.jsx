import { Tag } from "./layout"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as React from 'react'


export const Card = ({ postData, toggleTag, selectedTags }) => {
    const { date, slug, image, collection } = postData.fields
    const { title, tags, abstract } = postData.frontmatter
    const content = abstract ? abstract : postData.excerpt

    return (
        <div className="card">
            <Link className="card-link" to={`/${collection}/` + slug} />
            {image ? (<GatsbyImage className="image-card" image={getImage(image)} alt={title} />) : (<img className="image-card" />)}
            <h4>{title}</h4>
            <div className="card-details">
                <time dateTime={date}>{date}</time> • <Link className="section-name" to={`/${collection}`}>{collection}</Link>
            </div>
            {tags && (<div className="small-tags-container">
                {tags ? tags.map(t => <Tag tagName={t} selectedTags={selectedTags} toggleTag={toggleTag} />) : ""}
            </div>)}
            <p className="text-sample">
                {content}
            </p>
        </div>
    )
}