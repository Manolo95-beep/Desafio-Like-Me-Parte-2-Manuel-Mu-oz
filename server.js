import express from 'express';
import cors from 'cors';
import { obtenerPosts, agregarPosts,borrarPosts,modificarPosts } from './consultas.js';

const app = express ();

app.use (cors());
app.use(express.json());


app.get ('/posts', async (req,res) => {
    try{
        const posts = await obtenerPosts();
        res.json (posts);
    } catch (error) {
        res.status (500).json({error: 'Error al obtener datos desde la base de datos likeme'})
    }
})

app.post ('/posts' , async (req,res) =>{
    try {
        const {titulo, url, descripcion,likes} = req.body
        await agregarPosts (titulo, url, descripcion,likes)
        res.status(201).send ('Post agregado')
    } catch (error) {
        res.status (500).json({error: 'Error al agregar posts en la base de datos likeme'})
    }
}) 

app.delete ('/posts/:id' , async(req,res) => {
    try {
        const {id} =req.params
        await borrarPosts(id)
        res.status(200).send ('Post borrado')
    } catch (error) {
        console.error(error)
        res.status (500).json({Error: 'Error al borrar el post'})
    }
})

app.put ('/posts/likes/:id' , async (req,res) => {
    try {
        const {id} = req.params
        await modificarPosts(id)
        res.status(200).send ('Post modificado')
    } catch (error) {
        console.error(error)
        res.status (500).json ({Error: 'Error al modificar el post'})
    }
})

app.listen (3000, () => {
    console.log ("Servidor levantado, http://localhost:3000")
});

