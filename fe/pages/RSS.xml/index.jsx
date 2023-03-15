
import React from "react";
import truncateStr from "@/components/_fn/truncate";



const postsRssXml = (posts) => {
    let latestPostDate = "";
    let rssItemsXml = "";
    const siteUrl = process.env.SITE_URL;

    posts.forEach(post => {
        post.forEach(item => {
            const postDate = Date.parse(item.attributes.createdAt);
            if (!latestPostDate || postDate > Date.parse(latestPostDate)) {
                latestPostDate = item.attributes.createdAt;
            }
            rssItemsXml += `
            <item>
            <title>${item.attributes.title}</title>
            <link>
            ${siteUrl}${item.attributes.slug}
            </link>
            <pubDate>${item.attributes.createdAt}</pubDate>
            <image>
            <url>${item.attributes.img.data?.attributes.url}</url>
            </image>
            <description>
            <![CDATA[${truncateStr(item.attributes.content, 100)}]]>
            </description>
          </item>`;
        });
       
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
          <description> ITG News </description>
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


        const fields = [news.data, top_news.data, articles.data, beginners.data];

        res.setHeader("Content-Type", "text/xml");
        res.write(getRssXml(fields));
        res.end();

        return { fields }

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