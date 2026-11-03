
import pg from 'pg';
const {Pool} = pg;

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Balto#4066',
    database: 'likeme',
    allowExitOnIdle: true
})

export const obtenerPosts = async () => {
    const {rows} = await pool.query ('SELECT * FROM  posts')
    return rows
}

export const agregarPosts = async (titulo, url, descripcion,likes) => {
    const consulta = 'INSERT INTO posts (titulo, img, descripcion,likes) VALUES ($1, $2, $3, $4)'
    const values = [titulo, url, descripcion,likes];
    const result = await pool.query (consulta, values)
    console.log ('Post agregado correctamente')

}

export const borrarPosts = async (id) => {
    const consulta = 'DELETE FROM posts WHERE id = $1'
    const values =[id]
    const result = await pool.query (consulta,values)
    console.log ('Post borrado correctamente')
}

export const modificarPosts = async(id) => {
    const consulta = 'UPDATE posts SET likes = likes + 1 WHERE id= $1'
    const values =[id]
    const result = await pool.query (consulta,values)
    console.log ('Post modificado correctamente')
}