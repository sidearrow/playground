<?php

namespace App\Entities;

use JsonSerializable;

interface EntityInterface extends JsonSerializable
{
    public function jsonSerialize();
}
