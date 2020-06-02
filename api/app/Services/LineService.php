<?php

namespace App\Services;

use App\Factories\LineEntityFactory;
use App\Repositories\LineRepository;

class LineService
{
    private LineRepository $lineRepository;
    private LineEntityFactory $lineEntityFactory;

    public function __construct()
    {
        $this->lineRepository = new LineRepository();
        $this->lineEntityFactory = new LineEntityFactory();
    }

    /**
     * @return \App\Entities\LineEntity[]
     */
    public function getByCompanyId(int $companyId): array
    {

        $lineModels = $this->lineRepository->getByCompanyId($companyId);

        $lineEntities = [];
        foreach ($lineModels as $lineModel) {
            $lineEntities[] = $this->lineEntityFactory->createFromModel($lineModel);
        }

        return $lineEntities;
    }
}
