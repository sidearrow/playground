<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StationBulkUpdateRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'bulkUpdateData' => ['required'],
        ];
    }
}
