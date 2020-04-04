<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Child;
use App\Novel;
use App\Follower;
use Uuid;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class ChildController extends Controller
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
        $novel = Child::orderBy("id", "DESC")->paginate($pagination);
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
        $parent = Novel::all();
        $parents = [];
        $x = 0;
        foreach ($parent as $toc) {
            $parents['novel_parent'][$x]['title'] = $toc->title;
            $parents['novel_parent'][$x]['url'] = $toc->url;
            $x = $x+1;
        }
        return response()->json([
            'data' => $parents
		]);
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
        $parent = Novel::where('url',$request->parent)->first();
        Child::create([
            'title' => $request->title,
            'content' => $request->content,
            'novel_id' => $parent->id,
            'thumbnail' => $request->thumb,
            'thumbnail_desc' => $request->thumbDesc,
            'url' => str_replace('/','$',Hash::make(Hash::make(Uuid::generate()->string)))
        ]);
        $follower = Follower::where('status','1')->get();
        $mailcontent = Child::orderBy("id", "DESC")->first();
        foreach ($follower as $follow) {
            $to_name = $follow->email;
            $to_email = $follow->email;
            $data = ['titleparent'=> $mailcontent->novel->title,
            'titlechild'=>$mailcontent->title,
            'url'=>$mailcontent->url];
            Mail::send('emails.mails', $data, function($message) use ($to_name, $to_email) {
                $message->to($to_email, $to_name)
                ->subject(Child::orderBy("id", "DESC")->first()->title);
                $message->from('masariumantranslation@gmail.com','MasariuManTranslation New Update');
            });
        }
        $novel = Child::orderBy("id", "DESC")->get();
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
        $parent = Novel::all();
        $data['parents'] = [];
        $x = 0;
        foreach ($parent as $toc) {
            $data['parents']['novel_parent'][$x]['title'] = $toc->title;
            $data['parents']['novel_parent'][$x]['url'] = $toc->url;
            $x = $x+1;
        }
        $data['child'] = Child::where('url',$id)->first();
        $data['parent'] = Novel::where('id',$data['child']->novel_id)->first();
        return response()->json([
            'data' => $data
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
        $child = Child::where('url',$id)->first();
        $parent = Novel::where('url',$request->parent)->first();
        $file = $request->thumb;
        if($file){
            $child->update([
                'title' => $request->title,
                'content' => $request->content,
                'novel_id' => $parent->id,
                'thumbnail' => $request->thumb,
                'thumbnail_desc' => $request->thumbDesc
            ]);
        } else {
            $child->update([
                'title' => $request->title,
                'content' => $request->content,
                'novel_id' => $parent->id,
                'thumbnail_desc' => $request->thumbDesc
            ]);
        }
        $pagination = 5;
        $novel = Child::orderBy("id", "DESC")->paginate($pagination);
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
