<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Tag;
use App\Genre;

class DeetaController extends Controller
{
    public function deeta_tag()
    {
        $pagination = 7;
        $tag = Tag::orderBy("id", "DESC")->paginate($pagination);
        $count = $tag->CurrentPage()*$pagination-($pagination-1);
        foreach ($tag as $tags) {
            $tags['nomor'] = $count;
            $count++;
        }
        // dd($gets);
		return response()->json([
            'deeta_tag' => $tag
		]);
    }

    // public function deeta_tag_store(Request $request)
    // {
    //     $input['url'] = Hash::make(str_random(30));
    //     $input['tag'] = $request->tag;
    //     // $tag = $request->create([
    //     //     'tag' => $request->tag,
    //     //     'url' => $url
	// 	// ]);
    //     // return response()->json([$'deeta_tag' => $tag]);
    //     // // Tag::create($input);
    //     // return response()->json([
    //     //     'deeta_tag' => $input
	// 	// ]);
    // }

    public function deeta_genre()
    {
        $pagination = 7;
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
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        //
        $input['url'] = Hash::make(str_random(30));
        $input['tag'] = $request->tag;
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
