<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Tag;
use App\Genre;
use App\Novel;
use Uuid;
use Illuminate\Support\Facades\Hash;

class ParentController extends Controller
{
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
        Novel::create([
            'title' => $request->title,
            'content' => $request->content,
            'thumbnail' => $request->thumb,
            'thumbnail_desc' => $request->thumbDesc,
            'url' => str_replace('/','$',Hash::make(Hash::make(Uuid::generate()->string)))
        ]);
        // $tag = Tag::orderBy("id", "DESC")->first();
        // $tag['nomor'] = "NEW";
        // return response()->json([
        //     'deeta_tag' => $tag
        // ]);
        $novel = Novel::orderBy("id", "DESC")->first();
        $tags = $request->tags;
        foreach ($tags as $tag) {
            $data = Tag::where('tag',$tag)->first();
            if ($data) {
                //nothing to add
                $novel->tag()->attach($data);
            }
            else {
                Tag::create([
                    'tag' => $tag,
                    'url' => str_replace('/','$',Hash::make(Hash::make(Uuid::generate()->string)))
                ]);
                $novel->tag()->attach($data);
            }
        }

        $genres = $request->genres;
        foreach ($genres as $genre) {
            $data = Genre::where('category',$genre)->first();
            if ($data) {
                //nothing to add
            }
            else {
                Genre::create([
                    'category' => $genre,
                    'url' => str_replace('/','$',Hash::make(Hash::make(Uuid::generate()->string)))
                ]);
            }
        }
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
