module.exports = function withStatement(Y,A,R) {  

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