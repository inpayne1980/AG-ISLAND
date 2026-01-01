
import React, { useState } from 'react';
import { Button } from './Button';
import { urlToBase64, extractPalette, regenerateVariant } from '../services/geminiService';
import { GeneratedContent } from '../types';

interface ProductUploadProps {
  onComplete: (newVariants: GeneratedContent[]) => void;
}

export const ProductUpload: React.FC<ProductUploadProps> = ({ onComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    setError(null);

    if (!selected) return;
    if (!selected.type.startsWith('image/')) {
      setError("Please upload an image file.");
      return;
    }
    if (selected.size > 50 * 1024 * 1024) {
      setError("File size exceeds 50MB limit.");
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const startGeneration = async () => {
    if (!file || !preview) return;
    setUploading(true);
    setProgress(10);

    try {
      const base64 = await urlToBase64(preview);
      setProgress(30);
      
      const palette = await extractPalette(base64);
      setProgress(50);

      // Trigger 3 parallel generations
      const prompts = [
        "Professional studio lighting, clean minimal background",
        "Dramatic cinematic shadows, high luxury aesthetic",
        "Vibrant commercial style, energetic lifestyle backdrop"
      ];

      const variants = await Promise.all(prompts.map(async (prompt, idx) => {
        const result = await regenerateVariant(preview, prompt);
        setProgress(prev => prev + 15);
        return {
          id: Math.random().toString(36).substr(2, 9),
          original_url: preview,
          hero_url: result || preview,
          status: 'pending_approval' as const,
          variant_number: idx + 1,
          created_at: new Date().toISOString(),
          color_palette: palette
        };
      }));

      // NOTE: Limit check is performed in parent App.tsx when this is called
      onComplete(variants);
      setFile(null);
      setPreview(null);
    } catch (err) {
      setError("Upload failed. Please check your API key or connection.");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Upload Product</h2>
          <p className="text-slate-500 text-sm mt-1">AI will generate 3 professional hero variants instantly.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-sm font-medium">
            {error}
          </div>
        )}

        {!preview ? (
          <label className="group relative border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-2xl aspect-video flex flex-col items-center justify-center cursor-pointer transition-all bg-slate-50 hover:bg-indigo-50/30 overflow-hidden">
            <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
            <div className="bg-white p-4 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <span className="mt-4 text-slate-600 font-medium">Drop image here or click to browse</span>
            <span className="mt-1 text-slate-400 text-xs">PNG, JPG up to 50MB</span>
          </label>
        ) : (
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden aspect-video border border-slate-200">
              <img src={preview} className="w-full h-full object-cover" alt="Preview" />
              <button 
                onClick={() => { setFile(null); setPreview(null); }}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 backdrop-blur-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {uploading && (
              <div className="space-y-2">
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 transition-all duration-500" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <span>Extracting DNA & Generation</span>
                  <span>{progress}%</span>
                </div>
              </div>
            )}

            <Button 
              className="w-full h-14 text-lg" 
              onClick={startGeneration} 
              isLoading={uploading}
            >
              Generate Hero Variants
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
