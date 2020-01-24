module.exports = function declaration (Y,A) { // UNDER CONSTRUCTION

    const y = Y ? '_Yield' : ''; 
    const a = A ? '_Await' : '';

    let s = String.raw`
  Declaration${y+a}:
    - meta_scope: Declaration${y+a}
 `;
    return s;
}
