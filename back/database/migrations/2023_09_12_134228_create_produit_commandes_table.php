<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
 use App\Models\ProduitSuccursale;
 use App\Models\Commande;
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('produit_commandes', function (Blueprint $table) {
            $table->id();
            $table->float('prix');
            $table->float('quantite');
            $table->float('promo');
            $table->foreignIdFor(ProduitSuccursale::class)->constrained();
            $table->foreignIdFor(Commande::class)->constrained();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produit_commandes');
    }
};
