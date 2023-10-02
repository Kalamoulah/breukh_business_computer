<?php

namespace App\Http\Resources;

use App\Http\Resources\UniteResource;
use App\Models\Unite;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CarateristiqueResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'libelle' => $this->libelle,
            'description' => $this->pivot->description,
            'valeur' => $this->pivot->valeur, 
            "unite" => Unite::find($this->pivot->unite_id)->libelle ?? null
        ];
    }
}
