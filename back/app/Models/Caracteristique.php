<?php

namespace App\Models;

use App\Models\CaracteristiqueProduit;
// use App\Models\Unite;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Caracteristique extends Model
{
    use HasFactory, SoftDeletes;
  
    public function caracteristique_produits() :HasMany
    {
      return $this->HasMany(CaracteristiqueProduit::class);
                
    }
    
    public function unite(): BelongsTo
    {
        return $this->belongsTo(Unite::class, 'unite_id');
    }
}
