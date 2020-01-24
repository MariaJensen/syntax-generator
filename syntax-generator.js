// https://www.ecma-international.org/ecma-262/10.0/index.html#prod-WithStatement 
// https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_fs_readfilesync_path_options
// https://raw.githubusercontent.com/kkos/oniguruma/5.9.6/doc/RE
// https://www.sublimetext.com/docs/3/syntax.html

// node syntax-generator.js <name of syntax>

const fs = require('fs');


const declaration = require('./declaration.js');
const declarationOnce = require('./declarationOnce.js');

const statement = require('./statement.js');
const statementOnce = require('./statementOnce.js');

const expressionStatement = require('./expressionStatement.js');
const labelledStatement = require('./labelledStatement.js');
const blockStatement = require('./blockStatement.js');
const breakStatement = require('./breakStatement.js');
const continueStatement = require('./continueStatement.js');
const debuggerStatement = require('./debuggerStatement.js');
const doStatement = require('./doStatement.js');
const forAwaitStatement = require('./forAwaitStatement.js');
const forStatement = require('./forStatement.js');
const ifStatement = require('./ifStatement.js');
const returnStatement = require('./returnStatement.js');
const switchStatement = require('./switchStatement.js');
const throwStatement = require('./throwStatement.js');
const tryStatement = require('./tryStatement.js');
const variableStatement = require('./variableStatement.js');
const whileStatement = require('./whileStatement.js');
const withStatement = require('./withStatement.js');


const name = process.argv[2]; 
const fileName = name + '/' + name + '.sublime-syntax';

if (!fs.existsSync(name)) {
    fs.mkdirSync(name);
}

let s = `%YAML 1.2
---
name: ${name}
file_extensions: 
  - js, mjs
scope: source.js
`;

fs.writeFileSync(fileName, s);

const variables = fs.readFileSync('variables.txt', 'utf8'); 

fs.appendFileSync(fileName, variables + '\n');

let contexts = String.raw`
contexts: 
  main: 
    - match: '\/{2}'
      scope: Comment.js
      push: SingleLineComment
    - match: '\/\*'
      scope: Comment.js
      push: MultiLineComment
    - include: Declaration
    - include: Statement
`;

contexts = contexts + String.raw`
  SingleLineComment:
    - meta_scope: Comment.js
    - match: '{{LineTerminator}}' 
      pop: true

  MultiLineComment: 
    - meta_scope: Comment.js
    - match: '\*\/'
      pop: true
`;

const boo = [false, true]; 



for (Y of boo) { 
    for (A of boo) { 
        contexts = contexts + declaration(Y,A) 
        + returnStatement(Y,A) + throwStatement(Y,A) 
        + expressionStatement(Y,A);
        for (R of boo) {
            contexts = contexts + statement(Y,A,R) + blockStatement(Y,A,R) + ifStatement(Y,A,R)
            + doStatement(Y,A,R) + whileStatement(Y,A,R) + forStatement(Y,A,R)
            + switchStatement(Y,A,R) + withStatement(Y,A,R) + tryStatement(Y,A,R) 
            + labelledStatement(Y,A,R) + statementOnce(Y,A,R);
        } 
    } 
}

for (Y of boo) {
    for (R of boo) {
        contexts = contexts + forAwaitStatement(Y,R);
    }
}

for (Y of boo) {
    for (A of boo) {
        for (D of boo) {
            contexts = contexts + declarationOnce(Y,A,D);
        }
    }
}

contexts = contexts + continueStatement() + debuggerStatement() + variableStatement() + breakStatement();
fs.appendFileSync(fileName, contexts);
