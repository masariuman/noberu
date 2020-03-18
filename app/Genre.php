<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    protected $table = 'category';
    protected $fillable = [
    	'category',
        'status',
        'url',
        'created_at',
        'updated_at'
    ];

    public function parent()
    {
        return $this->belongsToMany('App\Parent');
    }
}
