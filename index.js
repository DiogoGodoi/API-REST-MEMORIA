const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const listaLivros = require('./livros');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Exibir
app.get('/livros', (req, res) => {
    let lista = listaLivros.livros
    res.json(lista)
})

//Cadastrar
app.post('/cadastrar', (req, res) => {
    try {
        const { autor, titulo, ano } = req.body
        let livro = { autor: autor, titulo: titulo, ano: ano }
        listaLivros.livros.push(livro)
        console.log("Sucesso")
    } catch (ex) {
        console.log("Erro")
    } finally {
        let lista = listaLivros.livros
        res.json(lista)
    }
})

//Pesquisar por nome
app.get('/livros/:pAutor', (req, res) => {
    let pAutor = req.params.pAutor
    let lista = listaLivros.livros
    let filtro = lista.find((id) => id.autor == pAutor)
    res.json(filtro)
})

//altetar
app.patch('/alterar/:pAutor', (req, res) => {
    try {
        let pAutor = req.params.pAutor
        let filtro = listaLivros.livros.find((id) => id.autor === pAutor)
        const { autor, titulo, ano } = req.body
        filtro.autor = autor
        filtro.titulo = titulo
        filtro.ano = ano
    } catch (error) {
        console.log("Erro")
    } finally {
        let lista = listaLivros.livros
        res.json(lista)
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
