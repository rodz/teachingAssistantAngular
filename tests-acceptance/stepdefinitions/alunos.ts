import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

let sameCPF = ((elem, cpf) => elem.element(by.name('cpflist')).getText().then(text => text === cpf));
let sameName = ((elem, name) => elem.element(by.name('nomelist')).getText().then(text => text === name));

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^I am at the students page$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
        await $("a[name='alunos']").click();
    })

    Given(/^I can see no students in the students list$/, async () => {
        var allcpfs : ElementArrayFinder = element.all(by.name('cpflist'));
        await allcpfs;
        await allcpfs.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    })

    Given(/^I cannot see a student with CPF "(\d*)" in the students list$/, async (cpf) => {
        var allcpfs : ElementArrayFinder = element.all(by.name('cpflist'));
        var samecpfs = allcpfs.filter(elem =>
                                      elem.getText().then(text => text === cpf));
        await samecpfs;
        await samecpfs.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    });

    When(/^I try to register the student "([^\"]*)" with CPF "(\d*)"$/, async (name, cpf) => {
        await $("input[name='namebox']").sendKeys(<string> name);
        await $("input[name='cpfbox']").sendKeys(<string> cpf);
        await element(by.buttonText('Adicionar')).click();
    });

    When(/^I try to register the student "([^\"]*)" with CPF "(\d*)" and github "([^\"]*)"$/, async (name, cpf, git) => {
        await $("input[name='namebox']").sendKeys(<string> name);
        await $("input[name='cpfbox']").sendKeys(<string> cpf);
        await $("input[name='gitbox']").sendKeys(<string> git);
        await element(by.buttonText('Adicionar')).click();
    });

    When(/^I try to delete the student "([^\"]*)" with CPF "(\d*)"$/, async (name, cpf) => {
        var allalunos : ElementArrayFinder = element.all(by.name('alunolist'));
        var samenamecpf = allalunos.filter(elem => sameCPF(elem,cpf) && sameName(elem,name));
        await samenamecpf;
        await samenamecpf.get(0).element(by.name('rembuttom')).click()
    });

    When(/^I try to delete all the students"$/, async () => {
        element.all(by.name('alunolist')).each(function(element, index){
            element.element(by.name('rembuttom')).click()
        });
    });

    Then(/^I can see "([^\"]*)" with CPF "(\d*)" in the students list$/, async (name, cpf) => {
        var allalunos : ElementArrayFinder = element.all(by.name('alunolist'));
        var samenamecpf = allalunos.filter(elem => sameCPF(elem,cpf) && sameName(elem,name));
        await samenamecpf;
        await samenamecpf.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    Then(/^I cannot see a student in the students list$/, async () => {
        var allalunos : ElementArrayFinder = element.all(by.name('alunolist'));
        await allalunos;
        await allalunos.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    });

    Then(/^I cannot see student "([^\"]*)" with CPF "(\d*)" in the students list$/, async (name, cpf) => {
        var allalunos : ElementArrayFinder = element.all(by.name('alunolist'));
        var samenamecpf = allalunos.filter(elem => sameCPF(elem,cpf) && sameName(elem,name));
        await samenamecpf;
        await samenamecpf.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    });
})
