module.exports = function breakStatement() {  

    return String.raw`
  BreakStatement: 
    - meta_scope: BreakStatement
    - match: '\b({{IdentifierName}})\b'
    - match: ';'
      scope: BreakStatement.js
      pop: true
 `;
}