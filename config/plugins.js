module.exports = ({ env }) => ({
    'users-permissions': {
      config: {
      jwtSecret: env('JWT_SECRET'),
      },
    },
    graphql: {
      config: {
        endpoint: '/graphql',
        shadowCRUD: true,
        playgroundAlways: true,
        depthLimit: 7,
        amountLimit: 100,
        apolloServer: {
          tracing: false,
        },
      },
    },
    upload: {
      config: {
        provider: 'cloudinary',
        providerOptions: {
          cloud_name: env('CLOUDINARY_NAME'),
          api_key: env('CLOUDINARY_KEY'),
          api_secret: env('CLOUDINARY_SECRET'),
        },
        actionOptions: {
          upload: {},
          delete: {},
        },
      },
    },

    'custom-slug': {
      enabled: true,
      resolve: './src/plugins/custom-slug'
    },

    'ai-text-generation': {
      enabled: true,
      config: {
        apiToken: process.env.OPEN_AI_API_TOKEN,
      },
    },
    

  });
