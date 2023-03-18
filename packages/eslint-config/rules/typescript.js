
module.exports = {

  /**
   * Good rule but do not play nicely with Promises
   * @see https://github.com/typescript-eslint/typescript-eslint/issues/1956
   * @see https://github.com/typescript-eslint/typescript-eslint/blob/v2.30.0/packages/eslint-plugin/docs/rules/no-invalid-void-type.md
   */
  "@typescript-eslint/no-invalid-void-type": ["off"],

  /**
   * I prefer to group function by usage
   * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/member-ordering.md
   */
  "@typescript-eslint/member-ordering": ["off"],

  /**
   * Just add line noise
   * @see https://github.com/typescript-eslint/typescript-eslint/blob/v4.15.2/packages/eslint-plugin/docs/rules/lines-between-class-members.md
   */
  "@typescript-eslint/lines-between-class-members": ["off"],

  /**
   * Stupid
   * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-readonly-parameter-types.md
   */
  "@typescript-eslint/prefer-readonly-parameter-types": ["off"],

  /**
   * Reconsider this in later date. This is needed for generic stuff when interface do not work
   * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-definitions.md
   */
  "@typescript-eslint/consistent-type-definitions": ["off"],

  /**
   * Just make things more verbose
   * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/generic-type-naming.md
   */
  "@typescript-eslint/generic-type-naming": ["off"],

  /**
   * It is common to use undefined and null as falsy
   * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/strict-boolean-expressions.md
   */
  "@typescript-eslint/strict-boolean-expressions": ["off"],

  /**
   * Silly
   * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-enum-initializers.md
   */
  "@typescript-eslint/prefer-enum-initializers": ["off"],

  /**
   * Use stroustrup style for braces
   * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/brace-style.md
   */
  "@typescript-eslint/brace-style": ["error", "stroustrup"],

  /**
   * Use double quotes everywhere
   * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/quotes.md
   */
  "@typescript-eslint/quotes": ["error", "double"],

  /**
   * Lets discuss this on PR
   * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-magic-numbers.md
   */
  "@typescript-eslint/no-magic-numbers": ["off"],

  /**
   * Promise callbacks make sense
   * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/unbound-method.md
   */
  "@typescript-eslint/unbound-method": ["error", {
    "ignoreStatic": true,
  }],

  /**
   * Allow for arrow functions to omit annotation
   * 
   * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/typedef.md
   */
  "@typescript-eslint/typedef": ["error", {
    "arrowParameter": false,
  }],

  /**
   * Allow for any in rest params
   * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-explicit-any.md
   */
  "@typescript-eslint/no-explicit-any": ["error", {
    "fixToUnknown": true,
    "ignoreRestArgs": true,
  }],

  /**
   * Allow for boolean and number in template literal
   * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/restrict-template-expressions.md
   */
  "@typescript-eslint/restrict-template-expressions": ["error", {
    "allowNumber": true,
    "allowBoolean": true,
  }],

  /**
   * Enforce semicolons
   * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/semi.md
   */
  "@typescript-eslint/semi": ["error"],

  /**
   * Enforce 2 space indentation across project
   * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/indent.md
   */
  "@typescript-eslint/indent": ["error", 2],

  /**
   * Allow for type aliases only in unions
   * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-type-alias.md
   */
  "@typescript-eslint/no-type-alias": ["error", {
    "allowAliases": "always",
    "allowCallbacks": "always",
    "allowLiterals": "always",
    "allowTupleTypes": "always",
    "allowGenerics": "always",
  }],

  /**
   * I prefer not to add extra space before paren
   * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/space-before-function-paren.md
   */
  "@typescript-eslint/space-before-function-paren": ["error", {
    "anonymous": "never",
    "named": "never",
    "asyncArrow": "never",
  }],

  /**
   * Extends default option by allowing object and Function
   * Revisit later
   * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-types.md
   */
  "@typescript-eslint/ban-types": ["error", {
    extendDefaults: false,
    types: {
      String: {
        message: "Use string instead",
        fixWith: "string",
      },
      Boolean: {
        message: "Use boolean instead",
        fixWith: "boolean",
      },
      Number: {
        message: "Use number instead",
        fixWith: "number",
      },
      Symbol: {
        message: "Use symbol instead",
        fixWith: "symbol",
      },
      Object: {
        message: [
          "The `Object` type actually means \"any non-nullish value\", so it is marginally better than `unknown`.",
          "- If you want a type meaning \"any object\", you probably want `Record<string, unknown>` instead.",
          "- If you want a type meaning \"any value\", you probably want `unknown` instead.",
        ].join("\n"),
      },
      "{}": {
        message: [
          "`{}` actually means \"any non-nullish value\".",
          "- If you want a type meaning \"any object\", you probably want `Record<string, unknown>` instead.",
          "- If you want a type meaning \"any value\", you probably want `unknown` instead.",
        ].join("\n"),
      },
    },
  }],

  /**
   * Allow for PascalCase, camelCase and UPPER_CASE
   * Revisit in the future UPPER_CASE
   * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md
   */
  "@typescript-eslint/naming-convention": ["error",
    {
      "selector": "variable",
      "format": ["camelCase", "PascalCase", "UPPER_CASE"],
    },
  ],

  /**
   * Allow typedefs
   * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md
   */
  "@typescript-eslint/no-use-before-define": ["error", { 
    "typedefs": false,
  }],

  /**
   * Extend comma dangle rules for ts
   * @see https://github.com/typescript-eslint/typescript-eslint/blob/v4.6.0/packages/eslint-plugin/docs/rules/comma-dangle.md
   */
  "@typescript-eslint/comma-dangle": ["error", {
    "arrays": "always-multiline",
    "objects": "always-multiline",
    "imports": "always-multiline",
    "exports": "always-multiline",
    "enums": "always-multiline",
    "tuples": "always-multiline",
    "generics": "always-multiline",
    "functions": "never",
  }],
};