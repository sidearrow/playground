<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StationGroupStationModel extends Model
{
    protected $table = 'station_group_station';

    protected $primaryKey = ['station_group_id', 'station_id'];

    public $incrementing = false;

    public $timestamps = false;

    public function station()
    {
        return $this->hasOne(StationModel::class, 'station_id', 'station_id');
    }

    public function stationGroupStations()
    {
        return $this->hasMany(StationGroupStationModel::class, 'station_group_id', 'station_group_id');
    }
}
