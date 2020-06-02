<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StationModel extends Model
{
    protected $table = 'station';

    protected $primaryKey = 'station_id';

    public $incrementing = false;

    public $timestamps = false;
}
