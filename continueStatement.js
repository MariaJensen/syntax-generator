module.exports = function continueStatement() { 
    return String.raw`
  ContinueStatement: 
    - meta_scope: ContinueStatement
    - match: '\b({{IdentifierName}})\b'
    - match: ';'
      scope: ContinueStatement.js
      pop: true
 `;
}