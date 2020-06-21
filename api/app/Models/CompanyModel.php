<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompanyModel extends Model
{
    protected $table = 'company';

    protected $primaryKey = 'company_id';

    public $incrementing = false;

    public $timestamps = false;

    public function companyType()
    {
        return $this->hasOne(
            CompanyTypeModel::class,
            'company_type_id',
            'company_type_id',
        );
    }

    public function railwayTypes()
    {
        return $this->hasManyThrough(
            RailwayTypeModel::class,
            CompanyRailwayTypeModel::class,
            'company_id',
            'railway_type_id',
            'company_id',
            'railway_type_id',
        );
    }

    public function railwayRailtrackTypes()
    {
        return $this->hasManyThrough(
            RailwayRailtrackTypeModel::class,
            CompanyRailwayRailtrackTypeModel::class,
            'company_id',
            'railway_railtrack_type_id',
            'company_id',
            'railway_railtrack_type_id',
        );
    }
}
