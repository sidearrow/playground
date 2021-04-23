<?php

namespace App\ModelEloquent;

use Illuminate\Database\Eloquent\Model;

class Region extends Model
{
    protected $table = 'region';

    protected $primaryKey = 'region_id';

    public $incrementing = false;

    public $timestamp = false;
}
