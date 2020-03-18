<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Novel extends Model
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

    public function category()
    {
        return $this->belongsToMany('App\Category');
    }
}
