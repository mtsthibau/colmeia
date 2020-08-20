<?php

namespace App\Http\Controllers;

use App\Despesa;

use Illuminate\Http\Request;
use PhpParser\Builder\Param;

class ControllerDespesa
{
    public function indexJson()
    {
        $despesa = Despesa::orderBy('descricao_despesa', 'DESC')->orderBy('created_at', 'DESC')->paginate(100);
        return json_encode($despesa);
    }

    public function search($filter)
    {

        $despesa = Despesa::where("descricao_despesa", "like", "%" . $filter ."%")->
        orderBy('id', 'DESC')->paginate(100);

        if($despesa->isEmpty()){
            $despesa = Despesa::where("local_despesa", "like", "%" . $filter ."%")->
            orderBy('id', 'DESC')->paginate(100);
        }

        return json_encode($despesa);
    }

    public function create(Request $request)
    {
        $despesa = new Despesa;
        $despesa->descricao_despesa = $request->input('descricao_despesa');
        $despesa->local_despesa = $request->input('local_despesa');
        $despesa->valor_despesa = $request->input('valor_despesa');
        $despesa->forma_pagamento = $request->input('forma_pagamento');
        $despesa->save();
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

        $despesa = Despesa::find($id);

        $despesa->descricao_despesa = $request->input('descricao_despesa');
        $despesa->local_despesa = $request->input('local_despesa');
        $despesa->valor_despesa = $request->input('valor_despesa');
        $despesa->forma_pagamento = $request->input('forma_pagamento');
        $despesa->save();

        return $this->indexJson();
    }

    public function delete($id)
    {
        $despesaToDelete = Despesa::find($id);
        $despesaToDelete->delete();
        return $this->indexJson();
    }

    public function get($id)
    {
        $despesa = Despesa::where("id", "=", $id)->get();
        return json_encode($despesa);
    }

}
