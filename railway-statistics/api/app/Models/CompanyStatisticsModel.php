<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompanyStatisticsModel extends Model
{
    protected $table = 'company_statistics';

    protected $primaryKey = 'company_id';

    public $incrementing = false;

    public $timestamps = false;
}
