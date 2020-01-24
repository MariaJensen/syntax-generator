module.exports = function statement(Y,A,R) { 
    
    const y = Y ? '_Yield' : ''; 
    const a = A ? '_Await' : '';
    const r = R ? '_Return' : '';

    let s = String.raw`
  Statement${y+a+r}:
    - meta_scope: Statement${y+a+r}
    
    - match: '\{'
      scope: BlockStatement.js
      push: BlockStatement${y+a+r}

    - match: '\b(var)\b'
      scope: VariableStatement.js
      push: VariableStatement

    - match: '\b(if)\b'
      scope: IfStatement.js
      push: IfStatement${y+a+r}

    - match: '\b(do)\b'
      scope: DoStatement.js
      push: DoStatement${y+a+r}

    - match: '\b(while)\b'
      scope: WhileStatement.js
      push: WhileStatement${y+a+r}
 `;

    if (A) {
        s = s + String.raw`
    - match: '\b(for)\b{{WhiteSpace}}{1,}\b(await)\b'
      scope: ForAwaitStatement.js
      push: ForAwaitStatement${y+r}
 `;
    }

    s = s + String.raw`
    - match: '\b(for)\b'
      scope: ForStatement.js
      push: ForStatement${y+a+r}

    - match: '\b(switch)\b'
      scope: SwitchStatement.js
      push: SwitchStatement${y+a+r}

    - match: '\b(continue)\b'
      scope: ContinueStatement.js
      push: ContinueStatement

    - match: '\b(break)\b'
      scope: BreakStatement.js
      push: BreakStatement
 `;

    if (R) {
        s = s + String.raw`
    - match: '\b(return)\b'
      scope: ReturnStatement.js
      push: ReturnStatement${y+a}    
 `;
    }

    s = s + String.raw`
    - match: '\b(with)\b'
      scope: WithStatement.js
      push: WithStatement${y+a+r}

    - match: '\b(throw)\b'
      scope: ThrowStatement.js
      push: ThrowStatement${y+a}

    - match: '\b(try)\b'
      scope: TryStatement.js
      push: TryStatement${y+a+r}

    - match: '\b(debugger)\b'
      scope: DebuggerStatement.js
      push: DebuggerStatement

    - match: '\b({{IdentifierName}})\b{{WhiteSpace}}{0,}\:'
      scope: LabelledStatement.js
      push: LabelledStatement${y+a+r}      

    - match: '(?={{Not_WhiteSpace_not_LineTerminator}})'
      push: ExpressionStatement${y+a}
 `;

    return s; 
}