<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        return response()->json(Product::with('category')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'id_category' => 'required|exists:categories,id',
            'nama_product' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'stok' => 'required|integer',
            'harga' => 'required|numeric',
            'rating' => 'nullable|numeric|min:0|max:5'
        ]);

        $product = Product::create($request->all());

        return response()->json($product, 201);
    }

    public function show($id)
    {
        $product = Product::with('category')->findOrFail($id);
        return response()->json($product);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'id_category' => 'required|exists:categories,id',
            'nama_product' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'stok' => 'required|integer',
            'harga' => 'required|numeric',
            'rating' => 'nullable|numeric|min:0|max:5'
        ]);

        $product = Product::findOrFail($id);
        $product->update($request->all());

        return response()->json($product);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}
