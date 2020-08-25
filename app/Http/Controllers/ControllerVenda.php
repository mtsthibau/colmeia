<?php

namespace App\Http\Controllers;

use App\Venda;
use App\Produto;

use Illuminate\Http\Request;

class ControllerVenda
{
    public function indexJson()
    {
        $venda = Venda::join("produto", "produto.id", "venda.id_produto")->
        select("venda.*", "produto.nome_fabrica", "produto.nome_modelo", "produto.tamanho_numeracao")->
        orderBy('venda.id', 'DESC')->paginate(100);
        return json_encode($venda);
    }

    public function listAll()
    {
        $venda = Venda::join("produto", "produto.id", "venda.id_produto")->
        select("venda.*", "produto.nome_fabrica", "produto.nome_modelo", "produto.tamanho_numeracao")->
        orderBy('venda.id', 'DESC')->get();
        return json_encode($venda);
    }

    public function search($filter)
    {

        $venda = Venda::join("produto", "produto.id", "venda.id_produto")->
        select("venda.*", "produto.nome_fabrica", "produto.nome_modelo", "produto.tamanho_numeracao")->
        where("produto.nome_fabrica", "like", "%" . $filter ."%")->
        orderBy('venda.id', 'DESC')->paginate(100);

        if($venda->isEmpty()){
            $venda = Venda::join("produto", "produto.id", "venda.id_produto")->
            select("venda.*", "produto.nome_fabrica", "produto.nome_modelo", "produto.tamanho_numeracao")->
            where("produto.nome_modelo", "like", "%" . $filter . "%")->
            orderBy('venda.id', 'DESC')->paginate(100);
        }

        if($venda->isEmpty()){
            $venda = Venda::join("produto", "produto.id", "venda.id_produto")->
            select("venda.*", "produto.nome_fabrica", "produto.nome_modelo", "produto.tamanho_numeracao")->
            where("venda.nome_cliente", "like", "%" . $filter . "%")->
            orderBy('venda.id', 'DESC')->paginate(100);
        }
        return json_encode($venda);
    }

    public function create(Request $request)
    {
        $venda = new Venda;
        $venda->nome_cliente = $request->input('nomeCliente');
        $venda->id_produto = $request->input('produto');
        $venda->quantidade_produto = $request->input('quantidade');
        $venda->total_venda = $request->input('valorTotal');
        $venda->forma_pagamento = $request->input('formaPagamento');
        $venda->save();

        $this->updateQuantidadeProdutoVenda($venda->id_produto, $venda->quantidade_produto);

        return $this->indexJson();
    }

    public function updateQuantidadeProdutoVenda($id, $quantidade){
        $produto = Produto::find($id);
        $produto->quantidade_produto = $produto->quantidade_produto - $quantidade;
        $produto->save();
    }

    public function updateQuantidadeProdutoExclusaoVenda($id, $quantidade){
        $produto = Produto::find($id);
        $produto->quantidade_produto = $produto->quantidade_produto + $quantidade;
        $produto->save();
    }

    public function delete(Request $request, $id)
    {
        $vendaToDelete = Venda::find($id);
        $this->updateQuantidadeProdutoExclusaoVenda($vendaToDelete->id_produto, $vendaToDelete->quantidade_produto);

        $vendaToDelete->delete();
        return $this->indexJson();
    }
}
