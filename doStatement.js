module.exports = function doStatement(Y,A,R) {  // UNDER CONSTRUCTION

    const y = Y ? '_Yield' : ''; 
    const a = A ? '_Await' : '';
    const r = R ? '_Return' : '';

    const s = String.raw`
  DoStatement${y+a+r}: 
    - meta_scope: DoStatement${y+a+r}
 `;
    return s
}