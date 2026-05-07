import { useEffect, useState } from 'react';

const initialState = {
  name: '',
  description: '',
  price: '',
  stock: ''
};

function ProductForm({ product, onSave, onCancel }) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock
      });
    } else {
      setForm(initialState);
    }
  }, [product]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({
      id: product?.id,
      ...form,
      price: Number(form.price),
      stock: Number(form.stock)
    });
  };

  return (
    <section className="card form-card">
      <h2>{product ? 'Editar producto' : 'Nuevo producto'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Descripción
          <textarea name="description" value={form.description} onChange={handleChange} required />
        </label>
        <label>
          Precio
          <input name="price" type="number" value={form.price} onChange={handleChange} min="0" step="0.01" required />
        </label>
        <label>
          Stock
          <input name="stock" type="number" value={form.stock} onChange={handleChange} min="0" required />
        </label>
        <div className="form-actions">
          <button type="submit">Guardar</button>
          {product && (
            <button type="button" className="secondary" onClick={onCancel}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default ProductForm;
