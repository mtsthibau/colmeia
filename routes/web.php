<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
});

Route::get('/estoque', function () {
    return view('estoque');
});

Route::get('/venda', function () {
    return view('venda');
});

Route::get('/despesa', function () {
    return view('despesa');
});



