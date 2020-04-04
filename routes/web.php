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
Auth::routes([
    'register' => false
]);

Route::get('mail', function () {
    return view('emails.mails');
});
Route::resource('masariuman_tag', 'TagController');
Route::resource('masariuman_genre', 'GenreController');
Route::resource('parent', 'ParentController');
Route::resource('child', 'ChildController');

Route::group(['middleware'=> 'auth'], function () {
    Route::any('{all}', function () {
        return view('hiyaa');
    })
    ->where(['all' => '.*']);
});



// Route::get('/home', 'HomeController@index')->name('home');

// Route::get('/nanael_masariuman_hachiel', 'NanaelMasariumanHachielController@dashboard');



Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
