// https://www.ecma-international.org/ecma-262/10.0/index.html#prod-WithStatement 
// https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_fs_readfilesync_path_options
// https://raw.githubusercontent.com/kkos/oniguruma/5.9.6/doc/RE
// https://www.sublimetext.com/docs/3/syntax.html

const fs = require('fs');

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

function declaration (Y,A) { // UNDER CONSTRUCTION

    const y = Y ? '_Yield' : ''; 
    const a = A ? '_Await' : '';

    let s = String.raw`
  Declaration${y+a}:
    - meta_scope: Declaration${y+a}
 `;
    return s;
}

function statement(Y,A,R) { 
    
    const y = Y ? '_Yield' : ''; 
    const a = A ? '_Await' : '';
    const r = R ? '_Return' : '';

    let s = String.raw`
  Statement${y+a+r}:
    - meta_scope: Statement${y+a+r}
    
    - match: '\{'
      scope: BlockStatement.js
      push: BlockStatement${y+a+r}

    - match: '\b(var)\b'
      scope: VariableStatement.js
      push: VariableStatement

    - match: '\b(if)\b'
      scope: IfStatement.js
      push: IfStatement${y+a+r}

    - match: '\b(do)\b'
      scope: DoStatement.js
      push: DoStatement${y+a+r}

    - match: '\b(while)\b'
      scope: WhileStatement.js
      push: WhileStatement${y+a+r}
 `;

    if (A) {
        s = s + String.raw`
    - match: '\b(for)\b{{WhiteSpace}}{1,}\b(await)\b'
      scope: ForAwaitStatement.js
      push: ForAwaitStatement${y+r}
 `;
    }

    s = s + String.raw`
    - match: '\b(for)\b'
      scope: ForStatement.js
      push: ForStatement${y+a+r}

    - match: '\b(switch)\b'
      scope: SwitchStatement.js
      push: SwitchStatement${y+a+r}

    - match: '\b(continue)\b'
      scope: ContinueStatement.js
      push: ContinueStatement

    - match: '\b(break)\b'
      scope: BreakStatement.js
      push: BreakStatement
 `;

    if (R) {
        s = s + String.raw`
    - match: '\b(return)\b'
      scope: ReturnStatement.js
      push: ReturnStatement${y+a}    
 `;
    }

    s = s + String.raw`
    - match: '\b(with)\b'
      scope: WithStatement.js
      push: WithStatement${y+a+r}

    - match: '\b(throw)\b'
      scope: ThrowStatement.js
      push: ThrowStatement${y+a}

    - match: '\b(try)\b'
      scope: TryStatement.js
      push: TryStatement${y+a+r}

    - match: '\b(debugger)\b'
      scope: DebuggerStatement.js
      push: DebuggerStatement

    - match: '\b({{IdentifierName}})\b{{WhiteSpace}}{0,}\:'
      scope: LabelledStatement.js
      push: LabelledStatement${y+a+r}      

    - match: '(?={{Not_WhiteSpace_not_LineTerminator}})'
      push: ExpressionStatement${y+a}
 `;

    return s; 
}

function statementOnce(Y,A,R) { 
    
    const y = Y ? '_Yield' : ''; 
    const a = A ? '_Await' : '';
    const r = R ? '_Return' : '';

    let s = String.raw`
  StatementOnce${y+a+r}:
    - meta_scope: StatementOnce${y+a+r}
    
    - match: '\{'
      scope: BlockStatement.js
      set: BlockStatement${y+a+r}

    - match: '\b(var)\b'
      scope: VariableStatement.js
      set: VariableStatement

    - match: '\b(if)\b'
      scope: IfStatement.js
      set: IfStatement${y+a+r}

    - match: '\b(do)\b'
      scope: DoStatement.js
      set: DoStatement${y+a+r}

    - match: '\b(while)\b'
      scope: WhileStatement.js
      set: WhileStatement${y+a+r}
 `;

    if (A) {
        s = s + String.raw`
    - match: '\b(for)\b{{WhiteSpace}}{1,}\b(await)\b'
      scope: ForAwaitStatement.js
      set: ForAwaitStatement${y+r}
 `;
    }

    s = s + String.raw`
    - match: '\b(for)\b'
      scope: ForStatement.js
      set: ForStatement${y+a+r}

    - match: '\b(switch)\b'
      scope: SwitchStatement.js
      push: SwitchStatement${y+a+r}

    - match: '\b(continue)\b'
      scope: ContinueStatement.js
      set: ContinueStatement

    - match: '\b(break)\b'
      scope: BreakStatement.js
      set: BreakStatement
 `;

    if (R) {
        s = s + String.raw`
    - match: '\b(return)\b'
      scope: ReturnStatement.js
      set: ReturnStatement${y+a}    
 `;
    }

    s = s + String.raw`
    - match: '\b(with)\b'
      scope: WithStatement.js
      set: WithStatement${y+a+r}

    - match: '\b(throw)\b'
      scope: ThrowStatement.js
      set: ThrowStatement${y+a}

    - match: '\b(try)\b'
      scope: TryStatement.js
      set: TryStatement${y+a+r}

    - match: '\b(debugger)\b'
      scope: DebuggerStatement.js
      set: DebuggerStatement

    - match: '\b({{IdentifierName}})\b{{WhiteSpace}}{0,}\:'
      scope: LabelledStatement.js
      set: LabelledStatement${y+a+r}      

    - match: '(?={{Not_WhiteSpace_not_LineTerminator}})'
      set: ExpressionStatement${y+a}
 `;

    return s; 
}

function declarationOnce(Y,A,D) { // UNDER CONSTRUCTION
    const y = Y ? '_Yield' : ''; 
    const a = A ? '_Await' : '';
    const d = D ? '_Default' : '';

    const s = String.raw`
  FunctionDeclarationOnce${y+a+d}:
    - meta_scope: FunctionDeclarationOnce${y+a+d}
 `;
    return s; 
}

function labelledStatement(Y,A,R) { 

    const y = Y ? '_Yield' : ''; 
    const a = A ? '_Await' : '';
    const r = R ? '_Return' : '';

    const s = String.raw`
  LabelledStatement${y+a+r}: 
    - meta_scope: LabelledStatement${y+a+r}
    - include: FunctionDeclarationOnce${y+a}
    - match: '\{'
      scope: LabelledStatement.js
      set: 
        - meta_scope: BlockStatement${y+a+r}
        - match: '\}'
          scope: LabelledStatement.js
          pop: true
        - include: Declaration${y+a}
        - include: Statement${y+a+r}
    - include: StatementOnce${y+a+r}
 `;
    return s
}

function expressionStatement(Y,A) {  // UNDER CONSTRUCTION

    const y = Y ? '_Yield' : ''; 
    const a = A ? '_Await' : '';

    const s = String.raw`
  ExpressionStatement${y+a}: 
    - meta_scope: ExpressionStatement${y+a} 
    - match: ';'
      pop: true
 `;
    return s
}

function tryStatement(Y,A,R) {  // UNDER CONSTRUCTION

    const y = Y ? '_Yield' : ''; 
    const a = A ? '_Await' : '';
    const r = R ? '_Return' : '';

    const s = String.raw`
  TryStatement${y+a+r}: 
    - meta_scope: TryStatement${y+a+r}
 `;
    return s
}

function throwStatement(Y,A) {  // UNDER CONSTRUCTION

    const y = Y ? '_Yield' : ''; 
    const a = A ? '_Await' : '';

    const s = String.raw`
  ThrowStatement${y+a}: 
    - meta_scope: ThrowStatement${y+a}
 `;
    return s
}

function withStatement(Y,A,R) {  

    const y = Y ? '_Yield' : ''; 
    const a = A ? '_Await' : '';
    const r = R ? '_Return' : '';

    const s = String.raw`
  WithStatement${y+a+r}: 
    - meta_scope: WithStatement${y+a+r}
    - match: '\('
      scope: WithStatement.js
      set: 
        - meta_content_scope: WithStatement${y+a+r}
        - include: Expression_In${y+a}
        - match: '\)'
          scope: WithStatement.js
          set: 
            - meta_content_scope: WithStatement${y+a+r}
            - match: '\{'
              scope: WithStatement.js
              set: 
                - meta_content_scope: WithStatement${y+a+r}
                - match: '\}'
                  scope: WithStatement${y+a+r} WithStatement.js
                  pop: true
                - include: Declaration${y+a}
                - include: Statement${y+a+r}
            - include: StatementOnce${y+a+r}
 `;
    return s
}

function returnStatement(Y,A) {  

    const y = Y ? '_Yield' : ''; 
    const a = A ? '_Await' : '';

    return String.raw`
  ReturnStatement${y+a}: 
    - meta_scope: ReturnStatement${y+a}
    - match: ';'
      scope: ReturnStatement.js
      pop: true
 `;
}

function breakStatement() {  

    return String.raw`
  BreakStatement: 
    - meta_scope: BreakStatement
    - match: '\b({{IdentifierName}})\b'
    - match: ';'
      scope: BreakStatement.js
      pop: true
 `;
}

function continueStatement() { 
    return String.raw`
  ContinueStatement: 
    - meta_scope: ContinueStatement
    - match: '\b({{IdentifierName}})\b'
    - match: ';'
      scope: ContinueStatement.js
      pop: true
 `;
}

function debuggerStatement() {
    return String.raw`
  DebuggerStatement: 
    - meta_scope: DebuggerStatement
    - match: ';'
      scope: DebuggerStatement.js
      pop: true
 `;
}

function switchStatement(Y,A,R) {  // UNDER CONSTRUCTION

    const y = Y ? '_Yield' : ''; 
    const a = A ? '_Await' : '';
    const r = R ? '_Return' : '';

    const s = String.raw`
  SwitchStatement${y+a+r}: 
    - meta_scope: SwitchStatement${y+a+r}
 `;
    return s
}

function whileStatement(Y,A,R) {  // UNDER CONSTRUCTION

    const y = Y ? '_Yield' : ''; 
    const a = A ? '_Await' : '';
    const r = R ? '_Return' : '';

    const s = String.raw`
  WhileStatement${y+a+r}: 
    - meta_scope: WhileStatement${y+a+r}
 `;
    return s
}

function forStatement(Y,A,R) {  // UNDER CONSTRUCTION

    const y = Y ? '_Yield' : ''; 
    const a = A ? '_Await' : '';
    const r = R ? '_Return' : '';

    const s = String.raw`
  ForStatement${y+a+r}: 
    - meta_scope: ForStatement${y+a+r}
 `;
    return s
}

function forAwaitStatement(Y,R) {  // UNDER CONSTRUCTION

    const y = Y ? '_Yield' : ''; 
    const r = R ? '_Return' : '';

    const s = String.raw`
  ForAwaitStatement${y+r}: 
    - meta_scope: ForAwaitStatement${y+r}
 `;
    return s
}

function doStatement(Y,A,R) {  // UNDER CONSTRUCTION

    const y = Y ? '_Yield' : ''; 
    const a = A ? '_Await' : '';
    const r = R ? '_Return' : '';

    const s = String.raw`
  DoStatement${y+a+r}: 
    - meta_scope: DoStatement${y+a+r}
 `;
    return s
}

function ifStatement(Y,A,R) {  // UNDER CONSTRUCTION

    const y = Y ? '_Yield' : ''; 
    const a = A ? '_Await' : '';
    const r = R ? '_Return' : '';

    const s = String.raw`
  IfStatement${y+a+r}: 
    - meta_scope: IfStatement${y+a+r}
 `;
    return s
}

function variableStatement() {

    return String.raw`
  VariableStatement:
    - meta_scope: VariableStatement
    - match: ';'
      scope: VariableStatement.js
      pop: true
    - match: '='
      scope: VariableStatement.js
    - match: ','
      scope: VariableStatement.js
 `;
}

function blockStatement (Y,A,R) {
    const y = Y ? '_Yield' : ''; 
    const a = A ? '_Await' : '';
    const r = R ? '_Return' : '';

    let s = String.raw`
  BlockStatement${y+a+r}:
    - meta_scope: BlockStatement${y+a+r}
    - match: '\}'
      scope: BlockStatement.js
      pop: true
    - include: Declaration${y+a}
    - include: Statement${y+a+r}
 `;
    return s; 
}

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
