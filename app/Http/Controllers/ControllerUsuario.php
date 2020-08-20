<?php

namespace App\Http\Controllers;

use App\User;

use Illuminate\Http\Request;
use PhpParser\Builder\Param;

class ControllerUsuario
{
    public function indexJson()
    {
        $usuario = User::orderBy('user', 'DESC')->orderBy('user', 'DESC')->paginate(100);
        return json_encode($usuario);
    }

    public function search($filter)
    {

        $usuario = User::where("user", "like", "%" . $filter ."%")->
        orderBy('id', 'DESC')->paginate(100);

        return json_encode($usuario);
    }

    public function create(Request $request)
    {
        $usuario = new User;
        $usuario->user = $request->input('user');
        $usuario->password = $request->input('password');
        $usuario->save();
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

        $usuario = User::find($id);

        $usuario->user = $request->input('user');
        $usuario->password = $request->input('password');
        $usuario->save();

        return $this->indexJson();
    }

    public function delete(Request $request, $id)
    {
        $usuarioToDelete = User::find($id);
        $usuarioToDelete->delete();
        return $this->indexJson();
    }

    public function login(Request $request)
    {
        $usuario = User::where("user", "=", $request->user)->
        where("password", "=", $request->password)->get();
        return json_encode($usuario);
    }

}
