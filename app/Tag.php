<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $table = 'tag';
    protected $fillable = [
    	'tag',
        'status',
        'url',
        'created_at',
        'updated_at'
    ];

    public function parent()
    {
        return $this->belongsToMany('App\Novel');
    }
}
