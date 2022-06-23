import { graphql, Link } from "gatsby";
import React from "react";
import Layout from "../components/Layout";

const IndexPage = ({ data }) => {
  return (
    <Layout pageTitle="글 목록">
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
                className="flex gap-[10px] hover:text-[red]"
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
  query {
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

export default IndexPage;
