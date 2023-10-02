<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

use Illuminate\Database\Eloquent\SoftDeletes;

class Succursale extends Model
{
    use HasFactory, SoftDeletes;
  
    public function friendsFrom()
    {
        return $this->hasMany(Friend::class, 'from');
    }

    public function friendsTo()
    {
        return $this->hasMany(Friend::class, 'to');
    }

    public function produitsSuccursale()
    {
        return $this->hasMany(ProduitSuccursale::class);
    }

    public function produits()
    {
        return $this->belongsToMany(Produit::class, 'produit_succursales', 'succursale_id', 'produit_id')
                    ->withPivot('quantite', 'prix_unitaire', 'prix_en_gros');
    }
    
   
}
