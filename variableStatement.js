module.exports = function variableStatement() {

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