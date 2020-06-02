<?php

namespace App\Repositories;

use App\Models\LineModel;

class LineRepository extends AbstractRepository
{
    /**
     * @return \App\Entities\LineEntity[]
     */
    public function getAll(): array
    {
        /** @var \Illuminate\Database\Eloquent\Collection<LineModel> */
        $lineModels = LineModel::with(['company'])->get();

        $lineEntities = [];
        foreach ($lineModels as $lineModel) {
            $lineEntity = $this->lineModelToEntity($lineModel);
            $lineEntity->setCompany(
                $this->companyModelToEntity($lineModel->company)
            );
            $lineEntities[] = $lineEntity;
        }

        return $lineEntities;
    }
}
