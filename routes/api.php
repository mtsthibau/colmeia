<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('produtos', 'ControllerProduto@indexJson');
Route::get('todosProdutos', 'ControllerProduto@listAll');
Route::post('novoProduto', 'ControllerProduto@create');
Route::post('deletaProduto/{id}', 'ControllerProduto@delete');
Route::get('produto/{id}', 'ControllerProduto@get');
Route::post('editaProduto/{id}', 'ControllerProduto@update');
Route::get('produtosFiltered/{filter}', 'ControllerProduto@search');


Route::get('vendas', 'ControllerVenda@indexJson');
Route::get('todasVendas', 'ControllerVenda@listAll');
Route::get('vendasFiltered/{filter}', 'ControllerVenda@search');
Route::post('novaVenda', 'ControllerVenda@create');
Route::post('deletaVenda/{id}', 'ControllerVenda@delete');
Route::get('venda/{id}', 'ControllerVenda@get');
Route::post('editaVenda/{id}', 'ControllerVenda@update');



Route::get('despesas', 'ControllerDespesa@indexJson');
Route::get('todasDespesas', 'ControllerDespesa@listAll');
Route::post('novaDespesa', 'ControllerDespesa@create');
Route::post('deletaDespesa/{id}', 'ControllerDespesa@delete');
Route::get('despesa/{id}', 'ControllerDespesa@get');
Route::post('editaDespesa/{id}', 'ControllerDespesa@update');
Route::get('despesasFiltered/{filter}', 'ControllerDespesa@search');

Route::get('login', 'ControllerUsuario@login');



