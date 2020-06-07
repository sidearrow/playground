<?php

namespace App\Services;

use App\Entities\LineEntity;
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
            [LineEntityFactory::class => [LineEntityFactory::RELATION_COMPANY]]
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
            [LineEntityFactory::class => [LineEntityFactory::RELATION_LINE_SECTION, LineEntityFactory::RELATION_COMPANY]]
        );
    }

    public function getOneByCode(string $lineCode): LineEntity
    {
        return $this->lineEntityFactory->createFromModel(
            $this->lineRepository->getOneByCode($lineCode),
            [LineEntityFactory::class => [LineEntityFactory::RELATION_LINE_SECTION, LineEntityFactory::RELATION_COMPANY]],
        );
    }
}
