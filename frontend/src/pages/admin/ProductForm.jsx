import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../api/axios';
import Loader from '../../components/Loader';
import ImageUploader from '../../components/ImageUploader';
import toast from 'react-hot-toast';

const categories = ['Construction', 'Games', 'Pretend Play', 'Learning & Education', 'Vehicles', 'Active Play', 'Wooden Toys', 'Dolls', 'Action Figures', 'Ride Ons', 'Outdoor Toys', 'Books', 'Baby & Toddler', 'Novelty Toys'];
const ages = ['', '0-2 Years', '2-4 Years', '4-6 Years', '6-8 Years', '8 Years+', '12 Years+'];

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [brands, setBrands] = useState([]);
  const [form, setForm] = useState({
    name: '', description: '', brand: '', category: '', ageGroup: '',
    price: 0, discount: 0, wholesalePrice: 0, wholesaleMinQty: 0,
    stock: 0, image: '', images: [],
    featured: false, bestSeller: false, newArrival: false,
  });

  useEffect(() => {
    (async () => {
      try {
        const { data: bData } = await API.get('/brands');
        setBrands(bData);
        if (isEdit) {
          const { data } = await API.get(`/products/${id}`);
          setForm({
            name: data.name, description: data.description, brand: data.brand,
            category: data.category, ageGroup: data.ageGroup || '',
            price: data.price, discount: data.discount,
            wholesalePrice: data.wholesalePrice || 0, wholesaleMinQty: data.wholesaleMinQty || 0,
            stock: data.stock,
            image: data.image || '', images: data.images || [],
            featured: data.featured, bestSeller: data.bestSeller, newArrival: data.newArrival,
          });
        }
      } catch (e) { toast.error('Failed to load'); }
      finally { setLoading(false); }
    })();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, price: +form.price, discount: +form.discount, wholesalePrice: +form.wholesalePrice, wholesaleMinQty: +form.wholesaleMinQty, stock: +form.stock };
      if (isEdit) await API.put(`/products/${id}`, payload);
      else await API.post('/products', payload);
      toast.success(isEdit ? 'Product updated' : 'Product created');
      navigate('/admin/products');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold mb-6">{isEdit ? 'Edit Product' : 'Add New Product'}</h1>
      <form onSubmit={submit} className="bg-white border rounded-lg p-6 space-y-4 max-w-4xl">
        <div>
          <label className="label">Product Name *</label>
          <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div>
          <label className="label">Description *</label>
          <textarea className="input" rows="4" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="label">Brand *</label>
            <input list="brand-list" className="input" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} required />
            <datalist id="brand-list">
              {brands.map((b) => <option key={b._id} value={b.name} />)}
            </datalist>
          </div>
          <div>
            <label className="label">Category *</label>
            <select className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required>
              <option value="">-- Select --</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Age Group</label>
            <select className="input" value={form.ageGroup} onChange={(e) => setForm({ ...form, ageGroup: e.target.value })}>
              {ages.map((a) => <option key={a} value={a}>{a || '-- Any --'}</option>)}
            </select>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="label">Retail Price ($) *</label>
            <input type="number" step="0.01" min="0" className="input" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
          </div>
          <div>
            <label className="label">Discount (%)</label>
            <input type="number" min="0" max="100" className="input" value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} />
          </div>
          <div>
            <label className="label">Stock *</label>
            <input type="number" min="0" className="input" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} required />
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h3 className="font-semibold text-purple-700 mb-2">🛍 Wholesale Pricing (optional)</h3>
          <p className="text-xs text-gray-600 mb-3">Wholesale customers automatically get this price when buying the minimum quantity.</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">Wholesale Price ($)</label>
              <input type="number" step="0.01" min="0" className="input" value={form.wholesalePrice} onChange={(e) => setForm({ ...form, wholesalePrice: e.target.value })} placeholder="e.g. 10.00" />
            </div>
            <div>
              <label className="label">Minimum Qty for Wholesale</label>
              <input type="number" min="0" className="input" value={form.wholesaleMinQty} onChange={(e) => setForm({ ...form, wholesaleMinQty: e.target.value })} placeholder="e.g. 10" />
            </div>
          </div>
        </div>

        <ImageUploader
          label="Product Images (upload from your computer)"
          multiple
          value={form.images}
          onChange={(imgs) => setForm({ ...form, images: imgs, image: form.image && imgs.includes(form.image) ? form.image : (imgs[0] || '') })}
          mainImage={form.image}
          onMainChange={(img) => setForm({ ...form, image: img })}
        />

        <div className="flex flex-wrap gap-6 pt-2">
          <label className="flex items-center gap-2"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="accent-primary-500" /> Featured</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={form.bestSeller} onChange={(e) => setForm({ ...form, bestSeller: e.target.checked })} className="accent-primary-500" /> Best Seller</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={form.newArrival} onChange={(e) => setForm({ ...form, newArrival: e.target.checked })} className="accent-primary-500" /> New Arrival</label>
        </div>

        <div className="flex gap-3 pt-4">
          <button type="submit" disabled={saving} className="btn-primary">{saving ? 'Saving...' : (isEdit ? 'Update Product' : 'Create Product')}</button>
          <button type="button" onClick={() => navigate('/admin/products')} className="border px-5 py-2.5 rounded-md hover:bg-gray-50">Cancel</button>
        </div>
      </form>
    </div>
  );
}
