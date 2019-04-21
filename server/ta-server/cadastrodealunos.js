"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aluno_1 = require("../../gui/ta-gui/src/app/aluno");
class CadastroDeAlunos {
    constructor() {
        this.alunos = [];
    }
    criar(aluno) {
        var result = null;
        if (this.cpfNaoCadastrado(aluno.cpf) && this.githubNaoCadastrado(aluno.github)) {
            result = new aluno_1.Aluno();
            result.copyFrom(aluno);
            this.alunos.push(result);
        }
        return result;
    }
    cpfNaoCadastrado(cpf) {
        return !this.alunos.find(a => a.cpf == cpf);
    }
    githubNaoCadastrado(github) {
        return !this.alunos.find(a => a.github == github);
    }
    atualizar(aluno) {
        var result = this.alunos.find(a => a.cpf == aluno.cpf);
        if (result)
            result.copyFrom(aluno);
        return result;
    }
    deletar(id) {
        console.log("DELETANDO ALUNO");
        console.log(id);
        var i;
        for (i = 0; i < this.alunos.length; i = i + 1) {
            if (this.alunos[i].cpf == id) {
                console.log(this.alunos.length);
                console.log(i);
                this.alunos.splice(i, 1);
                console.log(this.alunos.length);
                return true;
            }
        }
        return false;
    }
    getAlunos() {
        return this.alunos;
    }
}
exports.CadastroDeAlunos = CadastroDeAlunos;
//# sourceMappingURL=cadastrodealunos.js.map