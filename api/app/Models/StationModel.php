<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StationModel extends Model
{
    protected $table = 'station';

    protected $primaryKey = 'station_id';

    public $incrementing = false;

    public $timestamps = false;

    public function stationGroupStation()
    {
        return $this->hasOne(StationGroupStationModel::class, 'station_id', 'station_id');
    }

    public function company()
    {
        return $this->hasOne(CompanyModel::class, 'company_id', 'company_id');
    }

    public function lines()
    {
        return $this->hasManyThrough(LineModel::class, LineStationModel::class, 'station_id', 'line_id', 'station_id', 'line_id');
    }
}
