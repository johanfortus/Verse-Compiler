{
  function Program(body) { return { type: "Program", body: body }; }
  function VariableDeclaration(name, varType, value) { return { type: "VariableDeclaration", name: name, varType: varType, value: value }; }
  function SetStatement(name, value) { return { type: "SetStatement", name: name, value: value }; }
  function PrintStatement(value) { return { type: "PrintStatement", value: value }; }
  function InterpolatedString(parts) { return { type: "InterpolatedString", parts: parts }; }
  function TextPart(text) { return { type: "TextPart", text: text }; }
  function InterpolatedExpression(expression) { return { type: "InterpolatedExpression", expression: expression }; }
  function StringLiteral(value) { return { type: "StringLiteral", value: value }; }
  function IntegerLiteral(value) { return { type: "IntegerLiteral", value: parseInt(value, 10) }; }
  function FloatLiteral(value) { return { type: "FloatLiteral", value: parseFloat(value) }; }
  function Identifier(name) { return { type: "Identifier", name: name }; }
  function Type(name) { return { type: "Type", name: name }; }
}

Start
  = Program

Program
  = statements:Statement* { return Program(statements); }

Statement
  = VariableDeclaration
  / SetStatement
  / PrintStatement

VariableDeclaration
  = "var" _ name:Identifier _ ":" _ varType:Type _ "=" _ value:Expression _ {
      return VariableDeclaration(name, varType, value);
    }

SetStatement
  = "set" _ name:Identifier _ "=" _ value:Expression _ {
      return SetStatement(name, value);
    }

PrintStatement
  = "Print" _ "(" _ value:InterpolatedString _ ")" _ {
      return PrintStatement(value);
    }

InterpolatedString
  = '"' parts:InterpolatedPart* '"' { return InterpolatedString(parts); }

InterpolatedPart
  = TextPart
  / InterpolatedExpression

TextPart
  = text:$[^"{]+ { return TextPart(text); }

InterpolatedExpression
  = "{" _ expr:Expression _ "}" { return InterpolatedExpression(expr); }

Expression
  = StringLiteral
  / FloatLiteral
  / IntegerLiteral
  / Identifier

StringLiteral
  = '"' value:$[^"]* '"' { return StringLiteral(value); }

IntegerLiteral
  = value:$("-"? [0-9]+) { return IntegerLiteral(value); }

FloatLiteral
  = value:$("-"? [0-9]+ "." [0-9]+) { return FloatLiteral(value); }

Identifier
  = name:$[a-zA-Z_][a-zA-Z0-9_]* { return Identifier(name); }

Type
  = name:$("string" / "int" / "float") { return Type(name); }

_ "whitespace"
  = [ \t\n\r]*