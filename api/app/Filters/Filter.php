<?php

namespace App\Filters;

use Illuminate\Http\Request;

abstract class Filter
{
    abstract public function filter(Request $request);
}
