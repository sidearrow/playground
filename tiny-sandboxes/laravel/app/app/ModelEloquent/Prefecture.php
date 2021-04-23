<?php

namespace App\ModelEloquent;

use Illuminate\Database\Eloquent\Model;

class Prefecture extends Model
{
    protected $table = 'prefecture';

    protected $primaryKey = 'prefecture_id';

    public $incrementing = false;

    public $timestamp = false;

    public function region()
    {
        return $this->hasOne(Region::class, 'region_id');
    }
}
