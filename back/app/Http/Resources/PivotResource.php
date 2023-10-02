<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PivotResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'nom'=>$this->nom,
            "promo"=>$this->promo,
            'quantite' => $this->pivot->quantite,
            'prix_unitaire' => $this->pivot->prix_unitaire,
            'prix_en_gros' => $this->pivot->prix_en_gros,
        ];
    }
}
