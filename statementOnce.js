module.exports = function statementOnce(Y,A,R) { 
    
    const y = Y ? '_Yield' : ''; 
    const a = A ? '_Await' : '';
    const r = R ? '_Return' : '';

    let s = String.raw`
  StatementOnce${y+a+r}:
    - meta_scope: StatementOnce${y+a+r}
    
    - match: '\{'
      scope: BlockStatement.js
      set: BlockStatement${y+a+r}

    - match: '\b(var)\b'
      scope: VariableStatement.js
      set: VariableStatement

    - match: '\b(if)\b'
      scope: IfStatement.js
      set: IfStatement${y+a+r}

    - match: '\b(do)\b'
      scope: DoStatement.js
      set: DoStatement${y+a+r}

    - match: '\b(while)\b'
      scope: WhileStatement.js
      set: WhileStatement${y+a+r}
 `;

    if (A) {
        s = s + String.raw`
    - match: '\b(for)\b{{WhiteSpace}}{1,}\b(await)\b'
      scope: ForAwaitStatement.js
      set: ForAwaitStatement${y+r}
 `;
    }

    s = s + String.raw`
    - match: '\b(for)\b'
      scope: ForStatement.js
      set: ForStatement${y+a+r}

    - match: '\b(switch)\b'
      scope: SwitchStatement.js
      push: SwitchStatement${y+a+r}

    - match: '\b(continue)\b'
      scope: ContinueStatement.js
      set: ContinueStatement

    - match: '\b(break)\b'
      scope: BreakStatement.js
      set: BreakStatement
 `;

    if (R) {
        s = s + String.raw`
    - match: '\b(return)\b'
      scope: ReturnStatement.js
      set: ReturnStatement${y+a}    
 `;
    }

    s = s + String.raw`
    - match: '\b(with)\b'
      scope: WithStatement.js
      set: WithStatement${y+a+r}

    - match: '\b(throw)\b'
      scope: ThrowStatement.js
      set: ThrowStatement${y+a}

    - match: '\b(try)\b'
      scope: TryStatement.js
      set: TryStatement${y+a+r}

    - match: '\b(debugger)\b'
      scope: DebuggerStatement.js
      set: DebuggerStatement

    - match: '\b({{IdentifierName}})\b{{WhiteSpace}}{0,}\:'
      scope: LabelledStatement.js
      set: LabelledStatement${y+a+r}      

    - match: '(?={{Not_WhiteSpace_not_LineTerminator}})'
      set: ExpressionStatement${y+a}
 `;

    return s; 
}