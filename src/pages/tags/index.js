import { graphql, Link } from "gatsby";
import React from "react";
import Layout from "../../components/Layout";

const TagsPage = ({ data }) => {
  const tagPosts = {};

  data.allMdx.nodes.forEach((node) => {
    node.frontmatter.tags?.forEach((tag) => {
      if (!tagPosts[tag]) {
        tagPosts[tag] = [];
      }

      tagPosts[tag].push(node);
    });
  });

  return (
    <Layout pageTitle="태그 목록">
      <div className="container mx-auto">
        <div className="text-[#676767] mt-[20px] px-[10px]">
          <i className="fa-solid fa-tags"></i>{" "}
          <span className="font-bold">태그 목록</span>
        </div>
        <div className="flex flex-col gap-[20px] mt-[10px]">
          {data.allMdx.group.map((node) => (
            <div
              id={node.tag}
              key={node.tag}
              className="shadow py-[20px] px-[10px]"
            >
              <div className="text-[#676767] font-bold">
                <h2>
                  <i className="fa-solid fa-tag"></i> {node.tag}, (
                  {node.totalCount}개)
                </h2>
              </div>

              <div className="flex flex-col gap-[20px] font-bold mt-[20px]">
                {tagPosts[node.tag].map((mdxNode) => (
                  <div
                    key={node.tag + "___" + mdxNode.id}
                    className="flex flex-col md:flex-row gap-[5px] font-bold"
                  >
                    <Link
                      to={`/blog/${mdxNode.slug}`}
                      className="flex gap-[10px] hover:text-[red]"
                    >
                      <h2>{mdxNode.slug.replace("/", "")}.</h2>
                      <h2>{mdxNode.frontmatter.title}</h2>
                    </Link>
                    <Link
                      to={`/blog/${mdxNode.slug}`}
                      className="md:ml-auto flex items-baseline flex gap-[10px] text-[#878787] hover:text-[red]"
                    >
                      <i className="fa-solid fa-calendar"></i>{" "}
                      {mdxNode.frontmatter.date}
                    </Link>
                  </div>
                ))}
              </div>
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
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }

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

export default TagsPage;
