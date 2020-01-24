module.exports = function declarationOnce(Y,A,D) { // UNDER CONSTRUCTION
    const y = Y ? '_Yield' : ''; 
    const a = A ? '_Await' : '';
    const d = D ? '_Default' : '';

    const s = String.raw`
  FunctionDeclarationOnce${y+a+d}:
    - meta_scope: FunctionDeclarationOnce${y+a+d}
 `;
    return s; 
}