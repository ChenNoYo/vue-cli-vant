module.exports = {
  extends: ["plugin:vue/essential", "@vue/standard"],
  root: true,
  env: {
    amd: true,
    es6: true,
    browser: true,
    node: true
  },
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module"
  },
  plugins: ["html", "vue"],
  rules: {
    // 1 off 2 warn 3 error
    // always never
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    quotes: [1, "single"], // "double" (默认) 要求尽可能地使用双引号   "single" 要求尽可能地使用单引号  "backtick" 要求尽可能地使用反勾号
    semi: [1, "never"], // 语句强制分号结尾
    indent: [2, 2]
  }
};
