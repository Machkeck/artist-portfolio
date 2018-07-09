module.exports = {
    'extends': 'airbnb',
    "rules": {
        "react/jsx-filename-extension": [1, {"extensions": [".js", ".jsx"]}],
        'indent': [2, 4, { 'SwitchCase': 1, 'VariableDeclarator': 1 }],
        'react/prop-types': 0,
        'react/jsx-indent-props': [2, 4],
        'react/jsx-indent': [2, 4],
        'object-curly-spacing': ["error", "never"],
        'react/jsx-tag-spacing': ["error", { "beforeSelfClosing": "never" }],
        'max-len':  ["error", { "code": 140 }]
    }
};
