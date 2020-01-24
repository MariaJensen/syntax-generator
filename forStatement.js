module.exports = function forStatement(Y,A,R) {  // UNDER CONSTRUCTION

    const y = Y ? '_Yield' : ''; 
    const a = A ? '_Await' : '';
    const r = R ? '_Return' : '';

    const s = String.raw`
  ForStatement${y+a+r}: 
    - meta_scope: ForStatement${y+a+r}
 `;
    return s
}