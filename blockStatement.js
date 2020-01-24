module.exports = function blockStatement (Y,A,R) {
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