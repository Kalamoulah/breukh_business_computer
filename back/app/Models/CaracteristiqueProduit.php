<?php

namespace App\Models;

use App\Models\Unite;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class CaracteristiqueProduit extends Model
{
    use HasFactory, SoftDeletes;

    public function produits()
    {
        return $this->belongsToMany(Produit::class, 'caracteristique_produits')
            ->withPivot('description', 'valeur', 'unite_id');
    }

    public function unite()
    {
        return $this->belongsTo(Unite::class, 'unite_id');
    }


}
