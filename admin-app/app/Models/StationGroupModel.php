<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StationGroupModel extends Model
{
    protected $table = 'station_group';

    protected $primaryKey = 'station_group_id';

    public $incrementing = false;

    public $timestamps = false;
}
