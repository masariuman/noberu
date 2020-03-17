<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Tag;
use Uuid;
use Illuminate\Support\Facades\Hash;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pagination = 5;
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
        $input['tag'] = $request->create;
        Tag::create([
            'tag' => $input['tag'],
            'url' => str_replace('/','$',Hash::make(Hash::make(Uuid::generate()->string)))
        ]);
        $tag = Tag::orderBy("id", "DESC")->first();
        $tag['nomor'] = "NEW";
        return response()->json([
            'deeta_tag' => $tag
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
        $tag = Tag::where("url",$id)->first();
		return response()->json([
            'deeta_tag' => $tag
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
        $tag = Tag::where("url",$id)->first();
        $tag->update([
            'tag' => $request->content
        ]);
        return response()->json([
            'deeta_tag' => $tag
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
