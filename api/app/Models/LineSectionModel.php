<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LineSectionModel extends Model
{
    protected $table = 'line_section';

    protected $primaryKey = ['line_id', 'section_id'];

    public $incrementing = false;

    public $timestamps = false;
}
