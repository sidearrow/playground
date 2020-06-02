<?php

namespace App\Models;

use Awobaz\Compoships\Compoships;
use Illuminate\Database\Eloquent\Model;

class LineSectionModel extends Model
{
    use Compoships;

    protected $table = 'line_section';

    protected $primaryKey = ['line_id', 'section_id'];

    public $incrementing = false;

    public $timestamps = false;

    public function lineSectionLineStations()
    {
        return $this->hasMany(
            LineSectionLineStationModel::class,
            ['line_id', 'section_id'],
            ['line_id', 'section_id']
        );
    }
}
