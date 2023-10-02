<?php

use App\Models\Commande;
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
        Schema::create('ligne_commande', function (Blueprint $table) {
            $table->id();
            $table->foreignId("produit_succursales_id")->constrained("produit_succursales");
            $table->foreignIdFor(Commande::class);
            $table->integer('prix_vente');
            $table->integer('quantite');
            $table->softDeletes();
            $table->integer('promo')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ligne_commande');
    }
};
