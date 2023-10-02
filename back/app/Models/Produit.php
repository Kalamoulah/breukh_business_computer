<?php

namespace App\Models;

use App\Models\Caracteristique;
use App\Models\Succursale;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;

class Produit extends Model
{
  use HasFactory, SoftDeletes;


  protected $guarded = [
    'id'
];

  
  public function caracteristiques()
  {
    return $this->belongsToMany(Caracteristique::class, 'caracteristique_produits', 'produit_id', 'caracteristique_id', )
      ->withPivot('description', 'valeur', 'unite_id');
  }

  public function succursales()
  {
      return $this->belongsToMany(Succursale::class,'produit_succursales')
      ->withPivot('quantite', 'prix_unitaire', 'prix_en_gros');
  }

  // public function succursales()
  //   {
  //       return $this->belongsToMany(Succursale::class, 'produit_succursales')
  //           ->withPivot('prix_unitaire', 'prix_en_gros');
  //   }

   
  
}