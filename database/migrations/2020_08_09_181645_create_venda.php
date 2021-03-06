

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVenda extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('venda', function (Blueprint $table) {
            $table->id();
            $table->string('nome_cliente');
            $table->foreignId('id_produto');
            $table->integer('quantidade_produto');
            $table->decimal('total_venda', 5, 2);
            $table->decimal('desconto_venda', 5, 2);
            $table->string('forma_pagamento');
            $table->timestamps();

            $table->foreign('id_produto')->references('id')->on('produto');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('venda');
    }
}
