<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Child extends Model
{
    protected $table = 'novel_child';
    protected $fillable = [
        'url',
        'novel_id',
        'title',
        'content',
        'thumbnail',
        'thumbnail_desc',
        'status'
    ];

    public function novel()
    {
        return $this->belongsTo('App\Novel','novel_id');
    }
}
