<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Genre;

class GenreController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pagination = 5;
        $genre = Genre::orderBy("id", "DESC")->paginate($pagination);
        $count = $genre->CurrentPage()*$pagination-($pagination-1);
        foreach ($genre as $genres) {
            $genres['nomor'] = $count;
            $count++;
        }
        // dd($gets);
		return response()->json([
            'deeta_genre' => $genre
		]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input['url'] = Hash::make(Str::random(96));
        $input['genre'] = $request->create;
        Genre::create([
            'category' => $input['genre'],
            'url' => $input['url'],
        ]);
        $genre = Genre::orderBy("id", "DESC")->first();
        $genre['nomor'] = "NEW";
        return response()->json([
            'deeta_genre' => $genre
		]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
