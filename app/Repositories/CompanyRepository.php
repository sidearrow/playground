<?php

namespace App\Repositories;

use App\Entities\Company;
use Illuminate\Support\Facades\DB;

class CompanyRepository implements CompanyRepositoryInterface
{
    public function getAll(): array
    {
        $rows = DB::table('company')
            ->select()
            ->get()
            ->toArray();

        $res = [];
        foreach ($rows as $row) {
            $res[] = new Company(
                $row->company_code,
                $row->company_name,
                $row->company_name_kana,
                $row->company_name_orig,
            );
        }

        return $res;
    }
}
