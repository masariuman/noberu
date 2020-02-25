<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Tag;

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
        $input['url'] = Hash::make(Str::random(96));
        $input['tag'] = $request->create;
        Tag::create([
            'tag' => $input['tag'],
            'url' => $input['url'],
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
