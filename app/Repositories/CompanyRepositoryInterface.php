<?php

namespace App\Repositories;

interface CompanyRepositoryInterface
{
    /**
     * @return App\Entities\Company[]
     */
    public function getAll(): array;
}
