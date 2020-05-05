module.exports = {
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: '鉄道事典（趣味）',
        short_name: '鉄道事典（趣味）',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'markdown-pages',
        path: `${__dirname}/content/markdown`
      },
    },
    'gatsby-transformer-remark',
  ],
}
