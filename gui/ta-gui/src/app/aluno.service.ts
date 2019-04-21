import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';
import { catchError } from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

import { Aluno } from './aluno';

@Injectable()
export class AlunoService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';

  constructor(private http: Http) { }

  criar(aluno: Aluno): Promise<Aluno> {
    return this.http.post(this.taURL + "/aluno",JSON.stringify(aluno), {headers: this.headers})
           .toPromise()
           .then(res => {
              if (res.json().success) {return aluno;} else {return null;}
           })
           .catch(this.tratarErro);
  }

  remover(aluno: Aluno): Promise<boolean>{
    var r = confirm("Você tem certeza que quer remover o aluno "+ aluno.nome +" do sistema?");
    if(r){
      return this.http.delete('http://localhost:3000/delaluno/', {headers: this.headers, body: JSON.stringify(aluno)})
      .toPromise()
      .then(res => {
        if (res.json().success) {return aluno;} else {return null;}
      })
      .catch(this.tratarErro);
    }
  }

  atualizar(aluno: Aluno): Promise<Aluno> {
    return this.http.put(this.taURL + "/aluno",JSON.stringify(aluno), {headers: this.headers})
         .toPromise()
         .then(res => {
            if (res.json().success) {return aluno;} else {return null;}
         })
         .catch(this.tratarErro);
  }

  getAlunos(): Promise<Aluno[]> {
    return this.http.get(this.taURL + "/alunos")
             .toPromise()
             .then(res => res.json() as Aluno[])
             .catch(this.tratarErro);
  }

  private tratarErro(erro: any): Promise<any>{
    console.error('Acesso mal sucedido ao serviço de alunos',erro);
    return Promise.reject(erro.message || erro);
  }
}