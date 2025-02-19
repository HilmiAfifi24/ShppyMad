<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    // Menampilkan semua order milik user yang sedang login
    public function index()
    {
        $orders = Order::where('id_user', Auth::id())->with('product')->get();
        return response()->json($orders);
    }

    // Membuat order baru
    public function store(Request $request)
    {
        $request->validate([
            'id_product' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        // Ambil data produk yang dipesan
        $product = Product::findOrFail($request->id_product);
        $totalHarga = $product->harga * $request->quantity;

        // Simpan order ke database
        $order = Order::create([
            'id_user' => Auth::id(),
            'id_product' => $request->id_product,
            'quantity' => $request->quantity,
            'harga' => $totalHarga,
        ]);

        return response()->json($order, 201);
    }

    // Menampilkan detail order tertentu
    public function show($id)
    {
        $order = Order::where('id_user', Auth::id())->with('product')->findOrFail($id);
        return response()->json($order);
    }

    // Menghapus order (hanya bisa menghapus order sendiri)
    public function destroy($id)
    {
        $order = Order::where('id_user', Auth::id())->findOrFail($id);
        $order->delete();

        return response()->json(['message' => 'Order deleted successfully']);
    }
}
