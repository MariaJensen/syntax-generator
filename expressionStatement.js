module.exports = function expressionStatement(Y,A) {  // UNDER CONSTRUCTION

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