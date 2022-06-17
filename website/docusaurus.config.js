// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Mazzaroth",
  tagline: "",
  url: "https://mazzaroth.io",
  baseUrl: "/docs/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "kochavalabs", // Usually your GitHub org/user name.
  projectName: "docs", // Usually your repo name.
  trailingSlash: false,
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: "../docs",
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/kochavalabs/docs/tree/main/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
    [
      //Current limitations on styling for redocusaurus in the
      //redocusaurus documentation:
      //https://redocusaurus.vercel.app/docs/getting-started/theme-options#theme-optional-object
      "redocusaurus",
      {
        specs: [
          {
            route: "/api/",
            spec: "openapi/openapi.yaml",
          },
        ],
        theme: {
          theme: {
            rightPanel: {
              backgroundColor: "#3F4746",
            },
          },
          options: {
            // https://github.com/Redocly/redoc#redoc-options-object
            disableSearch: true,
            scrollYOffset: 60,
          },
        },
      },
    ],
  ],
  stylesheets: [
    "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400&display=swap",
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        // title: "Mazzaroth",
        logo: {
          alt: "Mazzaroth Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "doc",
            docId: "Getting_Started",
            position: "left",
            label: "Tutorial",
          },
          {
            position: "left",
            label: "API Reference",
            to: "/api",
          },
          {
            href: "https://github.com/kochavalabs",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Tutorial",
                to: "/docs/docs/Getting_Started",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Twitter",
                href: "https://twitter.com/kochavaofficial",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/kochavalabs",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Mazzaroth`,
      },
      prism: {
        theme: {
          ...lightCodeTheme,
          ...{
            plain: { backgroundColor: "white", color: "#353C3B" },
          },
        },
        darkTheme: {
          ...darkCodeTheme,
          ...{
            plain: { backgroundColor: "#353C3B", color: "#F5F6F6" },
          },
        },
      },
    }),
};

module.exports = config;
