<?php

namespace App\Http\Controllers;

use App\Category;
use Illuminate\Http\Request;
use Uuid;
use Illuminate\Support\Facades\Hash;

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
        $genre = Category::orderBy("id", "DESC")->paginate($pagination);
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
        $input['genre'] = $request->create;
        Category::create([
            'category' => $input['genre'],
            'url' => str_replace('/','$',Hash::make(Hash::make(Uuid::generate()->string)))
        ]);
        $genre = Category::orderBy("id", "DESC")->first();
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
        $genre = Category::where("url",$id)->first();
		return response()->json([
            'deeta_genre' => $genre
		]);
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
        $genre = Category::where("url",$id)->first();
        $genre->update([
            'category' => $request->content
        ]);
        return response()->json([
            'deeta_genre' => $genre
		]);
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
