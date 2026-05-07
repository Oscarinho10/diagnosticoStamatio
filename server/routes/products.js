const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener productos' });
  }
});

router.post('/', async (req, res) => {
  const { name, description, price, stock } = req.body;
  if (!name || !description || price == null || stock == null) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)',
      [name, description, price, stock]
    );
    res.status(201).json({ id: result.insertId, name, description, price, stock });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear producto' });
  }
});

router.put('/:id', async (req, res) => {
  const productId = req.params.id;
  const { name, description, price, stock } = req.body;
  if (!name || !description || price == null || stock == null) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const [result] = await db.query(
      'UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?',
      [name, description, price, stock, productId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json({ id: Number(productId), name, description, price, stock });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar producto' });
  }
});

router.delete('/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const [result] = await db.query('DELETE FROM products WHERE id = ?', [productId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar producto' });
  }
});

module.exports = router;
