<?php

namespace App\Factories;

use App\Entities\LineEntity;
use App\Models\LineModel;
use Illuminate\Database\Eloquent\Collection;

class LineEntityFactory
{
    public const RELATION_COMPANY = 'relation_company';
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

        if (array_key_exists(self::class, $relations)) {
            if (in_array(self::RELATION_LINE_SECTION, $relations[self::class])) {
                $lineSectionEntities = [];
                foreach ($lineModel->lineSections as $lineSectionModel) {
                    $lineSectionEntities[] = $this->lineSectionEntityFactory->createFromModel($lineSectionModel);
                }
                $lineEntity->setLineSections($lineSectionEntities);
            }

            if (in_array(self::RELATION_COMPANY, $relations[self::class])) {
                $lineEntity->setCompany(
                    (new CompanyEntityFactory())->createFromModel($lineModel->company)
                );
            }
        }

        return $lineEntity;
    }

    /**
     * @param \Illuminate\Database\Eloquent\Collection<LineModel> $lineModelCollection
     */
    public function createFromModelCollection(Collection $lineModelCollection, $relations = []): array
    {
        $lineEntities = [];
        foreach ($lineModelCollection as $lineModel) {
            $lineEntities[] = $this->createFromModel($lineModel, $relations);
        }

        return $lineEntities;
    }
}
