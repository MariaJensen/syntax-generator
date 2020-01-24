module.exports = function switchStatement(Y,A,R) {  // UNDER CONSTRUCTION

    const y = Y ? '_Yield' : ''; 
    const a = A ? '_Await' : '';
    const r = R ? '_Return' : '';

    const s = String.raw`
  SwitchStatement${y+a+r}: 
    - meta_scope: SwitchStatement${y+a+r}
 `;
    return s
}