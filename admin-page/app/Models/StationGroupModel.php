<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StationGroupModel extends Model
{
    public $table = 'station_group';

    public $incrementing = false;

    public function stationGroupStations()
    {
        return $this->hasMany(StationGroupStationModel::class, 'station_group_id', 'station_group_id');
    }
}
