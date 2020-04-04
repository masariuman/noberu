<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Tag;
use App\Category;
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
        $pagination = 5;
        $novel = Novel::orderBy("id", "DESC")->paginate($pagination);
        $count = $novel->CurrentPage()*$pagination-($pagination-1);
        foreach ($novel as $novels) {
            $novels['nomor'] = $count;
            $count++;
        }
        // dd($gets);
		return response()->json([
            'data' => $novel
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
        Novel::create([
            'title' => $request->title,
            'content' => $request->content,
            'url' => str_replace('/','$',Hash::make(Hash::make(Uuid::generate()->string)))
        ]);

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
                $data = Tag::where('tag',$tag)->first();
                $novel->tag()->attach($data);
            }
        }

        $genres = $request->genres;
        foreach ($genres as $genre) {
            $data = Category::where('category',$genre)->first();
            if ($data) {
                //nothing to add
                $novel->category()->attach($data);
            }
            else {
                Category::create([
                    'category' => $genre,
                    'url' => str_replace('/','$',Hash::make(Hash::make(Uuid::generate()->string)))
                ]);
                $data = Category::where('category',$genre)->first();
                $novel->category()->attach($data);
            }
        }

        $novel = Novel::orderBy("id", "DESC")->get();
        return response()->json([
            'data' => $novel
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
        $novel = Novel::where("url",$id)->first();
        $genres = [];
        foreach ($novel->category as $genre) {
            $genres[] = $genre->category;
        }
        $novel['genre'] = $genres;
        $tags = [];
        foreach ($novel->tag as $tagg) {
            $tags[] = $tagg->tag;
        }
        $novel['tags'] = $tags;
		return response()->json([
            'data' => $novel
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
        $novel = Novel::where("url",$id)->first();
        $file = null;
        if($file){
            $novel->update([
                'title' => $request->title,
                'content' => $request->content,
            ]);
            $novel->category()->detach();
            $novel->tag()->detach();
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
                        'url' => str_replace('#','o',str_replace('.','A',str_replace('/','$',Hash::make(Hash::make(Uuid::generate()->string)))))
                    ]);
                    $data = Tag::where('tag',$tag)->first();
                    $novel->tag()->attach($data);
                }
            }

            $genres = $request->genres;
            foreach ($genres as $genre) {
                $data = Category::where('category',$genre)->first();
                if ($data) {
                    //nothing to add
                    $novel->category()->attach($data);

                }
                else {
                    Category::create([
                        'category' => $genre,
                        'url' => str_replace('/','$',Hash::make(Hash::make(Uuid::generate()->string)))
                    ]);
                    $data = Category::where('category',$genre)->first();
                    $novel->category()->attach($data);
                }
            }
        } else {
            $novel->update([
                'title' => $request->title,
                'content' => $request->content,
            ]);
            $novel->category()->detach();
            $novel->tag()->detach();
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
                    $data = Tag::where('tag',$tag)->first();
                    $novel->tag()->attach($data);
                }
            }

            $genres = $request->genres;
            foreach ($genres as $genre) {
                $data = Category::where('category',$genre)->first();
                if ($data) {
                    //nothing to add
                    $novel->category()->attach($data);
                }
                else {
                    Category::create([
                        'category' => $genre,
                        'url' => str_replace('/','$',Hash::make(Hash::make(Uuid::generate()->string)))
                    ]);
                    $data = Category::where('category',$genre)->first();
                    $novel->category()->attach($data);
                }
            }
        }

        return response()->json([
            'data' => $novel
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
