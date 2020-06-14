<?php

namespace App\Entities;

use JsonSerializable;

class CompanyStatisticsEntity implements JsonSerializable
{
    private int $companyId;
    private int $year;
    private ?int $transportPassengersTeikiTsukin;
    private ?int $transportPassengersTeikiTsugaku;
    private ?int $transportPassengersTeikiTotal;
    private ?int $transportPassengersTeikiPercent;
    private ?int $transportPassengersTeikigai;
    private ?int $transportPassengersTeikigaiPercent;
    private ?int $transportPassengersTotal;
    private ?int $transportRevenuePassengerTeikiTsukin;
    private ?int $transportRevenuePassengerTeikiTsugaku;
    private ?int $transportRevenuePassengerTeikiTotal;
    private ?int $transportRevenuePassengerTeikiPercent;
    private ?int $transportRevenuePassengerTeikigai;
    private ?int $transportRevenuePassengerTeikigaiPercent;
    private ?int $transportRevenuePassengerTotal;
    private ?int $transportRevenuePassengerBaggage;
    private ?int $transportRevenuePassengerTotal2;

    public function __construct(
        int $companyId,
        int $year,
        ?int $transportPassengersTeikiTsukin,
        ?int $transportPassengersTeikiTsugaku,
        ?int $transportPassengersTeikiTotal,
        ?int $transportPassengersTeikiPercent,
        ?int $transportPassengersTeikigai,
        ?int $transportPassengersTeikigaiPercent,
        ?int $transportPassengersTotal,
        ?int $transportRevenuePassengerTeikiTsukin,
        ?int $transportRevenuePassengerTeikiTsugaku,
        ?int $transportRevenuePassengerTeikiTotal,
        ?int $transportRevenuePassengerTeikiPercent,
        ?int $transportRevenuePassengerTeikigai,
        ?int $transportRevenuePassengerTeikigaiPercent,
        ?int $transportRevenuePassengerTotal,
        ?int $transportRevenuePassengerBaggage,
        ?int $transportRevenuePassengerTotal2
    ) {
        $this->companyId = $companyId;
        $this->year = $year;
        $this->transportPassengersTeikiTsukin = $transportPassengersTeikiTsukin;
        $this->transportPassengersTeikiTsugaku = $transportPassengersTeikiTsugaku;
        $this->transportPassengersTeikiTotal = $transportPassengersTeikiTotal;
        $this->transportPassengersTeikiPercent = $transportPassengersTeikiPercent;
        $this->transportPassengersTeikigai = $transportPassengersTeikigai;
        $this->transportPassengersTeikigaiPercent = $transportPassengersTeikigaiPercent;
        $this->transportPassengersTotal = $transportPassengersTotal;
        $this->transportRevenuePassengerTeikiTsukin = $transportRevenuePassengerTeikiTsukin;
        $this->transportRevenuePassengerTeikiTsugaku = $transportRevenuePassengerTeikiTsugaku;
        $this->transportRevenuePassengerTeikiTotal = $transportRevenuePassengerTeikiTotal;
        $this->transportRevenuePassengerTeikiPercent = $transportRevenuePassengerTeikiPercent;
        $this->transportRevenuePassengerTeikigai = $transportRevenuePassengerTeikigai;
        $this->transportRevenuePassengerTeikigaiPercent = $transportRevenuePassengerTeikigaiPercent;
        $this->transportRevenuePassengerTotal = $transportRevenuePassengerTotal;
        $this->transportRevenuePassengerBaggage = $transportRevenuePassengerBaggage;
        $this->transportRevenuePassengerTotal2 = $transportRevenuePassengerTotal2;
    }

    public function jsonSerialize()
    {
        return [
            'companyId' => $this->companyId,
            'year' => $this->year,
            'transportPassengersTeikiTsukin' => $this->transportPassengersTeikiTsukin,
            'transportPassengersTeikiTsugaku' => $this->transportPassengersTeikiTsugaku,
            'transportPassengersTeikiTotal' => $this->transportPassengersTeikiTotal,
            'transportPassengersTeikiPercent' => $this->transportPassengersTeikiPercent,
            'transportPassengersTeikigai' => $this->transportPassengersTeikigai,
            'transportPassengersTeikigaiPercent' => $this->transportPassengersTeikigaiPercent,
            'transportPassengersTotal' => $this->transportPassengersTotal,
            'transportRevenuePassengerTeikiTsukin' => $this->transportRevenuePassengerTeikiTsukin,
            'transportRevenuePassengerTeikiTsugaku' => $this->transportRevenuePassengerTeikiTsugaku,
            'transportRevenuePassengerTeikiTotal' => $this->transportRevenuePassengerTeikiTotal,
            'transportRevenuePassengerTeikiPercent' => $this->transportRevenuePassengerTeikiPercent,
            'transportRevenuePassengerTeikigai' => $this->transportRevenuePassengerTeikigai,
            'transportRevenuePassengerTeikigaiPercent' => $this->transportRevenuePassengerTeikigaiPercent,
            'transportRevenuePassengerTotal' => $this->transportRevenuePassengerTotal,
            'transportRevenuePassengerBaggage' => $this->transportRevenuePassengerBaggage,
            'transportRevenuePassengerTotal2' => $this->transportRevenuePassengerTotal2,
        ];
    }
}
