import { useEffect, useState } from 'react';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import { createProduct, deleteProduct, getProducts, updateProduct } from './api';

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError('No se pudo cargar la lista de productos.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSave = async (product) => {
    try {
      if (product.id) {
        await updateProduct(product.id, product);
      } else {
        await createProduct(product);
      }
      setSelectedProduct(null);
      fetchProducts();
      setError('');
    } catch (err) {
      setError('Error al guardar el producto.');
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setError('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este producto?')) return;
    try {
      await deleteProduct(id);
      if (selectedProduct?.id === id) {
        setSelectedProduct(null);
      }
      fetchProducts();
      setError('');
    } catch (err) {
      setError('Error al eliminar el producto.');
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>CRUD de Productos</h1>
        <p>Gestiona productos con nombre, descripción, precio y stock.</p>
      </header>

      {error && <div className="alert">{error}</div>}

      <div className="content-grid">
        <ProductForm product={selectedProduct} onSave={handleSave} onCancel={() => setSelectedProduct(null)} />
        <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
