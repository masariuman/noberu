<?php

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
Auth::routes();

Route::get('/masariuman_tag', 'DeetaController@deeta_tag');

Route::get('/masariuman_genre', 'DeetaController@deeta_genre');

Route::group(['middleware'=> 'auth'], function () {
    Route::any('{all}', function () {
        return view('hiyaa');
    })
    ->where(['all' => '.*']);
});



// Route::get('/home', 'HomeController@index')->name('home');

// Route::get('/nanael_masariuman_hachiel', 'NanaelMasariumanHachielController@dashboard');


