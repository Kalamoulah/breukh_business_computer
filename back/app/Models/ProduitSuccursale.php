<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProduitSuccursale extends Model
{
    use HasFactory, SoftDeletes;

    public function produit()
    {
        return $this->belongsTo(Produit::class);
    }

    public function succursale()
    {
        return $this->belongsTo(Succursale::class);
    }

}