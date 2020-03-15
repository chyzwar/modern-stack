
/**
 * Combine tasks
 * @param {string[]} arr
 * @returns {string} combined tasks
 */
const tasks = (arr) => arr.join(" && ");

module.exports = {
  "hooks": {
    "pre-push": tasks([
      "yarn build",
      "yarn test",
      "yarn lint"
    ]),
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
  }
};