<?php

namespace App\Http\Controllers;

use App\Models\Caracteristique;
use Illuminate\Http\Request;

class CaracteristiqueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }


    public function getValue($idCarat)
    {
        $cararteristique = Caracteristique::find($idCarat);

        if (!$cararteristique) {
         return  response()->json("cette caracteristique n'existe pas");
        }
       return response()->json($cararteristique->suggest_value);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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