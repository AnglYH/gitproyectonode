const express = require('express');
const app = express();

app.use(express.json());

const productos = [
    { id: 1, nombre: 'Producto 1', precio: 10 },
    { id: 2, nombre: 'Producto 2', precio: 20 },
    { id: 3, nombre: 'Producto 3', precio: 30 },
  ];

app.get('/productos', (req, res) => {
   res.json(productos);
});

app.post('/productos', (req, res) => {
   const nuevoProducto = {
      id: productos.length + 1,
      nombre: req.body.nombre,
      precio: req.body.precio
   };
   productos.push(nuevoProducto);
   res.status(201).json(nuevoProducto);
})

app.put('/productos/:id', (req, res) => {
   const productoId = parseInt(req.params.id);
   const producto = productos.find(p => p.id === productoId);

   if (!producto) {
       return res.status(404).json({ mensaje: 'Producto no encontrado' });
   }

   producto.nombre = req.body.nombre || producto.nombre;
   producto.precio = req.body.precio || producto.precio;

   res.json(producto);
});

app.delete('/productos/:id', (req, res) => {
   const productoId = parseInt(req.params.id);
   const index = productos.findIndex(p => p.id === productoId);

   if (index === -1) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
   }

   productos.splice(index, 1);
   res.status(204).send(); // 204 No Content, ya que no se devuelve un cuerpo)
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
   console.log(`Servidor Express corriendo en el puerto ${port}`);
});
