<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'id_category',
        'nama_product',
        'deskripsi',
        'stok',
        'harga',
        'rating'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'id_category', );
    }
}
