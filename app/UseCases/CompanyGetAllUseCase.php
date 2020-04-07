<?php

namespace App\UseCases;

use App\Repositories\CompanyRepository;

class CompanyGetAllUseCase
{
    /**
     * @return \App\Entities\Company[]
     */
    public function __invoke(): array
    {
        return (new CompanyRepository())->getAll();
    }
}
