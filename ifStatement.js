module.exports = function ifStatement(Y,A,R) {  // UNDER CONSTRUCTION

    const y = Y ? '_Yield' : ''; 
    const a = A ? '_Await' : '';
    const r = R ? '_Return' : '';

    const s = String.raw`
  IfStatement${y+a+r}: 
    - meta_scope: IfStatement${y+a+r}
 `;
    return s
}