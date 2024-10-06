export class VerseInterpreter {
    constructor() {
      this.output = '';
      this.symbolTable = new Map();
    }
  
    interpret(ast) {
      this.output = '';
      console.log('Interpreter received AST:', JSON.stringify(ast, null, 2));
      
      if (!ast || typeof ast !== 'object' || !Array.isArray(ast.body)) {
        throw new Error('Invalid AST structure: Expected an object with a body array');
      }
      
      this.visitProgram(ast);
      return this.output;
    }
  
    visitProgram(program) {
      for (const statement of program.body) {
        this.visitStatement(statement);
      }
    }
  
    visitStatement(statement) {
      if (!statement || typeof statement !== 'object' || !statement.type) {
        throw new Error(`Invalid statement: ${JSON.stringify(statement)}`);
      }
  
      console.log('Visiting statement:', statement);
      switch (statement.type) {
        case 'VariableDeclaration':
          this.visitVariableDeclaration(statement);
          break;
        case 'SetStatement':
          this.visitSetStatement(statement);
          break;
        case 'PrintStatement':
          this.visitPrintStatement(statement);
          break;
        default:
          throw new Error(`Unsupported statement type: ${statement.type}`);
      }
    }
  
    visitVariableDeclaration(declaration) {
      const value = this.evaluateExpression(declaration.value);
      this.symbolTable.set(declaration.name.name, value);
    }
  
    visitSetStatement(setStatement) {
      const value = this.evaluateExpression(setStatement.value);
      if (!this.symbolTable.has(setStatement.name.name)) {
        throw new Error(`Cannot set undefined variable: ${setStatement.name.name}`);
      }
      this.symbolTable.set(setStatement.name.name, value);
    }
  
    visitPrintStatement(printStatement) {
      const value = this.evaluateInterpolatedString(printStatement.value);
      this.output += value + '\n';
    }
  
    evaluateInterpolatedString(interpolatedString) {
      return interpolatedString.parts.map(part => {
        if (part.type === 'TextPart') {
          return part.text;
        } else if (part.type === 'InterpolatedExpression') {
          return String(this.evaluateExpression(part.expression));
        }
      }).join('');
    }
  
    evaluateExpression(expression) {
      console.log('Evaluating expression:', expression);
      switch (expression.type) {
        case 'StringLiteral':
          return expression.value;
        case 'IntegerLiteral':
          return expression.value;
        case 'FloatLiteral':
          return expression.value;
        case 'Identifier':
          if (this.symbolTable.has(expression.name)) {
            return this.symbolTable.get(expression.name);
          }
          throw new Error(`Undefined variable: ${expression.name}`);
        default:
          throw new Error(`Unsupported expression type: ${expression.type}`);
      }
    }
  }