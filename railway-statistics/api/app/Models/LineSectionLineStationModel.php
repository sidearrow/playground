<?php

namespace App\Models;

use Awobaz\Compoships\Compoships;
use Illuminate\Database\Eloquent\Model;

class LineSectionLineStationModel extends Model
{
    use Compoships;

    protected $table = 'line_section_line_station';

    protected $primaryKey = ['line_id', 'section_id', 'sort_no'];

    public $incrementing = false;

    public $timestamps = false;

    public function station()
    {
        return $this->hasOne(StationModel::class, 'station_id', 'station_id');
    }
}
