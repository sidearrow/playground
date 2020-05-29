<?php

// @formatter:off
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App{
/**
 * App\User
 *
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User query()
 */
	class User extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\CompanyModel
 *
 * @property int $company_id
 * @property string $company_code
 * @property string $company_name_alias
 * @property string $company_name_kana
 * @property string $company_name
 * @property int $company_type_id
 * @property float $length
 * @property int $line_num
 * @property int $station_num
 * @property int $prefecture_id
 * @property int $status
 * @property string|null $corporate_color
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\CompanyModel newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\CompanyModel newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\CompanyModel query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\CompanyModel whereCompanyCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\CompanyModel whereCompanyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\CompanyModel whereCompanyName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\CompanyModel whereCompanyNameAlias($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\CompanyModel whereCompanyNameKana($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\CompanyModel whereCompanyTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\CompanyModel whereCorporateColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\CompanyModel whereLength($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\CompanyModel whereLineNum($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\CompanyModel wherePrefectureId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\CompanyModel whereStationNum($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\CompanyModel whereStatus($value)
 */
	class CompanyModel extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\StationGroupModel
 *
 * @property int $station_group_id
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\StationGroupStationModel[] $stationGroupStations
 * @property-read int|null $station_group_stations_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\StationGroupModel newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\StationGroupModel newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\StationGroupModel query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\StationGroupModel whereStationGroupId($value)
 */
	class StationGroupModel extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\StationGroupStationModel
 *
 * @property int $station_group_id
 * @property int $station_id
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\StationGroupStationModel newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\StationGroupStationModel newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\StationGroupStationModel query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\StationGroupStationModel whereStationGroupId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\StationGroupStationModel whereStationId($value)
 */
	class StationGroupStationModel extends \Eloquent {}
}

