<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompletedForm extends Model
{
    protected $casts = [
        'data' => 'array'
    ];
}
