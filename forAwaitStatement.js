module.exports = function forAwaitStatement(Y,R) {  // UNDER CONSTRUCTION

    const y = Y ? '_Yield' : ''; 
    const r = R ? '_Return' : '';

    const s = String.raw`
  ForAwaitStatement${y+r}: 
    - meta_scope: ForAwaitStatement${y+r}
 `;
    return s
}