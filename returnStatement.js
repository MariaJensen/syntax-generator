module.exports = function returnStatement(Y,A) {  

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