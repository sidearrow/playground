<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StationGroupStationModel extends Model
{
    public $table = 'station_group_station';

    public $incrementing = false;

    public function station()
    {
        return $this->hasOne(StationModel::class, 'station_id', 'station_id');
    }
}
