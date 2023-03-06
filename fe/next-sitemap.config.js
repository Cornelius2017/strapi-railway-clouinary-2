/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'http://localhost:3000/',
    generateRobotsTxt: true, // (optional)
    generateIndexSitemap: false,
    changefreq: 'daily',
    priority: 0.7,
    sitemapSize: 5000,
    exclude: ['/tag', '/tag/*', '/search', '/serversite.xml'],
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          allow: '/',
        },
        {
          userAgent: 'test-bot',
          allow: '/',
        },
        {
          userAgent: 'black-listed-bot',
          disallow: ['/tag', '/search'],
        },
      ],

      additionalSitemaps:[
        `${ process.env.SITE_URL }serversite.xml`
    ]
    },
    transform: async (config, path) => {
      // custom function to ignore the path
      // if (customIgnoreFunction(path)) {
      //   return null
      // }
  
      // only create changefreq along with path
      // returning partial properties will result in generation of XML field with only returned values.
      // if (customLimitedField(path)) {
      //   // This returns `path` & `changefreq`. Hence it will result in the generation of XML field with `path` and  `changefreq` properties only.
      //   return {
      //     loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      //     changefreq: config.changefreq,
      //   }
      // }

      // Use default transformation for all other cases
      return {
        loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
        changefreq: config.changefreq,
        priority: config.priority,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        alternateRefs: config.alternateRefs ?? [],
      }
    },
  }