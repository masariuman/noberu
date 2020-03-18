<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Parent.php extends Model
{
    //
    protected $table = 'novel';
    protected $fillable = [
    	'url',
        'title',
        'content',
        'thumbnail',
        'thumbnail_desc',
        'status'
    ];

    public function tag()
    {
        return $this->belongsToMany('App\Tag');
    }

    public function genre()
    {
        return $this->belongsToMany('App\Genre');
    }
}
