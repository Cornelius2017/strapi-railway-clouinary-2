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


      function checkPriority(){
        let uri = path;
        //let reg = new RegExp(/^https?:\/\/[^\/]*?((?:\/[^\/]*?){2})/ig);
        let reg = new RegExp(/[^/]*?((?:\/[^/]*?){2})/ig);
        let find_uri = path.replace(reg, '');
        let priority, changefreq;

        if(uri === find_uri) { 
          priority = 0.9;
          changefreq = config.changefreq 
        } 
        else { 
          priority = config.priority;
          changefreq = 'weekly' 
        }

        return { changefreq, priority };
      }
      let {priority, changefreq} = checkPriority();
      // Use default transformation for all other cases
      return {
        loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
        changefreq: changefreq,
        priority: priority,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        alternateRefs: config.alternateRefs ?? [],
      }
    },
  }