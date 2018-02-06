/**
 * Created by wlj at 2017/11/30.
 * dependent:
 * function:
 */
module.exports={
    "parser"  : "babel-eslint",
    "env": {
        "browser" : true,
        "node": true,
        "es6": true
    },
    "extends" : [
        "standard",
        "standard-react"
    ],
    "plugins" : [
        "flow-vars"
    ],
    "globals" : {
        "Action"       : false,
        "__DEV__"      : false,
        "__PROD__"     : false,
        "__DEBUG__"    : false,
        "__DEBUG_NEW_WINDOW__" : false,
        "__BASENAME__" : false
    },
    "rules": {
        "arrow-parens": 0,
        "jsx-quotes": [2, "prefer-double"],
        "space-before-function-paren": [2, { "anonymous": "always", "named": "never" }],
        "flow-vars/define-flow-type": 1,
        "flow-vars/use-flow-type": 1,
        "react/jsx-no-bind": 0,
        "react/prop-types": 0,
        "spaced-comment": 0
    }
}