import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Aluno } from './aluno';
import { AlunoService } from './aluno.service';

@Component({
  selector: 'app-root',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {
   constructor(private alunoService: AlunoService) {}

   aluno: Aluno = new Aluno();
   alunos: Aluno[];
   cpfduplicado: boolean = false;
   githubduplicado: boolean = false;

   criarAluno(a: Aluno): void {
     this.alunoService.criar(a)
        .then(ab => {
           if (ab) {
              this.alunos.push(ab);
              this.aluno = new Aluno();
           }else{
              this.cpfduplicado = true;
           } 
        })
        .catch(erro => alert(erro));
   }

   removerAluno(a: Aluno): void{
      this.alunoService.remover(a)
         .then(ab => {
            if(ab){
               this.retirarAluno(a.cpf);
            }
         })
         .catch(erro => alert(erro));
   }

   retirarAluno(a: string): void{
      for(var i = 0; i<this.alunos.length; i+=1){
         if(this.alunos[i].cpf == a){
            this.alunos.splice(i, 1);
            break;
         }
      }
   }

   onMove(): void {
      this.cpfduplicado = false;
      this.githubduplicado = false;
   }

   ngOnInit(): void {
     this.alunoService.getAlunos()
         .then(as => this.alunos = as)
         .catch(erro => alert(erro));
   }

}