<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class friend extends Model
{
    use HasFactory, SoftDeletes;

    public function scopeGetFriendsWithIds(Builder $query, $id) 
    {
        return $query->from('friends')->where('accepted', 1)->where('to', $id)
        ->orWhere('from', $id)
        ->get()->map(function ($a){
            return 
              [
                $a->to,
                $a->from
              ];
        });

        
    }
}
