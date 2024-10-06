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
      console.log('Visiting statement:', JSON.stringify(statement, null, 2));
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
      console.log(`Declaring variable ${declaration.name.name} with type ${declaration.varType.name} and value ${value}`);
      this.symbolTable.set(declaration.name.name, { type: declaration.varType.name, value });
    }
  
    visitSetStatement(setStatement) {
      const value = this.evaluateExpression(setStatement.value);
      const varName = setStatement.name.name;
      if (this.symbolTable.has(varName)) {
        console.log(`Setting variable ${varName} to value ${value}`);
        this.symbolTable.set(varName, { ...this.symbolTable.get(varName), value });
      } else {
        throw new Error(`Cannot set undeclared variable: ${varName}`);
      }
    }
  
    visitPrintStatement(printStatement) {
      try {
        const value = this.evaluateInterpolatedString(printStatement.value);
        console.log('Evaluated Print Statement:', value);
        this.output += value + '\n';
      } catch (error) {
        console.error('Error in Print Statement:', error.message);
        this.output += `Error: ${error.message}\n`;
      }
    }
  
    evaluateInterpolatedString(interpolatedString) {
      return interpolatedString.parts.map(part => {
        if (part.type === 'TextPart') {
          return part.text;
        } else if (part.type === 'InterpolatedExpression') {
          try {
            return String(this.evaluateExpression(part.expression));
          } catch (error) {
            return `<${error.message}>`;
          }
        }
      }).join('');
    }
  
    evaluateExpression(expression) {
      console.log('Evaluating expression:', JSON.stringify(expression, null, 2));
      let result;
      switch (expression.type) {
        case 'StringLiteral':
        case 'IntegerLiteral':
        case 'FloatLiteral':
          result = expression.value;
          break;
        case 'Identifier':
          if (this.symbolTable.has(expression.name)) {
            result = this.symbolTable.get(expression.name).value;
          } else {
            throw new Error(`Undefined variable: ${expression.name}`);
          }
          break;
        default:
          throw new Error(`Unsupported expression type: ${expression.type}`);
      }
      console.log(`Expression ${expression.type} evaluated to:`, result);
      return result;
    }
  }