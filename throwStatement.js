module.exports = function throwStatement(Y,A) {  // UNDER CONSTRUCTION

    const y = Y ? '_Yield' : ''; 
    const a = A ? '_Await' : '';

    const s = String.raw`
  ThrowStatement${y+a}: 
    - meta_scope: ThrowStatement${y+a}
 `;
    return s
}