import { Link, useStaticQuery, graphql } from "gatsby";
import React from "react";
import { Helmet } from "react-helmet";

function Layout({ pageTitle, children }) {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);

  return (
    <div className="h-full flex flex-col">
      <Helmet>
        <title>
          {pageTitle} | {data.site.siteMetadata.title}
        </title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown.min.css"
        />
      </Helmet>
      <header className="shadow">
        <div className="container pl-[10px] flex h-[50px] md:text-[20px] mx-auto  text-[#454545]">
          <Link to="/" className="mr-auto flex items-center font-bold">
            {data.site.siteMetadata.title}
          </Link>
          <div className="flex gap-[10px]">
            <Link to="/" className="flex items-center px-[10px]">
              <i className="fa-solid fa-list"></i>
            </Link>
            <Link to="/tags" className="flex items-center px-[10px]">
              <i className="fa-solid fa-tags"></i>
            </Link>
          </div>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}

export default Layout;
