import React from "react";
import { graphql, Link } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Layout from "../../components/Layout";
import CodeBlock from "../../components/CodeBlock";
import { MDXProvider } from "@mdx-js/react";
import classNames from "classnames";

const BlogPost = ({ data }) => {
  const tags = data.mdx.frontmatter.tags;

  return (
    <Layout pageTitle={data.mdx.frontmatter.title}>
      <div className="container mx-auto px-[10px]">
        <div className="flex flex-col md:flex-row gap-[5px] font-bold mt-[30px]">
          <div className="flex gap-[10px]">
            <h2>{data.mdx.slug.replace("/", "")}.</h2>
            <h2>{data.mdx.frontmatter.title}</h2>
          </div>
          {data.mdx.frontmatter.tags && (
            <div className="text-[#afafaf] flex gap-[5px]">
              {data.mdx.frontmatter.tags.map((tag) => (
                <Link to={`/tags#${tag}`} className="hover:text-[red]">
                  #{tag}
                </Link>
              ))}
            </div>
          )}
          <div className="md:ml-auto flex items-baseline flex gap-[10px] text-[#878787]">
            <i className="fa-solid fa-calendar"></i> {data.mdx.frontmatter.date}
          </div>
        </div>

        <div className="text-[#676767] mt-[20px]">
          <i className="fa-solid fa-id-card"></i>{" "}
          <span className="font-bold">글 내용</span>
        </div>

        <div className="mt-[10px]">
          <div className="markdown-body">
            <MDXProvider
              components={{
                pre: CodeBlock,
              }}
            >
              <MDXRenderer>{data.mdx.body}</MDXRenderer>
            </MDXProvider>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-[10px]">
        <div className="text-[#676767] mt-[20px]">
          <i className="fa-solid fa-list"></i>{" "}
          <span className="font-bold">글 목록</span>
        </div>
        <div className="flex flex-col gap-[20px] mt-[10px]">
          {data.allMdx.nodes.map((node) => (
            <div
              key={node.id}
              className="flex flex-col md:flex-row gap-[5px] font-bold"
            >
              <Link
                to={`/blog/${node.slug}`}
                className={classNames("flex gap-[10px]", {
                  "text-[red]": node.id == data.mdx.id,
                })}
              >
                <h2>{node.slug.replace("/", "")}.</h2>
                <h2>{node.frontmatter.title}</h2>
              </Link>
              {node.frontmatter.tags && (
                <div className="text-[#afafaf] flex gap-[5px]">
                  {node.frontmatter.tags.map((tag) => (
                    <Link to={`/tags#${tag}`} className="hover:text-[red]">
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}
              <Link
                to={`/blog/${node.slug}`}
                className="md:ml-auto flex items-baseline flex gap-[10px] text-[#878787] hover:text-[red]"
              >
                <i className="fa-solid fa-calendar"></i> {node.frontmatter.date}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "YY-MM-DD HH:MM")
        tags
      }
      id
      slug
      body
      tableOfContents
      headings {
        value
      }
    }

    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      nodes {
        frontmatter {
          date(formatString: "YY-MM-DD HH:MM")
          title
          tags
        }
        id
        slug
      }
    }
  }
`;
export default BlogPost;
