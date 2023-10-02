<?php

use App\Models\Caracteristique;
use App\Models\Produit;
use App\Models\Unite;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('caracteristique_produits', function (Blueprint $table) {
            $table->id();
            $table->string('description');
            $table->string('valeur');
            $table->foreignIdFor(Unite::class)->constrained();
            $table->foreignIdFor(Produit::class)->constrained();
            $table->foreignIdFor(Caracteristique::class)->constrained();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('caracteristique_produits');
    }
};
