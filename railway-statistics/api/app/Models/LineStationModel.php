<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LineStationModel extends Model
{
    protected $table = 'line_station';

    protected $primaryKey = ['line_id', 'station_id'];

    public $incrementing = false;

    public $timestamps = false;
}
