const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const listaLivros = require('./livros');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Exibir
app.get('/livros', (req, res) => {
    let livros = listaLivros.exibirLivros()
    res.json(livros)
})

//Cadastrar
app.post('/cadastrar', (req, res) => {
    try {
        const { autor, titulo, ano } = req.body
        listaLivros.cadastrarLivros(autor, titulo, ano)
        console.log("Sucesso")
    } catch (ex) {
        console.log("Erro")
    } finally {
        let lista = listaLivros.exibirLivros()
        res.json(lista)
    }
})

//Pesquisar por nome
app.get('/livros/:pAutor', (req, res) => {
    let pAutor = req.params.pAutor
    let livro = listaLivros.procurarLivros(pAutor)
    res.json(livro)
})

//altetar
app.patch('/alterar/:pAutor', (req, res) => {
    try {
        const { autor, titulo, ano } = req.body
        const parametro = req.params.pAutor;
        listaLivros.alterarLivro(parametro, autor, titulo, ano)
    } catch (error) {
        console.log("Erro")
    } finally {
        let livros = listaLivros.exibirLivros()
        res.json(livros)
    }
})

app.delete('/deletar/:pAutor', (req, res) => {
    try {
        let pAutor = req.params.pAutor
        let filtro = listaLivros.livros.filter((id) => id.autor !== pAutor)
        listaLivros.livros = filtro
        res.json(listaLivros.livros)
    } catch (error) {
        console.log('Erro')
    } finally {
        res.json(listaLivros.livros)
    }
})

const PORT = 8060
app.listen((PORT),
    console.log(`Servidor rodando na porta ${PORT}`)
);
