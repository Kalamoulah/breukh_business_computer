<?php

namespace App\Http\Controllers;

use App\Http\Requests\produitRequest;
use App\Http\Resources\dataCollection;
use App\Http\Resources\DataResource;
use App\Http\Resources\ProductShowResource;
use App\Http\Resources\ProduitResource;
use App\Http\Resources\ProduitSuccursaleResource;
use App\Models\Caracteristique;
use App\Models\Categorie;
use App\Models\friend;
use App\Models\Marque;
use App\Models\Produit;
use App\Models\ProduitSuccursale;
use App\Models\Succursale;
use App\Models\Unite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PHPUnit\Framework\TestStatus\Success;
use Symfony\Component\HttpFoundation\Response;

class ProduitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

    }

    public function getMarqueCategorieId($categorieId)
    {
        $categorie = Categorie::find($categorieId);
        if (!$categorie) {
            return response()->json(["message" => "Cette marque n'existe pas"]);
        }

        $marques = Marque::where('categorie_id', $categorie->id)->get();

        return response()->json(
            [
                "marques" => DataResource::collection($marques)
            ]
        );
    }

    public function all()
    {
        $unites = Unite::all();
        $caracts = Caracteristique::all();
        $categories = Categorie::all();

        return response()->json([
            "data" => [
                "unite" => DataResource::collection($unites),
                "caracts" => DataResource::collection($caracts),
                "categories" => DataResource::collection($categories),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProduitRequest $request)
    {

        return DB::transaction(function () use ($request) {

            $data = $request->validated();

            $succursale = Succursale::where('id', $request->succursale)->first();

            if (!$succursale) {
                return response()->json("cette succursales n'exist pas ");
            }
            $succursale_id = $succursale->id;
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('images', 'public');
            } else {
                return dataCollection::toApiResponse("image not found", [], false);
            }

            // return 'breuekh';
            $produit = Produit::create([
                'libelle' => $data['libelle'],
                'code' => $this->generateCode(),
                'image' => $imagePath,
                'description' => $data['description'],
                'categorie_id' => $request->categorie,
                'marque_id' => $request->marque
            ]);

            $produit->succursales()
                ->attach(
                    $succursale_id,
                    [
                        'quantite' => $request->quantite,
                        'prix_unitaire' => $request->prixUnitaire,
                        'prix_en_gros' => $request->prixEnGros
                    ]
                );
            $caracteristiques = json_decode($request->input('caracteristiques'), true);
            // return $caracteristiques;
            foreach ($caracteristiques as $caracteristique) {
                $produit->caracteristiques()->attach($caracteristique["caract"], 
                ["valeur" => $caracteristique["valeur"], 
                'description'=> $request->description, "unite_id" => null] );
            }

            return response()->json([
                'status' => true,
                'message' => 'Produit create successfully',
                'produit' => $produit
            ], 200);

        });
    }

    public function generateCode(): string
    {
        $produits = Produit::latest()->first();
        if (!$produits) {
            return $code = "0" . 1;
        }
        $code = "0" . $produits->id + 1;
        return $code;
    }

    public function search(string $id, string $code)
    {
        $limit = request()->query('limit');
        $produit = Produit::where('code', $code)->with([
            'caracteristiques',
            'succursales' => function ($q) use ($id) {
                $q->where('succursale_id', $id);
            },
        ])->first();

        if (!$produit) {
            return response(["message" => "code introuvable", "suscess" => false]);
        }
        $hisProduit = DB::table('produit_succursales')
            ->where(['succursale_id' => $id, "produit_id" => $produit->id])
            ->where('quantite', '>', 0)
            ->first();


        $amis = Friend::getFriendsWithIds($id);
        $idAmis = array_merge(...$amis);

        $idfriend = array_values(array_filter($idAmis, function ($a) use ($id) {
            return $a != $id;
        }));


        $produitsucc = $this->getFreinds($idfriend, $produit->id);

        
        return response()->json([

            "produit" => new ProduitResource($produit),
            "amis" => ProduitSuccursaleResource::collection($produitsucc),
            "success" => true
        ]);
    }

    public function getProduitsSuccursale(string $succursale)
    {
        $succursale = Succursale::findOrFail($succursale);
        return $succursale->produits()->paginate(request('per_page', 4));

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

    function extractValues($jsonData)
    {

        $collection = collect(json_decode($jsonData, true));

        $valeurs = $collection->flatMap(function ($item) {
            return array_values($item);
        })->all();

        return $valeurs;
    }

    public function getFreinds(array $id, $idProduit)
    {
        return ProduitSuccursale::whereIn('succursale_id', $id)->where('produit_id', $idProduit)->orderBy('prix_en_gros', "asc")->get();
    }
}