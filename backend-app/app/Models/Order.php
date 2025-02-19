<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['id_user', 'id_product', 'quantity', 'harga'];

    public function user() {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function product() {
        return $this->belongsTo(Product::class, 'id_product');
    }
}
