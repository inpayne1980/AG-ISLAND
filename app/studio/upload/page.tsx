
import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Button } from '../../../components/Button';
import { detectBrand, urlToBase64 } from '../../../services/geminiService';
import { isUrlAllowed } from '../../../lib/security/allowlist';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [brand, setBrand] = useState('');
  const [productUrl, setProductUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setUserId(user.id);
    });
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    
    if (selected.size > 50 * 1024 * 1024) {
      setError("File exceeds 50MB limit.");
      return;
    }

    setFile(selected);
    const objectUrl = URL.createObjectURL(selected);
    setPreview(objectUrl);
    
    // Auto-detect brand
    setDetecting(true);
    try {
      const base64 = await urlToBase64(objectUrl);
      const detected = await detectBrand(base64);
      setBrand(detected);
    } catch (err) {
      console.error("Auto-detect failed:", err);
    } finally {
      setDetecting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !userId) return;

    // Security check: Allowlist validation
    if (!isUrlAllowed(productUrl)) {
      setError("Product URL must be from an approved platform (Shopify, Coca-Cola, etc.)");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      // 1. Upload to Supabase Storage (Simulated path)
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/${Math.random()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('products')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const imageUrl = supabase.storage.from('products').getPublicUrl(fileName).data.publicUrl;

      // 2. Save to Products Table via API
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          image_url: imageUrl,
          brand,
          product_url: productUrl
        })
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Rate limit exceeded. 5 uploads/hour per islander.");
        }
        throw new Error("Failed to save product context.");
      }

      alert("Product uploaded! AI variants are being generated in the background.");
      setFile(null);
      setPreview(null);
      setBrand('');
      setProductUrl('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Creator Studio</h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">Upload product &bull; Generate Vendo &bull; Launch</p>
        </div>
        <div className="flex items-center gap-2 bg-turquoise/10 px-4 py-2 rounded-2xl border border-turquoise/20">
          <div className="w-2 h-2 bg-turquoise rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black text-turquoise uppercase tracking-widest">Gemini Vision Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Upload Side */}
        <div className="space-y-8">
          <div className={`neu-card bg-sand p-2 min-h-[400px] flex items-center justify-center relative overflow-hidden group border-2 border-dashed ${file ? 'border-transparent' : 'border-deepSand hover:border-turquoise transition-colors'}`}>
            {!preview ? (
              <label className="cursor-pointer flex flex-col items-center gap-4">
                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                <div className="w-16 h-16 neu-button rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-turquoise transition-colors">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Drop Product Shot</span>
              </label>
            ) : (
              <div className="w-full h-full p-4 relative">
                <img src={preview} className="w-full h-[400px] object-contain rounded-2xl" alt="Preview" />
                <button 
                  onClick={() => { setFile(null); setPreview(null); }}
                  className="absolute top-8 right-8 w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-rose-500 transition-colors"
                >
                  &times;
                </button>
              </div>
            )}
          </div>

          <div className="p-6 neu-inset bg-sand/30 space-y-2">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Requirements</h4>
            <ul className="text-[9px] font-bold text-slate-500 uppercase space-y-1">
              <li className="flex items-center gap-2">• Max file size: 50MB</li>
              <li className="flex items-center gap-2">• Clean background preferred</li>
              <li className="flex items-center gap-2">• Single product focus</li>
            </ul>
          </div>
        </div>

        {/* Form Side */}
        <form onSubmit={handleSubmit} className="space-y-8 bg-brightSand/50 p-10 rounded-[3rem] shadow-neu-sm border border-deepSand">
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2 flex justify-between">
              Detected Brand
              {detecting && <span className="text-turquoise animate-pulse">Analyzing...</span>}
            </label>
            <input
              type="text"
              placeholder="e.g. Coca-Cola"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
              className="w-full h-14 neu-inset bg-transparent px-6 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-turquoise/20 transition-all uppercase"
            />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2">External Product URL</label>
            <div className="relative">
              <input
                type="url"
                placeholder="https://brand.com/product"
                value={productUrl}
                onChange={(e) => setProductUrl(e.target.value)}
                required
                className="w-full h-14 neu-inset bg-transparent px-6 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-turquoise/20 transition-all"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </div>
            </div>
          </div>

          <div className="p-4 bg-turquoise/5 rounded-2xl border border-turquoise/10">
            <p className="text-[9px] font-bold text-turquoise uppercase leading-relaxed">
              Upon upload, AdGenius will generate a high-fidelity landing page. All "Shop" buttons will link directly to your provided URL (Constraint 8.2).
            </p>
          </div>

          {error && (
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-rose-500 text-center">
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            isLoading={uploading}
            variant="primary" 
            className="w-full h-16 shadow-xl"
            disabled={!file}
          >
            {uploading ? 'Processing DNA...' : 'Generate Branded Vendo'}
          </Button>
        </form>
      </div>
    </div>
  );
}
