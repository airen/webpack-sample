module.exports = {
    "printWidth": 100,
    "tabWidth": 2,
    "parser": "typescript",
    "trailingComma": "es5",
    "jsxBracketSameLine": true,
    "semi": true,
    "singleQuote": true,
    "bracketSpacing": true,
    "arrowParens": 'avoid',
    "requirePragma": false,
    "proseWrap": 'preserve',
    "overrides": [
        {
            "files": "*.{css,sass,scss,less}",
            "options": {
              "parser": "css",
              "tabWidth": 4
            }
        },
    ]
}