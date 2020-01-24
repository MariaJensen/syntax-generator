module.exports = function tryStatement(Y,A,R) {  // UNDER CONSTRUCTION

    const y = Y ? '_Yield' : ''; 
    const a = A ? '_Await' : '';
    const r = R ? '_Return' : '';

    const s = String.raw`
  TryStatement${y+a+r}: 
    - meta_scope: TryStatement${y+a+r}
 `;
    return s
}