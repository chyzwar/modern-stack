
module.exports = {
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "jsx": true,
    "ecmaVersion": 2019,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    },
    "tsconfigRootDir": __dirname,
    "project": [
      "./tsconfig.json"
    ]
  },
  "env": {
    "browser": true,
    "node": false,
    "jest": true,
  },
  "globals": {
    "globalThis": true,
    "module": true,
  },
  "plugins": [
    "@typescript-eslint",
    "import",
    "jest",
    "css-modules",
    "react",
    "react-hooks"
  ],
  "extends": [
    "plugin:@typescript-eslint/eslint-recommended",
    "eslint:recommended",
    "plugin:css-modules/recommended",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  "settings": {
    "react": {
      "pragma": "React",  
      "version": "detect",
    },
  },
  "overrides": [
    {
      "files": ["*.js"],
      "rules": {
      }
    }
  ]
};