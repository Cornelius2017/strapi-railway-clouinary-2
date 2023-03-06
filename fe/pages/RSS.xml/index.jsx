
import React from "react";
import { NextPageContext } from "next";
import { GetServerSideProps } from 'next';
import truncateStr from "@/components/_fn/truncate";



const postsRssXml = (posts) => {
    let latestPostDate = "";
    let rssItemsXml = "";
    const siteUrl = process.env.SITE_URL;

    posts.forEach(post => {
        const postDate = Date.parse(post.createdAt);
        if (!latestPostDate || postDate > Date.parse(latestPostDate)) {
            latestPostDate = post.createdAt;
        }
        rssItemsXml += `
        <item>
        <title>${post.attributes.title}</title>
        <link>
        ${siteUrl}${post.attributes.slug}
        </link>
        <pubDate>${post.attributes.createdAt}</pubDate>
        <image>
        <url>${post.attributes.img.data.attributes.url}</url>
        </image>
        <description>
        <![CDATA[${truncateStr(post.attributes.content, 100)}]]>
        </description>
      </item>`;
    });
    return {
        rssItemsXml,
        latestPostDate
    };
};

const getRssXml = (posts) => {
    const { rssItemsXml, latestPostDate } = postsRssXml(posts);
    return `<?xml version="1.0" ?>
    <rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
      <channel>
          <title> ITG </title>
          <link>/</link>
          <description> </description>
          <language>ru</language>
          <lastBuildDate>${latestPostDate}</lastBuildDate>
          ${rssItemsXml}
      </channel>
    </rss>`;
};

export default class Rss extends React.Component {
    static async getInitialProps({ res }) {
        const API_URL = process.env.API_URL;

        const news_data = await fetch(`${API_URL}news?populate=*`);
        const top_news_data = await fetch(`${API_URL}top-news?populate=*`);
        const articles_data = await fetch(`${API_URL}articles?populate=*`);
        const beginners_data = await fetch(`${API_URL}beginners?populate=*`);

        const news = await news_data.json();
        const top_news = await top_news_data.json();
        const articles = await articles_data.json();
        const beginners = await beginners_data.json();

        if (!res) {
            return;
        }


        res.setHeader("Content-Type", "text/xml");
        res.write(getRssXml(news.data));
        res.end();

        return { news, top_news, articles, beginners }

    }

    render() { }
    // render() {
    //     return <div>

    //         <div>
    //             {this.props.news.data.map(i => (
    //                 i.attributes.title
    //             ))}
    //         </div>

    //         <div>
    //             {this.props.top_news.data.map(i => (
    //                 i.attributes.title
    //             ))}
    //         </div>

    //         <div>
    //             {this.props.articles.data.map(i => (
    //                 i.attributes.title
    //             ))}
    //         </div>

    //         <div>
    //             {this.props.beginners.data.map(i => (
    //                 i.attributes.title
    //             ))}
    //         </div>

    //     </div>
    // }


}