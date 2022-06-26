const { mergeWithRules } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");

module.exports = (webpackConfigEnv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "ts",
    projectName: "app-store",
    webpackConfigEnv,
  });

  return mergeWithRules({
    module: {
      rules: {
        test: "match",
        use: "replace",
      },
    },
  })(defaultConfig, {
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            // Use require.resolve to ensure the correct loader is used
            require.resolve("style-loader", {
              paths: [require.resolve("webpack-config-single-spa")],
            }),
            require.resolve("css-loader", {
              paths: [require.resolve("webpack-config-single-spa")],
            }),
            {
              loader: require.resolve("postcss-loader"),
              options: {
                postcssOptions: {
                  plugins: {
                    "postcss-prefix-selector": {
                      prefix: "#single-spa-application\\:\\@ts\\/app-store",
                      transform(
                        prefix,
                        selector,
                        prefixedSelector,
                        filePath,
                        rule
                      ) {
                        if (selector.match(/^(html|body)/)) {
                          return selector.replace(/^([^\s]*)/, `$1 ${prefix}`);
                        }

                        if (filePath.match(/node_modules/)) {
                          return selector; // Do not prefix styles imported from node_modules
                        }

                        const annotation = rule.prev();
                        if (
                          annotation?.type === "comment" &&
                          annotation.text.trim() === "no-prefix"
                        ) {
                          return selector; // Do not prefix style rules that are preceded by: /* no-prefix */
                        }

                        return prefixedSelector;
                      },
                    },
                    autoprefixer: {
                      browsers: ["last 4 versions"],
                    },
                  },
                },
              },
            },
          ],
        },
      ],
    },
  });
};
