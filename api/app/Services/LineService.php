<?php

namespace App\Services;

use App\Entities\LineEntity;
use App\Entities\LineSectionEntity;
use App\Entities\StationEntity;
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
    public function getAll(): array
    {
        return $this->lineEntityFactory->createFromModelCollection(
            $this->lineRepository->getAll(),
            [LineEntity::RELATION_COMPANY => []]
        );
    }

    /**
     * @return \App\Entities\LineEntity[]
     */
    public function getByCompanyId(int $companyId): array
    {
        return $this->lineEntityFactory->createFromModelCollection(
            $this->lineRepository->getByCompanyId($companyId)
        );
    }

    public function getOne(int $lineId): LineEntity
    {
        return $this->lineEntityFactory->createFromModel(
            $this->lineRepository->getOne($lineId),
            [
                LineEntity::RELATION_COMPANY => [],
                LineEntity::RELATION_LINE_SECTIONS => [
                    LineSectionEntity::RELATION_STATIONS => [
                        StationEntity::RELATION_LINES => [],
                        StationEntity::RELATION_GROUP_STATIONS => [
                            StationEntity::RELATION_COMPANY => [],
                            StationEntity::RELATION_LINES => [],
                        ],
                    ]
                ]
            ]
        );
    }
}
