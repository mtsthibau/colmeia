<?php

namespace App\Http\Controllers;

use App\Venda;

use Illuminate\Http\Request;

class ControllerVenda
{
    public function indexJson()
    {
        $venda = Venda::orderBy('nome_cliente', 'DESC')->get();
        return json_encode($venda);
    }

    public function update(Request $request)
    {
        $rTimeCasa =  $request->input('timeCasa');
        $rGolsTimeCasa =  $request->input('golsTimeCasa');
        $rVisitante = $request->input('visitante');
        $rGolsVisitante =  $request->input('golsVisitante');

        if (
            $rTimeCasa == null || $rVisitante == null || $rGolsTimeCasa  == null
            || $rGolsVisitante == null || $rGolsTimeCasa < 0 || $rGolsVisitante < 0
            || $rTimeCasa == 0 || $rVisitante == 0
        ) {
            return response()->json([
                'error' => 'Dados inválidos, tente novamente.'
            ]);
        }

        $timeCasa = Venda::find($rTimeCasa);
        $visitante = Venda::find($rVisitante);

        if (isset($timeCasa) && isset($visitante)) {
            $timeCasa->jogos_disputados += 1;
            $visitante->jogos_disputados += 1;
            $timeCasa->gols_pro += $rGolsTimeCasa;
            $timeCasa->gols_contra += $rGolsVisitante;
            $visitante->gols_pro += $rGolsVisitante;
            $visitante->gols_contra += $rGolsTimeCasa;
            $timeCasa->saldo_gols += ($rGolsTimeCasa - $rGolsVisitante);
            $visitante->saldo_gols += ($rGolsVisitante - $rGolsTimeCasa);

            if ($rGolsTimeCasa > $rGolsVisitante) {
                $timeCasa->pontos += 3;
                $timeCasa->vitorias += 1;
                $visitante->derrotas += 1;
            } else if ($rGolsTimeCasa == $rGolsVisitante) {
                $timeCasa->pontos += 1;
                $timeCasa->empates += 1;
                $visitante->pontos += 1;
                $visitante->empates += 1;
            } else {
                $visitante->pontos += 3;
                $visitante->vitorias += 1;
                $timeCasa->derrotas += 1;
            }

            $timeCasa->save();
            $visitante->save();
            return $this->indexJson();
        }
    }
}
