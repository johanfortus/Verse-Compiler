// verse.pegjs

Start
  = Program

Program
  = _ statements:Statement* _ {
    return statements;
  }

Statement
  = PrintStatement
  / VariableDeclaration
  / Assignment
  / ExpressionStatement
  / IfStatement
  / ForStatement
  / ReturnStatement
  / FunctionDeclaration

PrintStatement
  = "Print" _ "(" _ value:Expression _ ")" _ ";"? _ {
    return { type: "PrintStatement", value };
  }

VariableDeclaration
  = ("var" / "let") _ name:Identifier _ (":" _ type:Type)? (_ "=" _ value:Expression)? _ ";"? _ {
    return { type: "VariableDeclaration", name, type, value };
  }

Assignment
  = left:Identifier _ "=" _ right:Expression _ ";"? _ {
    return { type: "Assignment", left, right };
  }

ExpressionStatement
  = expr:Expression _ ";"? _ {
    return { type: "ExpressionStatement", expression: expr };
  }

IfStatement
  = "if" _ condition:ParenthesizedExpression _ thenBlock:Block elseBlock:(_ "else" _ Block)? {
    return { type: "IfStatement", condition, thenBlock, elseBlock: elseBlock ? elseBlock[3] : null };
  }

ForStatement
  = "for" _ "(" _ init:Statement? _ ";" _ condition:Expression? _ ";" _ update:Expression? _ ")" _ body:Block {
    return { type: "ForStatement", init, condition, update, body };
  }

ReturnStatement
  = "return" _ value:Expression? _ ";"? _ {
    return { type: "ReturnStatement", value };
  }

FunctionDeclaration
  = "function" _ name:Identifier _ params:ParameterList _ (":" _ returnType:Type)? _ body:Block {
    return { type: "FunctionDeclaration", name, params, returnType, body };
  }

Block
  = "{" _ statements:Statement* _ "}" _ {
    return statements;
  }

ParameterList
  = "(" _ params:(Parameter (_ "," _ Parameter)*)? _ ")" {
    return params ? [params[0]].concat(params[1].map(p => p[3])) : [];
  }

Parameter
  = name:Identifier _ ":" _ type:Type {
    return { name, type };
  }

Expression
  = LogicalExpression

LogicalExpression
  = left:ComparisonExpression _ op:LogicalOperator _ right:LogicalExpression { return { type: "BinaryExpression", operator: op, left, right }; }
  / ComparisonExpression

ComparisonExpression
  = left:AdditiveExpression _ op:ComparisonOperator _ right:ComparisonExpression { return { type: "BinaryExpression", operator: op, left, right }; }
  / AdditiveExpression

AdditiveExpression
  = left:MultiplicativeExpression _ op:AdditiveOperator _ right:AdditiveExpression { return { type: "BinaryExpression", operator: op, left, right }; }
  / MultiplicativeExpression

MultiplicativeExpression
  = left:UnaryExpression _ op:MultiplicativeOperator _ right:MultiplicativeExpression { return { type: "BinaryExpression", operator: op, left, right }; }
  / UnaryExpression

UnaryExpression
  = op:UnaryOperator _ expr:UnaryExpression { return { type: "UnaryExpression", operator: op, expression: expr }; }
  / PrimaryExpression

PrimaryExpression
  = Literal
  / Identifier
  / FunctionCall
  / ParenthesizedExpression

ParenthesizedExpression
  = "(" _ expr:Expression _ ")" { return expr; }

FunctionCall
  = callee:Identifier _ "(" _ args:ArgumentList? _ ")" {
    return { type: "FunctionCall", callee, arguments: args || [] };
  }

ArgumentList
  = arg:Expression rest:(_ "," _ Expression)* {
    return [arg].concat(rest.map(r => r[3]));
  }

Literal
  = StringLiteral
  / NumberLiteral
  / BooleanLiteral

StringLiteral
  = '"' value:[^"]* '"' { return { type: "StringLiteral", value: value.join('') }; }

NumberLiteral
  = value:$([0-9]+ ("." [0-9]+)?) { return { type: "NumberLiteral", value: parseFloat(value) }; }

BooleanLiteral
  = value:("true" / "false") { return { type: "BooleanLiteral", value: value === "true" }; }

Identifier
  = name:$([a-zA-Z_][a-zA-Z0-9_]*) { return { type: "Identifier", name }; }

Type
  = name:$([a-zA-Z_][a-zA-Z0-9_]*) { return { type: "Type", name }; }

LogicalOperator
  = "&&" / "||"

ComparisonOperator
  = "==" / "!=" / "<=" / ">=" / "<" / ">"

AdditiveOperator
  = "+" / "-"

MultiplicativeOperator
  = "*" / "/" / "%"

UnaryOperator
  = "!" / "-"

_ "whitespace"
  = [ \t\n\r]*

// Optional semicolon
_$ "optionalSemicolon"
  = ";"? _