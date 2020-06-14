<?php

namespace App\Factories;

use App\Entities\CompanyStatisticsEntity;
use App\Models\CompanyStatisticsModel;

class CompanyStatisticsEntityFactory
{
    public function createFromModel(CompanyStatisticsModel $companyStatisticsModel): CompanyStatisticsEntity
    {
        return new CompanyStatisticsEntity(
            $companyStatisticsModel->company_id,
            $companyStatisticsModel->year,
            $companyStatisticsModel->transport_passengers_teiki_tsukin,
            $companyStatisticsModel->transport_passengers_teiki_tsugaku,
            $companyStatisticsModel->transport_passengers_teiki_total,
            $companyStatisticsModel->transport_passengers_teiki_percent,
            $companyStatisticsModel->transport_passengers_teikigai,
            $companyStatisticsModel->transport_passengers_teikigai_percent,
            $companyStatisticsModel->transport_passengers_sum,
            $companyStatisticsModel->transport_revenue_passenger_teiki_tsukin,
            $companyStatisticsModel->transport_revenue_passenger_teiki_tsugaku,
            $companyStatisticsModel->transport_revenue_passenger_teiki_total,
            $companyStatisticsModel->transport_revenue_passenger_teiki_percent,
            $companyStatisticsModel->transport_revenue_passenger_teikigai_percent,
            $companyStatisticsModel->transport_revenue_passenger_teikigai_percent,
            $companyStatisticsModel->transport_revenue_passenger_total,
            $companyStatisticsModel->transport_revenue_passenger_baggage,
            $companyStatisticsModel->transport_revenue_passenger_total2
        );
    }
}
