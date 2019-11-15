module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
	"jest": true
    },
    "extends": [
        "airbnb",
	"plugin:react/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        'import/no-unresolved': "off",
        'react/jsx-props-no-spreading': "off",
        'react/forbid-prop-types': "off",
        'react/destructuring-assignment': "off",
        'import/no-cycle': "off",
    },
};
