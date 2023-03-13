import { getServerSideSitemap } from 'next-sitemap';
import { GetServerSideProps } from 'next';

const SITE_URL = process.env.API_URL;

export const GetPost = async (collection) => {
	const data = await fetch(`${SITE_URL}${collection}`, {
	  method: "GET",
	});
	const res = await data.json();
	
	return res;
};


export const getServerSideProps = async (ctx) => {
  const siteUrl = process.env.SITE_URL;

  const news_data = await GetPost('news');
  const news = news_data?.data.map((data) => ({
    loc: `${siteUrl}news/${data.attributes.slug}`,
    lastmod: new Date().toISOString(),
	changefreq: 'weekly',
	priority: 0.8
  }));

  const top_news_data = await GetPost('top-news');
  const top_news = top_news_data?.data.map((data) => ({
    loc: `${siteUrl}top-news/${data.attributes.slug}`,
    lastmod: new Date().toISOString(),
	changefreq: 'weekly',
	priority: 0.8
  }));

  const articles_data = await GetPost('articles');
  const articles = articles_data?.data.map((data) => ({
    loc: `${siteUrl}articles/${data.attributes.slug}`,
    lastmod: new Date().toISOString(),
	changefreq: 'weekly',
	priority: 0.8
  }));

  const beginners_data = await GetPost('beginners');
  const beginners = beginners_data?.data.map((data) => ({
    loc: `${siteUrl}beginners/${data.attributes.slug}`,
    lastmod: new Date().toISOString(),
	changefreq: 'weekly',
	priority: 0.8
  }));

  const youtube_data = await GetPost('you-tubes');
  const youtube = youtube_data?.data.map((data) => ({
    loc: `${siteUrl}you-tubes/${data.attributes.slug}`,
    lastmod: new Date().toISOString(),
	changefreq: 'weekly',
	priority: 0.8
  }));

 
  const news_main = ({
    loc: `${siteUrl}news/`,
    lastmod: new Date().toISOString(),
	changefreq: 'weekly',
	priority: 0.9
  });

  const top_news_main = ({
    loc: `${siteUrl}top-news/`,
    lastmod: new Date().toISOString(),
	changefreq: 'weekly',
	priority: 0.9
  });

  const articles_main = ({
    loc: `${siteUrl}articles/`,
    lastmod: new Date().toISOString(),
	changefreq: 'weekly',
	priority: 0.9
  });

  const beginners_main = ({
    loc: `${siteUrl}beginners/`,
    lastmod: new Date().toISOString(),
	changefreq: 'weekly',
	priority: 0.9
  });

  const youtube_main = ({
    loc: `${siteUrl}you-tubes/`,
    lastmod: new Date().toISOString(),
	changefreq: 'weekly',
	priority: 0.9
  });

  const main = ({
    loc: `${siteUrl}`,
    lastmod: new Date().toISOString(),
	changefreq: 'daily',
	priority: 1
  });

  const fields = [...news, ...top_news, ...articles, ...beginners, ...youtube, news_main, top_news_main, articles_main, beginners_main, youtube_main, main];

	return getServerSideSitemap(ctx, fields);
};


export default () => {};