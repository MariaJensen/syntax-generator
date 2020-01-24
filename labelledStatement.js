module.exports = function labelledStatement(Y,A,R) { 

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