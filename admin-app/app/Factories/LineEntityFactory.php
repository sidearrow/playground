<?php

namespace App\Factories;

use App\Entities\LineEntity;
use App\Models\LineModel;
use Illuminate\Database\Eloquent\Collection;

class LineEntityFactory
{
    public const RELATION_LINE_SECTION = 'relation_line_section';

    private LineSectionEntityFactory $lineSectionEntityFactory;

    public function __construct()
    {
        $this->lineSectionEntityFactory = new LineSectionEntityFactory();
    }

    public function createFromModel(LineModel $lineModel, array $relations = []): LineEntity
    {
        $lineEntity = new LineEntity(
            $lineModel->line_id,
            $lineModel->line_code,
            $lineModel->line_name,
            $lineModel->line_name_alias,
            $lineModel->line_name_kana,
            $lineModel->station_num,
            $lineModel->operating_kilo,
            $lineModel->real_kilo,
        );

        if (($relations[self::class] ?? null) === self::RELATION_LINE_SECTION) {
            $lineSectionEntities = [];
            foreach ($lineModel->lineSections as $lineSectionModel) {
                $lineSectionEntities[] = $this->lineSectionEntityFactory->createFromModel($lineSectionModel);
            }
            $lineEntity->setLineSections($lineSectionEntities);
        }

        return $lineEntity;
    }

    /**
     * @param \Illuminate\Database\Eloquent\Collection<LineModel> $lineModelCollection
     */
    public function createFromModelCollection(Collection $lineModelCollection): array
    {
        $lineEntities = [];
        foreach ($lineModelCollection as $lineModel) {
            $lineEntities[] = $this->createFromModel($lineModel);
        }

        return $lineEntities;
    }
}
