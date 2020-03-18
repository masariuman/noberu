<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = 'category';
    protected $fillable = [
    	'category',
        'status',
        'url',
        'created_at',
        'updated_at'
    ];

    public function novel()
    {
        return $this->belongsToMany('App\Novel');
    }
}
