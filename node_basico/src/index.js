const express = require('express');
const {uuid} = require('uuidv4')
const app = express();

app.use(express.json())


/**
 * Métodos HTTP:
 *
 * GET: Busca informações do back-end
 * POST: Criar uma informação no back-end
 * PUT/PUTCH: Altera um informação no back-end
 * DELETE: Deletar uma informação no back-end
 */

/**
 * Tipo de parêmetros:
 *
 * Query Params: Fultros e paginação
 * Route Params: Identificar recursos deletar ou atualizar
 * Requestt Body: Conteúdo na hora de criar ou editar um recurso (JSON)
 */

/**
 * Middleware
 *
 * Interceptador de requisições que interromper totalmente a requisição ou alterar dados da requisição
 *
 */

const projects = [];


app.get("/projects", (req, res) => {
    const {title, owner} = req.query
    
    const results = title
        ? projects.filter(project => project.title.includes(title))
        : projects;
    
    return res.json(results)
});

app.post("/projects", (req, res) => {
    const {title, owner} = req.body
    const project = {id: uuid(), title, owner}
    projects.push(project)
    return res.json(project)
});

app.put("/projects/:id", (req, res) => {
    const {id} = req.params
    const {title, owner} = req.body
    const projectIndex = projects.findIndex( project => project.id === id)
    
    if (projectIndex < 0 ){ return res.status(400).json({error: "Project not found"}) }
    
    const project = { id, title, owner}
    
    projects[projectIndex] = project
    
    return res.json(project)
});

app.delete("/projects/:id", (req, res) => {
    const {id} = req.params
    
    const projectIndex = projects.findIndex( project => project.id === id)
    
    if (projectIndex < 0 ){ return res.status(400).json({error: "Project not found"}) }
    
    projects.splice(projectIndex, 1)
    
    return res.status(204).send()
});

app.listen(3333, () => {
    console.log("🚀 Server starting http://localhost:3333/")
});
