<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompletedForm extends Model
{
    protected $casts = [
        'data' => 'array'
    ];

    /**
     * Get the user associated with the form.
     */
    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }
}
