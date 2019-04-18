"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aluno_1 = require("../../gui/ta-gui/src/app/aluno");
class CadastroDeAlunos {
    constructor() {
        this.alunos = [];
    }
    criar(aluno) {
        var result = null;
        if (this.cpfNaoCadastrado(aluno.cpf)) {
            result = new aluno_1.Aluno();
            result.copyFrom(aluno);
            this.alunos.push(result);
        }
        return result;
    }
    cpfNaoCadastrado(cpf) {
        return !this.alunos.find(a => a.cpf == cpf);
    }
    atualizar(aluno) {
        var result = this.alunos.find(a => a.cpf == aluno.cpf);
        if (result)
            result.copyFrom(aluno);
        return result;
    }
    getAlunos() {
        return this.alunos;
    }
}
exports.CadastroDeAlunos = CadastroDeAlunos;
//# sourceMappingURL=cadastrodealunos.js.map