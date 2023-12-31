<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Commande extends Model
{
    use HasFactory, SoftDeletes;

    public function produitCommandes()
    {
        return $this->belongsToMany(ProduitSuccursale::class, 'produit_commandes')
            ->withPivot(['quantite', 'prix', 'promo']);
    }

}
