import { Aluno } from '../../gui/ta-gui/src/app/aluno';

export class CadastroDeAlunos {
  alunos: Aluno[] = [];

  criar(aluno: Aluno): Aluno {
    var result = null;
    if (this.cpfNaoCadastrado(aluno.cpf) && this.githubNaoCadastrado(aluno.github)) {
      result = new Aluno();
      result.copyFrom(aluno);
      this.alunos.push(result);
    }
    return result;
  }

  cpfNaoCadastrado(cpf: string): boolean {
     return !this.alunos.find(a => a.cpf == cpf);
  }
  githubNaoCadastrado(github: string): boolean{
    return !this.alunos.find(a => a.github == github);
  }

  atualizar(aluno: Aluno): Aluno {
    var result: Aluno = this.alunos.find(a => a.cpf == aluno.cpf);
    if (result) result.copyFrom(aluno);
    return result;
  }
  deletar(id: string): boolean {
    console.log("DELETANDO ALUNO");
    console.log(id);
    var i;
    for(i=0; i<this.alunos.length; i=i+1){
      if(this.alunos[i].cpf == id){
        console.log(this.alunos.length)
        console.log(i)
        this.alunos.splice(i, 1);
        console.log(this.alunos.length)
        return true;
      }
    }
    return false;
  }

  getAlunos(): Aluno[] {
    return this.alunos;
  }
}