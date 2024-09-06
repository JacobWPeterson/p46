export default {
  ident: "postcss",
  config: false,
  plugins: {
    "postcss-flexbugs-fixes": true,
    "postcss-preset-env": {
      autoprefixer: {
        flexbox: "no-2009",
      },
      stage: 3,
    },
    "postcss-normalize": true,
  },
};
