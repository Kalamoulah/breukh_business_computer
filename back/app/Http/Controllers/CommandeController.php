<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use App\Models\ProduitSuccursale;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CommandeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        DB::beginTransaction(); 
    
     
            $commande = new Commande();
            $commande->date = now();
            $commande->promo = $request->promo;
            $commande->client_id = $request->client;
            $commande->user_id = $request->user;
            $commande->save();
    
      
            foreach ($request->produits as $produit) {
              
                $produitCorrespondant = ProduitSuccursale::where('succursale_id', $produit['idsucc'])
                    ->where('produit_id', $produit['id_produit'])
                    ->first();
    
                if ($produitCorrespondant) {
                  
                    DB::table('produit_commandes')->insert([
                        'prix' => $produit['prix'],
                        'quantite' => $produit['quantite'],
                        'promo' => $request->promo,
                        'produit_succursale_id' => $produitCorrespondant->id,
                        'commande_id' => $commande->id,
                        
                    ]);
    

                    $produitCorrespondant->quantite -= intval($produit['quantite']); 
                    $produitCorrespondant->save();
                }
            }
            DB::commit(); 
            return response()->json([
                "message"=> " Commande enregistrée avec succès!",
                "success"=> true
            ]);
      
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}