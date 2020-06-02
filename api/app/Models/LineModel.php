<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LineModel extends Model
{
    protected $table = 'line';

    protected $primaryKey = 'line_id';

    public $incrementing = false;

    public $timestamps = false;

    public function company()
    {
        return $this->hasOne(CompanyModel::class, 'company_id', 'company_id');
    }

    public function lineSections()
    {
        return $this->hasMany(LineSectionModel::class, 'line_id', 'line_id');
    }
}
