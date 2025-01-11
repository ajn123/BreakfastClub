<?php

namespace App\Filters;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;

abstract class Filter
{
    private Model $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function filter(Request $request)
    {
        $query = $this->model->query();

        foreach ($request->all() as $filter => $value) {
            if (method_exists($this, $filter)) {
                $query = $this->$filter($query, $value);
            }
        }

        return $query;
    }
}
