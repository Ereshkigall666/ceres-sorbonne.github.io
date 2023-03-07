import { Tag } from "./layout"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as React from 'react'


export const LongCard = ({ postData, toggleTag, selectedTags }) => {
    const { date, slug, image, collection } = postData.fields
    const { title, tags, abstract, sound } = postData.frontmatter

    return (
        <div className="long-card">
            <Link className="card-link" to={`/${collection}/` + slug} />
            {image ? (<GatsbyImage className="image-card" image={getImage(image)} alt={title}/>) : (<img className="image-card empty"/>)}
            <div className="description">
                <h4>{title}</h4>
                {tags && (<div class="small-tags-container">
                    {tags ? tags.map(t => <Tag tagName={t} selectedTags={selectedTags} toggleTag={toggleTag} />) : ""}
                </div>)}
                {
                    sound && (
                        <audio controls>
                            <source src={sound} type="audio/wav" />
                        </audio>
                    )
                }
                <p class="text-sample">
                    {abstract ? abstract : postData.excerpt}
                </p>
            </div>
        </div>
    )
}