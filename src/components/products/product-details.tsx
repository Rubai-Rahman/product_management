'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Product } from '@/lib/_types/products';

export default function ProductDetailsPage({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const router = useRouter();

  const handleEdit = () => {
    // Navigate to edit page
    router.push(`/products/${product.slug}/edit`);
  };

  const handleDelete = () => {
    // Simulate delete request here
    console.log('Product deleted:', product.id);
    setConfirmDelete(false);
    router.push('/products'); // Redirect after delete
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* LEFT: Images */}
        <div className="flex flex-col items-center justify-center bg-gray-50 p-6">
          <div className="relative w-full aspect-square">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              className="object-contain rounded-2xl"
              unoptimized
            />
          </div>

          <div className="flex gap-3 mt-4">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`relative w-20 h-20 rounded-xl border-2 overflow-hidden transition-all duration-200 ${
                  selectedImage === img
                    ? 'border-gray-900 scale-105'
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name}-${idx}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: Details */}
        <div className="p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.name}
          </h1>
          <p className="text-sm text-gray-500 mb-4">
            Category:{' '}
            <span className="font-medium text-gray-700">
              {product.category.name}
            </span>
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            {product.description}
          </p>

          <div className="flex items-center justify-between mb-6">
            <span className="text-3xl font-bold text-gray-900">
              ৳{product.price}
            </span>
          </div>

          <div className="space-y-2 text-sm text-gray-500 mb-8">
            <p>
              <span className="font-semibold text-gray-700">Created:</span>{' '}
              {new Date(product.createdAt).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold text-gray-700">Updated:</span>{' '}
              {new Date(product.updatedAt).toLocaleString()}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleEdit}
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Edit
            </button>
            <button
              onClick={() => setConfirmDelete(true)}
              className="flex-1 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-80 text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Delete Product
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete <b>{product.name}</b>?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
