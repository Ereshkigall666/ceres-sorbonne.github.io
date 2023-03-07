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
            {image ? (<GatsbyImage className="image-card" image={getImage(image)} alt={title}/>) : (<img className="image-card empty"/>)}
            <h4>{title}</h4>
            {tags && (<div className="small-tags-container">
                {tags ? tags.map(t => <Tag tagName={t} selectedTags={selectedTags} toggleTag={toggleTag} />) : ""}
            </div>)}
            <p className="date">
                <time dateTime={date}>{date}</time>
            </p>
            <p className="text-sample">
                {content}
            </p>
        </div>
    )
}