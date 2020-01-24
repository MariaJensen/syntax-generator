module.exports = function debuggerStatement() {
    return String.raw`
  DebuggerStatement: 
    - meta_scope: DebuggerStatement
    - match: ';'
      scope: DebuggerStatement.js
      pop: true
 `;
}