<?php

namespace App\Http\Resources;

use App\Models\Succursale;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProduitSuccursaleResource extends JsonResource
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
            'quantite' => $this->quantite,
            'prix_unitaire' => $this->prix_unitaire,
            'prix_en_gros' => $this->prix_en_gros,
            'succursale' => new SuccursaleResource(Succursale::find($this->succursale_id)),
            // 'succursale' => $this->whenLoading('succursale', function () {
            //     return new SuccursaleResource(Succursale::find($this->succursale_id));
            // }),
        ];
    }
}
