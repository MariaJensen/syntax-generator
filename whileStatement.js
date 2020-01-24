module.exports = function whileStatement(Y,A,R) {  // UNDER CONSTRUCTION

    const y = Y ? '_Yield' : ''; 
    const a = A ? '_Await' : '';
    const r = R ? '_Return' : '';

    const s = String.raw`
  WhileStatement${y+a+r}: 
    - meta_scope: WhileStatement${y+a+r}
 `;
    return s
}