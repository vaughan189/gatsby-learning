import React from "react"
import { Link, graphql } from "gatsby"
import Helmet from 'react-helmet';

import Layout from "../components/layout"
import SEO from "../components/seo"
import BuyButton from '../components/BuyButton'
import { rhythm, scale } from "../utils/typography"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  const images = post.frontmatter.image
  .map(x => ({
    name: x.name,
    src: require(`./../../content/assets${post.frontmatter.path}${x.src}.jpg`)
  }));

  return (
    <Layout location={location} title={siteTitle}>
      <Helmet htmlAttributes={{ lang: 'en' }}>
        <title>${siteTitle}</title>
        <link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.0.11/default/snipcart.css" />
        <div id="snipcart" data-api-key="ZGEyNDMwYTQtYTZkOC00NmEwLWJiYjgtMTZmZGQwMjE5NjUzNjM3MjI2Mzc1OTQyMzgxMTEz" hidden></div>
        <script src="https://cdn.snipcart.com/themes/v3.0.11/default/snipcart.js"></script>
      </Helmet>

      <SEO title={post.frontmatter.title} description={post.frontmatter.description || post.excerpt}/>
      <article>
        <header>
          <h1 style={{ marginTop: rhythm(1), marginBottom: 0 }}>{post.frontmatter.title}</h1>
          <p style={{ ...scale(-1 / 5), display: `block`, marginBottom: rhythm(1) }}>{post.frontmatter.date}</p>
          <img src={post.frontmatter.image} alt={post.frontmatter.title}></img>

          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <BuyButton post={post.frontmatter} images={images}></BuyButton>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr style={{ marginBottom: rhythm(1) }}/>
        <footer>
        </footer>
      </article>

      <nav>
        <ul style={{ display: `flex`, flexWrap: `wrap`, justifyContent: `space-between`, listStyle: `none`, padding: 0}}>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql `
    query BlogPostBySlug($slug: String!) {
    site {
        siteMetadata {
        title
        }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
        id
        excerpt
        html
        frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        price
        path
        description
        customField { 
            name
            values 
        }
      }
    }
  }
`
