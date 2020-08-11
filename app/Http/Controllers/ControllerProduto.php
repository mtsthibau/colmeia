<?php

namespace App\Http\Controllers;

use App\Produto;

use Illuminate\Http\Request;
use PhpParser\Builder\Param;

class ControllerProduto
{
    public function indexJson()
    {
        $produto = Produto::orderBy('nome_fabrica', 'DESC')->orderBy('nome_modelo', 'DESC')->get();
        return json_encode($produto);
    }


    public function create(Request $request)
    {
        $produto = new Produto;
        $produto->nome_fabrica = $request->input('fabrica');
        $produto->nome_modelo = $request->input('modelo');
        $produto->tamanho_numeracao = $request->input('numeracao');
        $produto->quantidade_produto = $request->input('quantidade');
        $produto->valor_compra = $request->input('valorVenda');
        $produto->valor_venda = $request->input('valorCompra');
        $produto->save();
        return $this->indexJson();
    }

    public function update(Request $request, $id)
    {
        // if (
        //     $rTimeCasa == null || $rVisitante == null || $rGolsTimeCasa  == null
        //     || $rGolsVisitante == null || $rGolsTimeCasa < 0 || $rGolsVisitante < 0
        //     || $rTimeCasa == 0 || $rVisitante == 0
        // ) {
        //     return response()->json([
        //         'error' => 'Dados inválidos, tente novamente.'
        //     ]);
        // }

        $produto = Produto::find($id);

        $produto->nome_fabrica = $request->input('fabrica');
        $produto->nome_modelo = $request->input('modelo');
        $produto->tamanho_numeracao = $request->input('numeracao');
        $produto->quantidade_produto = $request->input('quantidade');
        $produto->valor_compra = $request->input('valorVenda');
        $produto->valor_venda = $request->input('valorCompra');
        $produto->save();

        return $this->indexJson();
    }

    public function delete(Request $request, $id)
    {
        $produtoToDelete = Produto::find($id);
        $produtoToDelete->delete();
        return $this->indexJson();
    }

    public function get(Request $request, $id)
    {
        $produto = Produto::where("quantidade_produto", ">", "0")->
        where("id", "=", $id)->get();
        return json_encode($produto);
    }

}
